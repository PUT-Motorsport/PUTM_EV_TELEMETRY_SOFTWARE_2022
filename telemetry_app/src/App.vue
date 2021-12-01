<template>
  <MainApp msg="Welcome to PUT Motorsport APP" />
</template>

<script>
import MainApp from "./components/MainApp.vue";

export default {
  name: "App",
  components: {
    MainApp,
  },
};
</script>

<style>
@font-face {
  font-family: "Share Tech Mono";
  src: url(./assets/ShareTechMono-Regular.ttf) format("truetype");
}

body {
  background-color: #303030;
  margin: 0;
  overflow: hidden;
}

#app {
  font-family: "Share Tech Mono", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #303030;
  background-image: url(./assets/PUTMLogo2.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
