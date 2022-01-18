<template>
  <div :style="{ background: color }">
    <ColorPicker
      theme="dark"
      :color="color"
      :sucker-hide="false"
      :sucker-canvas="suckerCanvas"
      :sucker-area="suckerArea"
      @changeColor="changeColor"
      @openSucker="openSucker"
    />
  </div>
</template>

<script>
import { ColorPicker } from "vue-color-kit";
import "vue-color-kit/dist/vue-color-kit.css";

export default {
  components: {
    ColorPicker,
  },
  props: {
    colorIn: {
      type: String,
      default: String,
      required: false,
    },
  },
  emits: ["color"],
  data() {
    return {
      color: this.colorIn,
      suckerCanvas: null,
      suckerArea: [],
      isSucking: false,
    };
  },
  mounted() {
    this.color = this.colorIn;
  },
  methods: {
    changeColor(color) {
      const { r, g, b, a } = color.rgba;
      this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
      this.$emit("color", this.color);
    },
    openSucker(isOpen) {
      if (isOpen) {
        // ... canvas be created
        // this.suckerCanvas = canvas
        // this.suckerArea = [x1, y1, x2, y2]
      } else {
        // this.suckerCanvas && this.suckerCanvas.remove
      }
    },
  },
};
</script>
