<template>
  <div class="app">
    <apexchart
      width="100%"
      height="200px"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    chartData: {
      type: Object,
      required: false,
      default: Object,
    },
    chartSettings: {
      type: Object,
      required: false,
      default: Object,
    },
    chartColor: {
      type: String,
      required: false,
      default: String,
    },
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          foreColor: "#ffffff",
          id: `vuechart-${this.chartSettings.name.trim()}`,
          animations: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          type: "numeric",
          categories: this.chartData.timestamps,
          labels: {
            show: true,
            format: "HH:mm:ss.ff",
            formatter: function (value) {
              const currDate = new Date(value);
              return (
                currDate.getHours() +
                ":" +
                currDate.getMinutes() +
                ":" +
                currDate.getSeconds() +
                "." +
                currDate.getMilliseconds()
              ); // The formatter function overrides format property
            },
          },
          range: 10000,
        },
        yaxis: {
          min: this.chartSettings.min,
          max: this.chartSettings.max,
        },
        //Data Labels options
        tooltip: {
          enabled: true,
          shared: false,
          followCursor: true,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: false,
          theme: "dark",
          style: {
            fontSize: "12px",
            fontFamily: undefined,
          },
          onDatasetHover: {
            highlightDataSeries: true,
          },
          x: {
            show: true,
            format: "HH:mm:ss:ff",
          },
          y: {
            formatter: this.format,
          },
        },
      },
      series: [
        {
          name: this.chartSettings.name,
          data: this.chartData.values,
        },
      ],
    };
  },

  methods: {
    format(val) {
      return val + this.chartSettings.unit;
    },
  },
};
</script>

<style lang="scss" scoped>
.apexcharts-tooltip {
  opacity: 1 !important;
}
</style>
