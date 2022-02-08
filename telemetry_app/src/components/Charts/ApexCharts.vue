<template>
  <div class="apexChartBox">
    <div
      ref="nameOfChart"
      class="name"
      :style="{ 'background-color': chartColor, color: nameColor }"
    >
      {{ chartSettings.name }}
    </div>
    <apexchart
      ref="apexchart1"
      width="100%"
      height="200px"
      type="line"
      :options="chartOptions"
      :series="series"
      class="apexChart"
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
      nameColor: "white",
      chartOptions: {
        colors: [this.chartColor],
        chart: {
          foreColor: "#ffffff",
          id: `vuechart-${this.chartSettings.name.trim()}`,
          group: "carstats",
          animations: {
            enabled: false,
          },
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: true,
              zoom: false,
              zoomin: true,
              zoomout: true,
              pan: true,
            },
          },
          zoom: {
            enabled: true,
          },
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "numeric",
          categories: this.chartData.timestamps,
          labels: {
            show: false,
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
        yaxis: [
          {
            seriesName: "s-1",
            min: this.chartSettings.min,
            max: this.chartSettings.max,
          },
          {
            opposite: true,
            seriesName: "s-1",
            min: this.chartSettings.min,
            max: this.chartSettings.max,
          },
        ],
        //Data Labels options
        tooltip: {
          autoSelected: "zoom",
          enabled: true,
          shared: false,
          followCursor: false,
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
  watch: {
    chartSettings: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.handleNewSettings(newVal);
      },
    },
    chartColor: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.handleNewColor(newVal);
        this.nameColor = this.setColor(newVal);
      },
    },
  },
  update() {
    this.$refs.apexchart1.$el.click();
  },
  methods: {
    format(val) {
      return val + this.chartSettings.unit;
    },
    hexToRGB(hex) {
      var aRgbHex = hex.match(/.{1,2}/g);
      var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16),
      ];
      return aRgb;
    },
    rgbStrToArr(rgb) {
      return rgb.substring(5).slice(0, -1).split(",");
    },
    setColor(newVal) {
      let bgColor;
      if (newVal[0] == "#") {
        bgColor = this.hexToRGB(newVal.substring(1));
      } else {
        bgColor = this.rgbStrToArr(newVal);
      }

      const brightness = Math.round(
        (parseInt(bgColor[0]) * 299 +
          parseInt(bgColor[1]) * 587 +
          parseInt(bgColor[2]) * 114) /
          1000
      );
      const textColour = brightness > 125 ? "black" : "white";
      return textColour;
    },
    handleNewColor(val) {
      this.chartOptions = { ...this.chartOptions, colors: [val] };
    },
    handleNewSettings(val) {
      this.chartOptions = {
        ...this.chartOptions,
        chart: {
          ...this.chartOptions.chart,
          id: `vuechart-${val.name.trim()}`,
        },
        yaxis: [
          {
            seriesName: "s-1",
            min: val.min,
            max: val.max,
          },
          {
            opposite: true,
            seriesName: "s-1",
            min: val.min,
            max: val.max,
          },
        ],
        y: {
          formatter: this.format,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
div.apexChartBox {
  position: relative;
}
.apexcharts-tooltip {
  opacity: 1 !important;
}
.apexChart {
  margin-top: 2px;
}
div.name {
  position: absolute;
  left: 0;
  top: -2px;
  padding: 2px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 6px 0px 6px 0px;
  --switch: calc((var(--light) - var(--threshold)) * -100%);
  color: hsl(0, 0%, var(--switch));
}
.apexcharts-tooltip,
.apexcharts-tooltip.active,
.apexcharts-xaxistooltip,
.apexcharts-xaxistooltip.active,
.apexcharts-marker {
  transition: none;
}
</style>
