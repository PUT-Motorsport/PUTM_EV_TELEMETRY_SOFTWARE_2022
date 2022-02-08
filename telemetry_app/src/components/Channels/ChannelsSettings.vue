/* eslint-disable prettier/prettier */
<template>
  <div id="settings" :class="{ hidden: hidden }">
    <div class="background">
      <div class="content standard-box light">
        <div class="top">
          <div class="save">
            <button class="button" @click="saveSettings()">
              Save
              <font-awesome-icon icon="floppy-disk" style="padding-left: 5px" />
            </button>
          </div>
          <div class="close" @click="closeWindow()">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </div>
        </div>
        <div class="data">
          <table>
            <thead id="header">
              <tr>
                <th class="ID">ID</th>
                <th class="NAME">NAME</th>
                <th class="UNIT">UNIT</th>
                <th class="PRECISION">PRECISION</th>
                <th class="MIN">MIN</th>
                <th class="MAX">MAX</th>
                <th class="SCALE">SCALE</th>
                <th class="ERROR">IS ERROR</th>
              </tr>
            </thead>
            <tbody id="channels">
              <tr v-for="item in settings" :key="item.id" class>
                <td>{{ item.id }}</td>
                <td>
                  <input
                    v-model="item.name"
                    class="input"
                    type="text"
                    placeholder="NAME"
                  />
                </td>
                <td>
                  <input
                    v-if="item.iserror"
                    v-model="item.unit"
                    class="input"
                    type="text"
                    placeholder="UNIT"
                    disabled
                  />
                  <input
                    v-else
                    v-model="item.unit"
                    class="input"
                    type="text"
                    placeholder="UNIT"
                  />
                </td>
                <td>
                  <input
                    v-if="item.iserror"
                    v-model="item.precision"
                    class="input"
                    type="number"
                    placeholder="PRECISION"
                    disabled
                  />
                  <input
                    v-else
                    v-model="item.precision"
                    class="input"
                    type="number"
                    placeholder="PRECISION"
                  />
                </td>
                <td>
                  <input
                    v-if="item.iserror"
                    v-model="item.min"
                    class="input"
                    type="number"
                    placeholder="MIN"
                    disabled
                  />
                  <input
                    v-else
                    v-model="item.min"
                    class="input"
                    type="number"
                    placeholder="MIN"
                  />
                </td>
                <td>
                  <input
                    v-if="item.iserror"
                    v-model="item.max"
                    class="input"
                    type="number"
                    placeholder="MAX"
                    disabled
                  />
                  <input
                    v-else
                    v-model="item.max"
                    class="input"
                    type="number"
                    placeholder="MAX"
                  />
                </td>
                <td>
                  <select
                    v-if="item.iserror"
                    v-model="item.scale"
                    class="select"
                    disabled
                  >
                    <option value="" disabled selected hidden>
                      Select scale
                    </option>
                    <option value="lin">Linear</option>
                    <option value="log">logarithmic</option>
                  </select>
                  <select v-else v-model="item.scale" class="select">
                    <option value="" disabled selected hidden>
                      Select scale
                    </option>
                    <option value="lin">Linear</option>
                    <option value="log">logarithmic</option>
                  </select>
                </td>
                <td>
                  <div class="switch_box box_1">
                    <input
                      v-model="item.iserror"
                      class="checkbox"
                      type="checkbox"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChannelsSettings",
  props: {
    //Input serial data from main Array
    inputData: {
      type: Array,
      default: Array,
      required: true,
    },
    //If channels settings window is hidden
    hidden: { type: Boolean, default: false, required: false },
  },
  emits: ["isHidden", "channelSettings"],
  data() {
    return { receivedInput: false, settings: {} };
  },
  watch: {
    inputData: {
      immediate: true,
      deep: true,
      handler(val) {
        const size = Object.keys(Object.assign({}, val)).length;
        if (size > 0) {
          if (!this.receivedInput) {
            this.settings = this.createChannelsList(val);
            console.log(this.settings);
          }
          this.receivedInput = true;
        }
      },
    },
  },
  methods: {
    createChannelsList(inputData) {
      const cookie = this.getCookie("settings");
      if (cookie != undefined) {
        const lastSettings = JSON.parse(cookie);
        if (lastSettings != undefined) {
          return lastSettings;
        }
      }
      let channels;

      if (inputData.length > 0) {
        channels = inputData[0].values;
        channels = Object.keys(channels);
        channels = channels.map((x) => {
          return {
            id: x,
            name: "",
            unit: "",
            precision: null,
            min: null,
            max: null,
            scale: "",
            iserror: false,
          };
        });
      }
      console.log("NOT COOKIE");
      return channels;
    },
    closeWindow() {
      //Send message to close the window
      //@arg `true`
      this.$emit("isHidden", true);
    },
    saveSettings() {
      if (this.settings.length > 0) {
        document.cookie =
          "settings = " +
          JSON.stringify(this.settings) +
          ";" +
          "expires=" +
          new Date(
            new Date().getTime() + 60 * 60 * 1000 * 24 * 365
          ).toGMTString() +
          ";path=/";
        //Send current channels settings to application
        //@arg Array with settings
        this.$emit("channelSettings", this.settings);
      }
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
  },
};
</script>

<style lang="scss" scoped>
//@import "./src/scss/main.scss";
.hidden {
  display: none;
  opacity: 0;
}
#settings {
  .background {
    z-index: 30;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000aa;
    .content {
      background-color: $color-light;
      width: 90%;
      height: 90%;
      position: absolute;
      top: 50%; /* position the top  edge of the element at the middle of the parent */
      left: 50%; /* position the left edge of the element at the middle of the parent */

      transform: translate(-50%, -50%);
      display: flex;
      flex-flow: column nowrap;
      .top {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        .save {
          color: $color-background;
          font-size: $font-md;
          padding: 10px;
        }
      }

      .data {
        position: relative;
        width: calc(100% - 20px);
        margin: 10px;
        margin-top: 0px;
        overflow: auto;
        height: 100%;
        background-color: $color-main;

        border-radius: 10px;
        scrollbar-width: none;
        &* {
          margin: 0;
          box-sizing: border-box;
        }

        table {
          border-collapse: separate;
          border-spacing: 0;
          table-layout: fixed;

          border-spacing: 0;
          min-width: 100%;
          font-size: $font-sm;
          font-weight: 300;
          thead {
            tr {
              width: 100%;
            }

            tr,
            th {
              max-height: 30px;
            }
            th {
              padding-left: 10px;
              padding-right: 10px;
              background-color: $color-dark;
              border: none; //$color-dark;
              position: sticky;
              top: 0;
              font-weight: 500;
              &:first-child {
                border-radius: 10px 0 0 0px;
              }
              &:last-child {
                border-radius: 0 10px 0 0;
              }
            }
            .ID {
              width: 2%;
            }
            .NAME {
              width: 10%;
            }

            .UNIT {
              width: 3%;
            }

            .PRECISION {
              width: 2%;
            }

            .MIN {
              width: 3%;
            }

            .MAX {
              width: 3%;
            }

            .SCALE {
              width: 3%;
            }
            .ERROR {
              width: 1%;
            }
          }
          tbody {
            td {
              border: none;
              border-top: solid 1px $color-light;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            tr {
              &:last-child {
                td {
                  &:first-child {
                    border-radius: 10px 0 0 0px;
                  }
                  &:last-child {
                    border-radius: 0 10px 0 0;
                  }
                }
              }
            }

            tr,
            td {
              color: $color-background;
              background-color: $color-main;
              height: 25px;
            }
            tr:last-child td:first-child {
              border-radius: 0 0 0 10px;
            }
            tr:last-child td:last-child {
              border-radius: 0 0 10px 0;
            }
          }
        }
      }
      .close {
        color: $color-background;
        font-size: $font-md;
        padding: 10px;
        border: none;
        background-color: transparent;
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
    }
  }
}
::-webkit-scrollbar {
  width: 0;
}
</style>
