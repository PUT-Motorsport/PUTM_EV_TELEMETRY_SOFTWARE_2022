<template>
  <div id="errorsPage" class="container" :class="{ isVisible }">
    <table id="errorsTable">
      <thead>
        <tr>
          <th class="ID">Name</th>
          <th class="NAME">Description</th>
          <th class="NAME">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="error in errorsList" :key="error[0]">
          <td>{{ error[2] }}</td>
          <td>{{ error[1] }}</td>
          <td>{{ error[0] }}</td>
        </tr>
      </tbody>
    </table>
    <div>Error I: {{ errorsIndices }}</div>
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
#errorsPage {
  background-color: $color-background;
  border: 2px solid $color-accent;
  padding: 0px;
  border-radius: 10px;
  margin-left: 10px;

  table {
    border-spacing: 0;
    padding: 0px;
    width: 100%;
    font-size: $font-sm;
    thead {
      border-radius: 10px;
      th {
        background-color: $color-dark;
        padding: 3px;
      }
      th:first-child {
        border-radius: 10px 0 0 0px;
      }

      th:last-child {
        border-radius: 0px 10px 0px 0px;
      }
    }
    tbody {
      tr:nth-child(2n) {
        background-color: darken($color-dark, 12%);
      }
    }
  }
}
</style>
