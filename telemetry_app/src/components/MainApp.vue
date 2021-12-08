<template>
  <div class="container">
    <NavBar />
    <Widgets />
    <Channels />
    <button class="button" @click="openChannelsSettings()">Settings</button>
    <div v-for="item in inputData" :key="item.id">
      {{ item.values }}
    </div>
    <ChannelsSettings
      :input-data="inputData"
      :hidden="channelsSettingsHidden"
      @isHidden="channelsSettingsHidden = $event"
    />
    <Charts />
    <div id="connectionBar">
      <Connection @serialOutput="ChangeC($event)" />
    </div>
  </div>
</template>

<script>
import Widgets from "./Widgets.vue";
import Charts from "./Charts.vue";
import Channels from "./Channels.vue";
import ChannelsSettings from "./ChannelsSettings.vue";
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
    ChannelsSettings,
  },
  data: function () {
    return {
      inputData: new Array(),
      channelsSettingsHidden: true,
      channelsSettings: [],
    };
  },
  methods: {
    ChangeC(inputData) {
      this.inputData = inputData;
    },
    openChannelsSettings() {
      this.channelsSettingsHidden = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#connectionBar {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
