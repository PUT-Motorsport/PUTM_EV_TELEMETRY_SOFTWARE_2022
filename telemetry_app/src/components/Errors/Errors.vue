<template>
  <div id="Errors" class="container" :class="{ isVisible }">
    <p>Hello</p>
    <div>
      <div>Error I: {{ errorsIndices }}</div>
      <div v-for="error in errorsList" :key="error[0]">
        <div>
          <p>{{ error[0] + " | " + error[1] + " | " + error[2] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Errors",
  components: {},
  props: {
    isVisible: {
      type: String,
      default: String("nonDisplayed"),
      required: false,
    },
    values: {
      type: Object,
      default: Object,
      required: false,
    },
    channelSettings: {
      type: Object,
      default: Object,
      required: false,
    },
  },
  data: function () {
    return {
      errorsIndices: this.createIndicesArray(),
      errorsList: [],
    };
  },
  watch: {
    values: {
      immediate: true,
      deep: true,
      handler(val) {
        this.createErrorsList(val);
      },
    },
  },

  methods: {
    createIndicesArray: function () {
      let newIndices = [];
      for (let i = 0; i < this.channelSettings.length; i++) {
        if (this.channelSettings[i].iserror) {
          newIndices.push(i);
        }
      }
      return newIndices;
    },
    createErrorsList: function (data) {
      let newErrorsList = new Array();
      try {
        for (let i = 0; i < data.length; i++) {
          for (let errorI = 0; errorI < this.errorsIndices.length; errorI++) {
            if (data[i].values[this.errorsIndices[errorI]] != "NIL") {
              let errorTime = new Date(data[i].id);
              newErrorsList.push([
                errorTime.getDate() +
                  "." +
                  String(Number(errorTime.getMonth()) + 1) +
                  "." +
                  errorTime.getFullYear() +
                  " " +
                  errorTime.getHours() +
                  ":" +
                  errorTime.getMinutes() +
                  ":" +
                  errorTime.getSeconds() +
                  "." +
                  errorTime.getMilliseconds(),
                this.channelSettings[this.errorsIndices[errorI]].name,
                data[i].values[this.errorsIndices[errorI]],
              ]);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }

      this.errorsList = newErrorsList;
    },
  },
};
</script>

<style scoped lang="scss">
.nonDisplayed {
  display: none;
  opacity: 0;
}
#navBar {
  grid-column: 1 / span 3;
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
