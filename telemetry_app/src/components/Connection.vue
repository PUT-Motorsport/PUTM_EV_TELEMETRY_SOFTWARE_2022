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
        <span>Live</span>

        <span v-if="serialOn" class="dot on">
          <font-awesome-icon icon="circle-play" />
        </span>
        <span v-if="!serialOn" class="dot">
          <font-awesome-icon icon="circle-stop" />
        </span>
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
      <font-awesome-icon icon="xmark" />
    </div>
    <div class="inputs">
      <input
        id="baud"
        v-model="baud"
        required
        type="number"
        name="baud"
        placeholder="enter baud"
        class="input"
        :disabled="serialOn"
      />
      <select
        id="serialports"
        v-model="serialport"
        required
        name="serialports"
        :disabled="serialOn"
        class="select"
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
    </div>
    <div class="buttons">
      <button
        class="button"
        :disabled="serialOn"
        @click="openPort(serialport, baud)"
      >
        Open
      </button>
      <button
        class="button"
        :disabled="!serialOn"
        @click="closePort(serialport)"
      >
        Close
      </button>
      <button class="button" @click="clearData()">Clear</button>
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
      serialport: this.getCookie("lastPort"),
      baud: this.getCookie("lastBaud"),
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
  methods: {
    sendMessage: function (message) {
      console.log(this.connection);
      this.connection.send(message);
    },
    openPort() {
      if (this.serialport.length > 0 && this.baud > 0) {
        this.sendMessage("open " + this.serialport + " " + this.baud);
        document.cookie =
          "lastPort = " +
          String(this.serialport) +
          ";" +
          "expires=" +
          new Date(
            new Date().getTime() + 60 * 60 * 1000 * 24 * 365
          ).toGMTString() +
          ";path=/";
        document.cookie =
          "lastBaud = " +
          String(this.baud) +
          ";" +
          "expires=" +
          new Date(
            new Date().getTime() + 60 * 60 * 1000 * 24 * 365
          ).toGMTString() +
          ";path=/";
        this.serialOn = true;
      } else {
        alert("Enter Data");
      }
      console.log(this.getCookie("lastBaud"), this.getCookie("lastPort"));
    },
    closePort(port) {
      console.log("close " + port);
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
        this.serialport = activePortName;
      }
    },
    handleJSON(jsonInput) {
      if (typeof jsonInput["D"] != "undefined") {
        jsonInput = jsonInput["D"].replace(" ", "");
        if (jsonInput.length > 0) {
          const vals = jsonInput.split("/").map((x) => Number(x));
          const newitem = { id: Date.now(), values: vals };
          this.serialOutput.unshift(newitem);
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
  color: $color-active;
}

#status {
  #bottomBar {
    height: 18px;
    background-color: #5d5d5d;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 4px;
    padding-right: 5px;
    padding-left: 10px;
    #liveStatus {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      margin: 0px;
    }
    .dot {
      padding-left: 5px;
      color: $color-light;

      &.on > svg {
        color: $color-alert;
        animation: blinker 1s linear infinite;
      }
    }
  }
}

#connection {
  .close {
    width: 100;
    text-align: right;
    font-size: $font-sm;
    padding-right: 10px;
  }
  .inputs {
    display: flex;
    flex-flow: column nowrap;
    & > * {
      margin-top: 5px;
    }
  }
  .buttons {
    margin-top: 5px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
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
