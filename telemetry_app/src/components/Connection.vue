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
  emits: ["serialOutput", "clearInputs"],
  data: function () {
    return {
      //Connection object
      connection: null,
      //State of serial data input
      serialOn: false,
      //List of available serial ports
      portList: [],
      //Chosen serial port
      serialport: this.getCookie("lastPort"),
      //Serial port frequency
      baud: this.getCookie("lastBaud"),
      //If COnnection window is opened
      isBoxOpened: false,
      //Color buttons on hover
      setCursor: false,
      setCursorA: false,
    };
  },
  created: function () {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket(`ws://${window.location.hostname}:8989/ws`);
    this.connection.onmessage = (event) => {
      try {
        this.handleJSON(JSON.parse(event.data.toString()));
      } catch (e) {
        console.log(e);
      }
    };

    this.connection.onopen = (event) => {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
      this.sendMessage("list");
    };
  },
  methods: {
    // @vuese
    // Sends given message to the echo websocket server
    //@arg  The message to send
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
    // @vuese
    // Method for handling incoming message with list of available ports
    handleSerialList(jsonInput) {
      this.portList = jsonInput.map((x, index) => ({
        id: index,
        val: x.Name,
        selected: x.Name == this.getCookie("lastPort"),
        full: x.Friendly,
      }));
      const activePort = jsonInput.find((element) => element.IsOpen == true);
      if (activePort !== undefined) {
        this.serialport = activePort.Name;
        this.baud = jsonInput.find(
          (element) => element.Name == this.serialport
        )["Baud"];
        document.cookie = "lastBaud=" + this.baud;
        this.serialOn = true;
      }
    },
    // @vuese
    // handling of JSON message with data
    handleJSON(jsonInput) {
      if (typeof jsonInput["D"] != "undefined") {
        jsonInput = jsonInput["D"].replace(" ", "");
        if (jsonInput.length > 0) {
          const vals = jsonInput.split("/").map((x) => Number(x));
          // Send new data do main Array
          // @arg The argument is an Array with new data
          this.$emit("serialOutput", { id: Date.now(), values: vals });
        }
      }
      if (typeof jsonInput["SerialPorts"] != "undefined")
        this.handleSerialList(jsonInput["SerialPorts"]);
    },
    openConnectionBox() {
      this.isBoxOpened = true;
    },
    closeConnectionBox() {
      if (confirm("Are you sure you want close serial server?"))
        this.isBoxOpened = false;
    },
    clearData() {
      if (confirm("Are you sure you want to clear the data?")) {
        // Send message to clear all serial data
        this.$emit("clearInputs", true);
      }
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
