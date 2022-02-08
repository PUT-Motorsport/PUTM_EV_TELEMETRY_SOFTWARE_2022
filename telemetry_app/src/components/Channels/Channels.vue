<template>
  <div id="channels" ref="channelsSectionObserver">
    <table>
      <thead id="header">
        <tr>
          <th class="ID">Name</th>
          <th class="NAME">Value</th>
          <th class="NAME"><font-awesome-icon icon="eye" /></th>
          <th class="NAME"><font-awesome-icon icon="palette" /></th>
        </tr>
      </thead>
      <tbody v-if="values.length > 0">
        <tr v-for="item in settings" :key="item.id">
          <td v-if="!item.iserror">{{ item.name }}</td>
          <td v-if="!item.iserror">
            {{ values[0].values[item.id].toFixed(item.precision) + item.unit }}
          </td>
          <td
            v-if="!item.iserror"
            class="visibility"
            @click="changeVisibility(item.id)"
          >
            <font-awesome-icon
              v-if="visible[item.id]"
              icon="eye"
            /><font-awesome-icon
              v-if="!visible[item.id]"
              icon="eye-slash"
              style="opacity: 0.7"
            />
          </td>
          <td
            v-if="!item.iserror"
            class="colorOpenWindow"
            @click="colorWindow(item.id)"
          >
            <font-awesome-icon
              icon="square"
              :style="{ color: colors[item.id] }"
            />
          </td>
          <div
            v-if="item.id == colorWindowVisible"
            :style="{
              top: Math.min(20 * item.id + 60, windowHeight - 338) + 'px',
              left: channelsWidth + 2 + 'px',
            }"
            class="ColorWheel"
          >
            <ColorWheel
              :color-in="colors[item.id]"
              @color="colors[item.id] = $event"
            />
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ColorWheel from "./ColorWheel.vue";
export default {
  name: "Channels",
  components: { ColorWheel },
  props: {
    //Settings of all channels
    settings: {
      type: Object,
      default: Object,
      required: true,
    },
    //Data from main
    values: {
      type: Array,
      default: Array,
      required: false,
    },
    colorsIn: {
      type: Array,
      default: Array,
      required: false,
    },
  },
  emits: ["visibility", "colors"],
  data: function () {
    return {
      visible: [],
      colors: [],
      colorWindowVisible: -1,
      windowHeight: window.innerHeight,
      channelsWidth: 999,
    };
  },
  watch: {
    colors: {
      immediate: true,
      deep: true,
      handler(val) {
        this.$emit("colors", val);
      },
    },
  },
  mounted() {
    this.colors = this.colorsIn;
    this.channelsWidth = this.$refs.channelsSectionObserver.clientWidth;
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowHeight = window.innerHeight;
      this.channelsWidth = this.$refs.channelsSectionObserver.clientWidth;
    },
    changeVisibility(id) {
      this.visible[id] = !this.visible[id];
      //Sends data about window visibility
      //@arg `true` | `false`
      this.$emit("visibility", this.visible);
    },
    colorWindow(id) {
      //TODO Open color window
      if (id == this.colorWindowVisible) {
        this.colorWindowVisible = -1;
      } else this.colorWindowVisible = id;
    },
  },
};
</script>

<style lang="scss" scoped>
.ColorWheel {
  z-index: 5;
  position: absolute;
  /* top: 0;
  left: 300px; */
}
#channels {
  width: 100%;
  height: calc(100% - 32px);

  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: $color-dark;
    border-radius: 0px 0px 7px 0px;

    width: 15px;
  }
  ::-webkit-scrollbar-thumb {
    background: $color-light;
    border-radius: 10px;
    border: 3px solid $color-dark;
  }

  table {
    border-radius: 0px 0px 7px 0px;

    margin-top: 2px;
    border-spacing: 0;
    width: 100%;
    height: 100%;

    thead {
      background-color: $color-dark;
      height: 25px;
      tr {
        padding-right: 20px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        th {
          font-weight: 500;
        }
        th:nth-child(1) {
          flex: 6;
        }
        th:nth-child(2) {
          flex: 5;
        }
        th:nth-child(3) {
          flex: 1;
        }
        th:nth-child(4) {
          flex: 1;
        }
      }
    }
    tbody {
      background-color: $color-background;
      display: block;
      width: 100%;
      overflow-y: scroll;
      height: 100%;
      border-radius: 0px 0px 7px 0px;

      tr {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        td:nth-child(1) {
          flex: 6;
        }
        td:nth-child(2) {
          flex: 5;
        }
        td:nth-child(3) {
          flex: 1;
        }
        td:nth-child(4) {
          flex: 1;
        }
      }
    }
    th {
      padding: 5px 5px;
    }
    td {
      height: 15px;
      overflow: hidden;
      padding: 5px 5px;

      &.visibility {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .colorOpenWindow {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
