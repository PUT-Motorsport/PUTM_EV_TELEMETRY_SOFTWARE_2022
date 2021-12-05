<template>
  <div id="status">
    <div id="bottomBar">
      <div
        id="liveStatus"
        :class="{ hovered: setCursorA }"
        @click="openConnectionBox()"
        @mouseover="setCursorA = true"
        @mouseleave="setCursorA = false"
      >
        Live <span class="dot" :class="{ on: serialOn }"> &#11044;</span>
      </div>
    </div>
  </div>
  <div id="connection" :class="{ closed: !isBoxOpened }">
    <div
      class="close"
      :class="{ hovered: setCursor }"
      @click="closeConnectionBox()"
      @mouseover="setCursor = true"
      @mouseleave="setCursor = false"
    >
      &#10006;
    </div>
    <div class="inputs">
      <select
        id="serialports"
        v-model="serialport"
        required
        name="serialports"
        :disabled="serialOn"
      >
        <option
          v-for="item in portList"
          :key="item.id"
          :value="item.val"
          :selected="item.selected ? 'selected' : ''"
        >
          {{ item.val }} :
          {{ item.full }}
        </option>
      </select>
      <input
        id="baud"
        v-model="baud"
        required
        :disabled="serialOn"
        type="number"
        name="baud"
        placeholder="enter baud"
      />
    </div>
    <div class="buttons">
      <button :disabled="serialOn" @click="openPort(serialport, baud)">
        Open
      </button>
      <button :disabled="!serialOn" @click="closePort(serialport, baud)">
        Close
      </button>
      <button @click="clearData()">Clear</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Connection",
  emits: ["serialOutput", "serialOn"],
  data: function () {
    return {
      serialOutput: [],
      connection: null,
      activePortName: null,
      serialOn: false,
      portList: [],
      serialport: null,
      baud: null,
      isBoxOpened: false,
      setCursor: false,
      setCursorA: false,
    };
  },
  created: function () {
    const hostname = window.location.hostname;
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket(`ws://${hostname}:8989/ws`);
    this.connection.onmessage = (event) => {
      try {
        let jsonInput = JSON.parse(event.data.toString());
        this.handleJSON(jsonInput);
      } catch (e) {
        return false;
      }
    };

    this.connection.onopen = (event) => {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
      this.sendMessage("list");
    };
  },
  mounted: function () {
    this.serialport = this.getCookie("lastPort");
    this.baud = this.getCookie("lastBaud");
  },
  methods: {
    sendMessage: function (message) {
      console.log(this.connection);
      this.connection.send(message);
    },
    openPort(port, baud) {
      console.log(baud.length);
      if (port.length > 0 && baud.length > 0) {
        this.sendMessage("open " + port + " " + baud);
        document.cookie = "lastPort = " + port;
        document.cookie = "lastBaud = " + baud;
        this.serialOn = true;
      }
    },
    closePort(port) {
      this.sendMessage("close " + port);
      this.serialOn = false;
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    handleSerialList(jsonInput) {
      this.portList = jsonInput.map((x, index) => ({
        id: index,
        val: x.Name,
        selected: x.Name == this.getCookie("lastPort"),
        full: x.Friendly,
      }));
      const activePort = jsonInput.find((element) => element.IsOpen == true);
      if (activePort !== undefined) {
        const activePortName = activePort.Name;
        this.activeportName = activePortName;
        const currentBaud = jsonInput.find(
          (element) => element.Name == activePortName
        )["Baud"];
        document.cookie = "lastBaud=" + currentBaud;
        this.baud = currentBaud;
        this.serialOn = true;
      }
    },
    handleJSON(jsonInput) {
      if (typeof jsonInput["D"] != "undefined") {
        jsonInput = jsonInput["D"].replace(" ", "");
        if (jsonInput.length > 0) {
          const vals = jsonInput.split("/").map((x) => Number(x));
          const newitem = { id: Date.now(), values: vals };
          this.serialOutput.push(newitem);
        }
      }
      if (typeof jsonInput["SerialPorts"] != "undefined") {
        const listData = jsonInput["SerialPorts"];
        this.handleSerialList(listData);
      }
      this.$emit("serialOutput", this.serialOutput);
    },
    openConnectionBox() {
      this.isBoxOpened = true;
    },
    closeConnectionBox() {
      this.isBoxOpened = false;
    },
    clearData() {
      if (confirm("Are you sure you want to clear the data?"))
        this.serialOutput = [];
      this.$emit("serialOutput", this.serialOutput);
    },
  },
};
</script>

<style lang="scss" scoped>
.hovered {
  cursor: pointer;
  color: $color-blue;
}

#status {
  #bottomBar {
    width: auto;
    height: 20px;
    background-color: #5d5d5d;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 4px;
    padding-right: 15px;
    padding-left: 10px;
    #liveStatus {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      margin: 0px;
    }
    .dot {
      position: relative;
      left: 6px;
      bottom: 3px;
      padding: 0px;
      color: $color-light;

      &.on {
        color: $color-red;
        animation: blinker 1s linear infinite;
      }
    }
  }
}

#connection {
  .close {
    width: 100;
    text-align: right;
    padding: 10px;
  }
  .inputs {
    display: flex;
    flex-flow: column nowrap;
  }
  .buttons {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    button {
      width: 30%;
    }
  }
  &.closed {
    display: none;
    opacity: 0;
  }
  display: block;
  z-index: 30px;
  margin-bottom: 30px;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
