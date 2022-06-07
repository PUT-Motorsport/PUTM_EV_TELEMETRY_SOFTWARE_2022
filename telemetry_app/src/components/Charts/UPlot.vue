<template>
  <div>
    <UplotVue :options="opts" :data="data" />
  </div>
</template>
<script>
import "uplot/dist/uPlot.min.css";
import UplotVue from "uplot-vue";

export default {
  name: "Chart",
  components: { UplotVue },
  data() {
    return {
      opts: {
        title: "Test",
        width: 500,
        height: 300,
        series: [
          {
            label: "Date",
          },
          {
            label: "",
            points: { show: false },
            stroke: "#00437a",
            fill: "#00437a22",
          },
        ],
        scales: { x: { time: false } },
      },
    };
  },
  beforeMount() {
    // Initialize data inside mounted hook, to prevent Vue from adding watchers, otherwise performance becomes unbearable
    this.data = [
      [...new Array(1000)].map((_, i) => i),
      [...new Array(1000)].map((_, i) => i % 1000),
    ];
  },
  mounted() {
    setInterval(() => {
      const options = {
        ...this.options,
        title: "Update Test",
      };
      const data = [
        [...this.data[0], this.data[0].length],
        [...this.data[1], this.data[0].length % 1000],
      ];
      this.data = data;
      // Since we disabled reactivity for data above
      // ???
      //this.$forceUpdate();
      this.options = options;
    }, 1000);
  },
};

/* export default {
  name: "ChartUPlot",
  components: { UplotVue },
  props: {
    inData: {
      type: Object,
      default: Object,
      required: true,
    },
  },
  data: function () {
    return {
      staticData: [
        [1, 2, 3, 4, 5],
        [23, 23, 43, 12, 12],
      ],
      opts: {
        title: "My Chart",
        id: "chart1",
        class: "my-chart",
        width: 800,
        height: 600,
        series: [
          {},
          {
            // initial toggled state (optional)
            show: true,

            spanGaps: false,

            // in-legend display
            label: "RAM",
            value: (self, rawValue) => "$" + rawValue.toFixed(2),

            // series style
            stroke: "red",
            width: 1,
            fill: "rgba(255, 0, 0, 0.3)",
          },
        ],
      },
    };
  },
   watch: {
    inData: {
      immediate: true,
      deep: true,
      handler(val) {
        try {
          this.staticData = [val.timestamps, val.vals];
        } catch (error) {
          console.error(error);
        }
      },
    },
  },
}; */
</script>

<style scoped></style>
