<template>
  <div id="navbar">
    <div class="flexBar">
      <div @click="clicked('generalSwitch')">General</div>
      <div @click="clicked('errorSwitch')">Errors</div>
      <div>+</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  emits: ["signalSwitch"],
  data: function () {
    return {
      visible: 0,
    };
  },

  mounted() {},

  methods: {
    clicked(event) {
      this.$emit("signalSwitch", event);
    },
  },
};
</script>

<style lang="scss" scoped>
.flexBar {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  div {
    height: 100%;
    padding: 5px;
    font-weight: 500;
    margin: 2px;
    border-radius: 0px 0px 10px 10px;
    color: $color-main;
    background-color: $color-dark;
    text-transform: uppercase;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
