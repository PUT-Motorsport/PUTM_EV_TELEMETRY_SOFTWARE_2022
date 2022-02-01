<template>
  <div id="errorFilters">
    <div id="filtersSection">
      <div class="heading">
        <h3>Filters</h3>
      </div>
      <div>
        <table>
          <thead id="header">
            <tr>
              <th class="ID">Name</th>
              <th class="NAME">Value</th>
              <th class="NAME"><font-awesome-icon icon="eye" /></th>
              <th class="NAME"><font-awesome-icon icon="palette" /></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Channels",
  props: {},
  emits: [],
  data: function () {
    return {};
  },
  watch: {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
