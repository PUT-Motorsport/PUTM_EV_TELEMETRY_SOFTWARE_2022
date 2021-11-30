<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <button v-on:click="sendMessage('open COM7 9600')">Open</button> <!--   Here edit your path to arduino -->
  <button v-on:click="sendMessage('close COM7')">Close</button>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: function() {
    return {
      connection: null
    }
  },
  created: function() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("ws://localhost:8989/ws")

    this.connection.onmessage = function(event) {
      let obj = JSON.parse(event.data)
      if (typeof  obj["D"] !== 'undefined'){
        obj = obj["D"].replace("|","")
        if (obj.length > 0){
          console.log(obj);
      }
      }

    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

  },
  methods: {
    sendMessage: function(message) {
      console.log(this.connection);
      this.connection.send(message);
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
