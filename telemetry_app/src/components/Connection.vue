<template>
  <div id="connection">
    <input
      id="serialport"
      v-model="serialport"
      type="text"
      name="serialport"
      placeholder="Enter Serial Port"
    >
    <input
      id="baud"
      v-model="baud"
      type="number"
      name="baud"
      placeholder="enter baud"
    >
    <button
      @click="
        openPort(serialport, baud);
        serialOutput = [];
      "
    >
      Open
    </button>
    <!--   Here edit your path to arduino -->
    <button @click="closePort(serialport, baud)">
      Close
    </button>
    <ol id="outputList">
      <li
        v-for="item in serialOutput"
        :key="item.id"
        class="output"
      >
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
    };
  },
  created: function () {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("ws://localhost:8989/ws");
    this.connection.onmessage = (event) => {
      let jsonInput = JSON.parse(event.data);
      console.log(jsonInput);
      if (jsonInput[0] !== undefined) {
        if (typeof jsonInput["D"] !== "undefined") {
          jsonInput = jsonInput["D"].replace(" ", "");
          if (jsonInput.length > 0) {
            const vals = jsonInput.split("/").map((x) => Number(x));
            const newitem = { id: Date.now(), values: vals };
            this.serialOutput.push(newitem);
          }
        }
      }
    };

    this.connection.onopen = (event) => {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
      this.sendMessage("list");
    };
  },
  mounted: () => {
    this.sendMessage("list");
  },
  methods: {
    sendMessage: function (message) {
      console.log(this.connection);
      this.connection.send(message);
    },
    openPort(port, baud) {
      this.sendMessage("open " + port + " " + baud);
    },
    closePort(port) {
      this.sendMessage("close " + port);
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
