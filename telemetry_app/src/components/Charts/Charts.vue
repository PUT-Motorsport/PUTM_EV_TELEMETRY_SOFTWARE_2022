<template>
  <div id="charts">
    <div v-for="index in values.length + 1" :key="index">
      <div
        v-if="
          channelsInfo.visible[index - 1] &&
          !channelsInfo.settings[index - 1].iserror
        "
        class="singleChart"
        :style="{ 'border-color': channelsInfo.colors[index - 1] }"
      >
        <ApexChart
          ref="apexChart"
          :chart-data="values[index - 1]"
          :chart-settings="channelsInfo.settings[index - 1]"
          :chart-color="channelsInfo.colors[index - 1]"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ApexChart from "./ApexCharts.vue";
export default {
  name: "Charts",
  components: {
    ApexChart,
  },
  props: {
    //informations about channels
    channelsInfo: {
      type: Object,
      default: Object,
      required: true,
    },
    //Data from main
    values: {
      type: Array,
      default: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
#charts {
  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: $color-dark;
    border-radius: 10px;

    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background: $color-light;
    border-radius: 10px;
    border: 3px solid $color-dark;
  }
  .singleChart {
    position: inherit;
    border: 2px solid;
    border-radius: 10px;
    margin: 2px 2px 2px 2px;
    background-color: $color-background;
  }
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
