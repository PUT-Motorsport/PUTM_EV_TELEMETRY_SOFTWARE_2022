<template>
  <div id="errorFilters">
    <div id="filtersSection">
      <div class="heading">
        <h3>Filters</h3>
      </div>
      <div id="filtersValues">
        <table>
          <thead id="header">
            <tr>
              <th class="ID">Filter</th>
              <th class="NAME">Value</th>
              <th class="NAME"><font-awesome-icon icon="eye" /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NAME</td>
              <td>HWD</td>
              <td>
                <font-awesome-icon icon="eye" />
              </td>
            </tr>
            <tr>
              <td>Desc</td>
              <td>Throttle</td>
              <td>
                <font-awesome-icon icon="eye" />
              </td>
            </tr>
            <tr>
              <td>Start</td>
              <td>15:02</td>
              <td>
                <font-awesome-icon icon="eye" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorsFilters",
  props: {},
  emits: [],
  data: function () {
    return {};
  },
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
#errorFilters {
  z-index: 20;
}
#filtersSection {
  height: 100%;
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

#filtersValues {
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
          flex: 6;
        }
        th:nth-child(3) {
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
          flex: 6;
        }
        td:nth-child(3) {
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
