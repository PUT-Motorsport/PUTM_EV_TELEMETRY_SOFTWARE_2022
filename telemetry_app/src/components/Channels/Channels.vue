<template>
  <div id="channels">
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
          <td>{{ item.name }}</td>
          <td>
            {{ values[0].values[item.id].toFixed(item.precision) + item.unit }}
          </td>
          <td class="visibility" @click="changeVisibility(item.id)">
            <font-awesome-icon
              v-if="visible[item.id]"
              icon="eye"
            /><font-awesome-icon
              v-if="!visible[item.id]"
              icon="eye-slash"
              style="opacity: 0.7"
            />
          </td>
          <td @click="colorWindow(item.id)">
            <font-awesome-icon
              icon="square"
              :style="{ color: colors[item.id] }"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Channels",
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
  },
  emits: ["visibility"],
  data: function () {
    return { visible: [], colors: [] };
  },
  methods: {
    changeVisibility(id) {
      this.visible[id] = !this.visible[id];
      //Sends data about window visibility
      //@arg `true` | `false`
      this.$emit("visibility", this.visible);
    },
    colorWindow(id) {
      //TODO Open color window
      return id;
    },
  },
};
</script>

<style lang="scss" scoped>
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
}
</style>
