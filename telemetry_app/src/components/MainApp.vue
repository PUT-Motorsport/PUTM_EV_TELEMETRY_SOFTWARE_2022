<template>
  <div class="container">
    <NavBar />
    <Widgets />
    <Channels />
    <Charts />
    <div id="connectionBar">
      <Connection />
    </div>
    <div id="bottomLine" />
  </div>
</template>

<script>
import Widgets from "./Widgets.vue";
import Charts from "./Charts.vue";
import Channels from "./Channels.vue";
import NavBar from "./NavBar.vue";
import Connection from "./Connection.vue";

export default {
  name: "HelloWorld",
  components: {
    NavBar,
    Widgets,
    Channels,
    Charts,
    Connection,
  },
  data: function () {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#bottomLine {
  width: 100%;
  height: 20px;
  background-color: #5d5d5d;
  position: absolute;
  bottom: 0;
  left: 0;
}
#connectionBar {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
