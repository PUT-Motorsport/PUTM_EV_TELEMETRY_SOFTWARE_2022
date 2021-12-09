<template>
  <div class="container">
    <div id="mainGrid">
      <NavBar id="navBar" />
      <button id="settingsIcon" @click="openChannelsSettings()">
        <Icon icon="settings" :inline="true" />
      </button>
      <div v-for="item in inputData" :key="item.id">
        {{ item.values }}
      </div>
      <ChannelsSettings
        :input-data="inputData"
        :hidden="channelsSettingsHidden"
        @isHidden="channelsSettingsHidden = $event"
        @channelSettings="channelsSettings = $event"
      />
      <Channels id="channels" />
      <div id="timeSetting">Lorem</div>
      <Charts id="charts" />
      <div id="axis">MAX ----------- 0</div>
      <Widgets id="widgets" />
      <div id="connectionBar">
        <Connection @serialOutput="ChangeC($event)" />
      </div>
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

import { Icon, addIcon } from "@iconify/vue";
import baselineSettings from "@iconify-icons/ic/baseline-settings";

addIcon("settings", baselineSettings);

export default {
  name: "MainApp",
  components: {
    NavBar,
    Widgets,
    Channels,
    Charts,
    Connection,
    ChannelsSettings,
    Icon,
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

<style lang="sass">
#navBar
  grid-column: 1 / span 3
  grid-row: 1 / span 1

#channels
  grid-column: 1 / span 1
  grid-row: 1 / span 2

#charts
  grid-column: 2 / span 1
  grid-row: 2 / span 1

#widgets
  grid-column: 1 / span 3
  grid-row: 4 / span 1
</style>
<style lang="scss" scoped>
#mainGrid {
  height: 100%;
  display: grid;
  grid-template-columns: [first-col] 1fr [second-col] 5fr [end-col] 25px;
  grid-template-rows: [heading] 30px [first-row] 3fr [second-row] 30px [third-row] 1fr [bottom-bar] 30px;
  column-gap: 2px;
  row-gap: 2px;
}

#connectionBar {
  position: absolute;
  bottom: 0;
  right: 0;
}
#settingsIcon {
  border: none;
  background-color: transparent;
  color: $color-main;
  font-size: $font-xs;
  &:hover {
    color: $color-accent;
    cursor: pointer;
  }
  &:active {
    color: $color-active;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
    color: $color-background;
  }
}

.container {
  height: 100%;
}
</style>
