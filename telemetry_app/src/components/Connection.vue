<template>
  <div id="connection">
    <select id="serialports" v-model="serialport" name="serialports">
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
      :disabled="serialOn"
      type="number"
      name="baud"
      placeholder="enter baud"
    />
    <button
      :disabled="serialOn"
      @click="
        openPort(serialport, baud);
        serialOutput = [];
      "
    >
      Open
    </button>
    {{ activePortName }}
    <button :disabled="!serialOn" @click="closePort(serialport, baud)">
      Close
    </button>
    <ol id="outputList">
      <li v-for="item in serialOutput" :key="item.id" class="output">
        {{ item.values }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "Connection",
  data: function () {
    return {
      serialOutput: [],
      connection: null,
      activePortName: null,
      serialOn: false,
      portList: [],
      serialport: null,
      baud: null,
    };
  },
  created: function () {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("ws://25.99.238.105:8989/ws");
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
      this.sendMessage("open " + port + " " + baud);
      document.cookie = "lastPort = " + port;
      document.cookie = "lastBaud = " + baud;
      this.serialOn = true;
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
    },
  },
};
</script>

<style lang="scss" scoped>
#outputList {
  margin: 0;
  overflow-y: auto;
  height: 200px;
}
</style>
