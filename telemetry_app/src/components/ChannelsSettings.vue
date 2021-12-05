/* eslint-disable prettier/prettier */
<template>
  <div id="settings" :class="{ hidden: hidden }">
    <div class="background">
      <div class="content standard-box light">
        <div class="data">
          <table>
            <thead id="header">
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>UNIT</th>
                <th>PRECISION</th>
                <th>MIN</th>
                <th>MAX</th>
                <th>SCALE</th>
              </tr>
            </thead>
            <tbody id="channels">
              <tr v-for="id in channelsIDs" :key="id">
                <td>{{ id }}</td>
                <td><input type="text" placeholder="NAME" /></td>
                <td><input type="text" placeholder="UNIT" /></td>
                <td><input type="number" placeholder="PRECISION" /></td>
                <td><input type="number" placeholder="MIN" /></td>
                <td><input type="number" placeholder="MAX" /></td>
                <td>
                  <select>
                    <option>Linear</option>
                    <option>Log</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="close" @click="closeWindow()">
          <Icon icon="close" :inline="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, addIcon } from "@iconify/vue/dist/offline";
import close from "@iconify-icons/mdi/close";
addIcon("close", close);

export default {
  name: "ChannelsSettings",
  components: {
    Icon,
  },
  props: {
    inputData: {
      type: Array,
      default: Array,
      required: true,
    },
    hidden: { type: Boolean, default: false, required: false },
  },
  emits: ["isHidden"],
  data() {
    return { receivedInput: false, channelsIDs: [], channels: {} };
  },
  watch: {
    inputData: {
      immediate: true,
      deep: true,
      handler(val) {
        const target_copy = Object.assign({}, val);
        const size = Object.keys(target_copy).length;
        if (size > 0) {
          if (!this.receivedInput) {
            this.channelsIDs = this.createChannelsList(val);
          }
          this.receivedInput = true;
        }
      },
    },
  },

  methods: {
    createChannelsList(inputData) {
      if (inputData.length > 0) {
        var channels = inputData[0].values;
        channels = Object.keys(channels);
        /* channels = channels.map((x, i) => {
          return { id: i, value: x };
        }); */
        console.log(channels);
      }
      return channels;
    },
    closeWindow() {
      this.$emit("isHidden", true);
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
      flex-flow: row nowrap;

      .data {
        position: relative;
        width: 100%;
        margin: 10px;
        overflow: auto;
        max-height: 100%;
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
      }
    }
  }
}
::-webkit-scrollbar {
  width: 0;
}
</style>
