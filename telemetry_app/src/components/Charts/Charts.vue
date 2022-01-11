<template>
  <div id="charts">
    <div v-for="index in 4" :key="index">
      <div
        v-if="channelsInfo.visible[index - 1]"
        class="singleChart"
        :style="{ 'border-color': channelsInfo.colors[index - 1] }"
      >
        <ApexChart
          ref="apexChart"
          :chart-data="channelsData[index - 1]"
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
      required: false,
    },
    //Data from main
    values: {
      type: Array,
      default: Array,
      required: false,
    },
  },
  data() {
    return {
      channelsData: [],
      plByMonth: [
        { name: "Jan", pl: 1000, avg: 500, inc: 300 },
        { name: "Feb", pl: 2000, avg: 900, inc: 400 },
        { name: "Apr", pl: 400, avg: 400, inc: 500 },
        { name: "Mar", pl: 3100, avg: 1300, inc: 700 },
        { name: "May", pl: 200, avg: 100, inc: 200 },
        { name: "Jun", pl: 600, avg: 400, inc: 300 },
        { name: "Jul", pl: 500, avg: 90, inc: 100 },
      ],
    };
  },
  watch: {
    values: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.handleInput(newVal);
      },
    },
  },
  methods: {
    handleInput(inputData) {
      try {
        if (inputData[0] != undefined) {
          if (this.channelsData.length == 0) {
            try {
              this.channelsData = [...Array(inputData[0].values.length)].map(
                () => ({ timestamps: [], values: [] })
              );
              for (let item in inputData) {
                if (item.values != undefined) {
                  for (let i = item.values.length - 1; i > 0; i--) {
                    this.channelsData[i].values.push(item.values[i]);
                    this.channelsData[i].timestamps.push(item.id);
                  }
                }
              }
            } catch (e) {
              console.error(e);
            }
          }
          try {
            for (let i = 0; i < this.channelsData.length; i++) {
              this.channelsData[i].values.push(inputData[0].values[i]);
              this.channelsData[i].timestamps.push(inputData[0].id);
            }
          } catch (e) {
            console.error(e);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#charts {
  .singleChart {
    position: inherit;
    border: 2px solid;
    border-radius: 10px;
    margin: 2px 2px 2px 2px;
  }
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
