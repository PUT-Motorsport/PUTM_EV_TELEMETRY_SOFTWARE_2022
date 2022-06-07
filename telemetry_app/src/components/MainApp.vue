<template>
  <div class="container">
    <div id="mainGrid">
      <div id="connectionBar">
        <Connection
          @serialOutput="addInput($event)"
          @clearInputs="clearData($event)"
        />
      </div>
      <div id="downloadBar">
        <Download :data="inputData" @uploadedData="handleUploadData($event)" />
      </div>
      <NavBar @signalSwitch="switchVisibility($event)" />

      <ChannelsSettings
        :class="generalVisible"
        :input-data="inputData"
        :hidden="channelsSettingsHidden"
        @isHidden="channelsSettingsHidden = $event"
        @channelSettings="updateChannelsSettings($event)"
      />

      <ErrorsFilters :class="errorsVisible" />

      <div id="channelsSection" :class="generalVisible">
        <div class="heading">
          <h3>Channels</h3>
          <button id="settingsIcon" @click="openChannelsSettings()">
            <font-awesome-icon :icon="['fas', 'gear']" />
          </button>
        </div>
        <Channels
          :settings="channels.settings"
          :values="inputData"
          :colors-in="channels.colors"
          :visible="channels.visible"
          @visibility="channels.visible = $event"
          @colors="channels.colors = $event"
        />
      </div>

      <div id="timeSetting" :class="generalVisible">Lorem</div>

      <Errors
        :class="errorsVisible"
        :values="inputData"
        :channel-settings="channels.settings"
      />
      <Charts
        :class="generalVisible"
        :values="inputData"
        :channels-info="channels"
      />

      <div id="axis" :class="generalVisible">MAX ----------- 0</div>
      <Widgets />
    </div>
  </div>
</template>

<script>
import Widgets from "./Widgets/Widgets.vue";
import Charts from "./Charts/Charts.vue";
import Channels from "./Channels/Channels.vue";
import ChannelsSettings from "./Channels/ChannelsSettings.vue";
import NavBar from "./NavBar/NavBar.vue";
import Connection from "./Connection.vue";
import Errors from "./Errors/Errors.vue";
import ErrorsFilters from "./Errors/ErrorsFilters.vue";
import Download from "./Download.vue";

export default {
  name: "MainApp",
  components: {
    NavBar,
    Widgets,
    Channels,
    Charts,
    Connection,
    ChannelsSettings,
    Errors,
    ErrorsFilters,
    Download,
  },
  data: function () {
    return {
      //Whole data that comes on serial input
      inputData: new Array(),
      //States of channels, errors etc.
      stateData: new Array(),
      //If Settings Channel is hidden
      channelsSettingsHidden: true,
      //Channels Settings
      channels: {
        settings: {},
        colors: [
          "#f432aa",
          "#3df52b",
          "#3322fd",
          "#f44f11",
          "#f44f11",
          "#e49f11",
        ],
        visible: [false, false, false, false, false, false],
      },

      //TODO change for more dynamic method
      //errors visibility class=
      errorsVisible: "nonVisible",
      //everything else visibility class
      generalVisible: "",
    };
  },
  beforeMount: function () {
    //get last saved settings
    const cookie = this.getCookie("settings");
    //If doesn't exist, create it
    if (cookie != undefined) {
      const lastSettings = JSON.parse(cookie);
      if (lastSettings != undefined) {
        this.channels.settings = lastSettings;
      }
    }
  },
  methods: {
    // @vuese
    //Adding new data to Array
    //@arg incoming data
    addInput(incomingData) {
      try {
        if (this.inputData.length < 1) {
          this.inputData = Array.from(
            { length: incomingData.length * 4 - 4 },
            () => ({ timestamps: new Array(), vals: new Array() })
          );
        }
        switch (incomingData[0].val) {
          //high freq data
          case 65:
            for (let i = 1; i < incomingData.length; i++) {
              this.inputData[i - 1].timestamps.push(incomingData[i].time);
              this.inputData[i - 1].vals.push(incomingData[i].val);
            }
            break;
          //mid freq data
          case 66:
            for (let i = 1; i < incomingData.length; i++) {
              this.inputData[incomingData.length + i - 2].timestamps.push(
                incomingData[i].time
              );
              this.inputData[incomingData.length + i - 2].vals.push(
                incomingData[i].val
              );
            }
            break;
          //low freq data
          case 67:
            for (let i = 1; i < incomingData.length; i++) {
              this.inputData[incomingData.length * 2 + i - 3].timestamps.push(
                incomingData[i].time
              );
              this.inputData[incomingData.length * 2 + i - 3].vals.push(
                incomingData[i].val
              );
            }
            break;
          //lowest freq data
          case 68:
            for (let i = 1; i < incomingData.length; i++) {
              this.inputData[incomingData.length * 3 + i - 4].timestamps.push(
                incomingData[i].time
              );
              this.inputData[incomingData.length * 3 + i - 4].vals.push(
                incomingData[i].val
              );
            }
            break;
        }
      } catch (e) {
        console.error(e);
      }
    },
    // @vuese
    //Clear all data
    //@arg just signal `true` | `False`
    clearData(clear) {
      if (clear) {
        this.inputData = [];
      }
    },
    openChannelsSettings() {
      this.channelsSettingsHidden = false;
    },
    updateChannelsSettings(event) {
      try {
        this.channels.settings = event;
      } catch (error) {
        console.error(error);
      }
    },
    updateChannelsColors(event) {
      this.channels.colors = event;
    },
    updateChannelsVisible(event) {
      this.channels.visible = event;
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    switchVisibility(event) {
      console.log(event);
      if (event == "errorSwitch") {
        this.errorsVisible = "";
        this.generalVisible = "nonVisible";
      }
      if (event == "generalSwitch") {
        this.errorsVisible = "nonVisible";
        this.generalVisible = "";
      }
    },
    handleUploadData(data) {
      console.log(data);
      this.inputData = data;
    },
  },
};
</script>

<style lang="scss">
.nonVisible {
  display: none;
  opacity: 0;
}
#errorsPage {
  grid-column: 2 / span 2;
  grid-row: 2 / span 2;
}
#errorFilters {
  grid-column: 1 / span 1;
  grid-row: 1 / span 3;
}
#navbar {
  z-index: 20;
  grid-column: 2 / span 3;
  grid-row: 1 / span 1;
}
#channelsSection {
  grid-column: 1 / span 1;
  grid-row: 1 / span 2;

  background-color: $color-background;
  border: 3px solid $color-accent;
  border-width: 0px 2px 2px 0px;
  border-radius: 0px 0px 10px 0px;
  .heading {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    height: 30px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    background-color: $color-dark;
    align-items: center;
    h3 {
      font-size: $font-sm;
      flex: 5;
      display: inline-block;
      text-align: left;
      margin: 0px;
      margin-left: 10px;
      font-weight: 500;
    }
    button {
      flex: 1;
      display: inline-block;
    }
  }
}
#charts {
  grid-column: 2 / span 2;
  grid-row: 2 / span 1;
}
#widgets {
  grid-column: 1 / span 3;
  grid-row: 4 / span 1;
}
#timeSetting {
  grid-column: 1 / span 1;
  grid-row: 3 / span 1;
}
#axis {
  grid-column: 2 / span 1;
  grid-row: 3 / span 1;
}
</style>
<style lang="scss" scoped>
#mainGrid {
  height: 100%;
  display: grid;
  grid-template-columns: [first-col] minmax(300px, 1fr) [second-col] 4fr [end-col] 25px;
  grid-template-rows: [heading] 30px [first-row] 3fr [second-row] 30px [third-row] 1fr [bottom-bar] 28px;
  column-gap: 2px;
  row-gap: 2px;
}

#downloadBar {
  position: absolute;
  bottom: 0;
  right: 70px;
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
