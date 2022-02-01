<template>
  <div id="navbar">
    <div class="flexBar">
      <!-- probably TODO automatization of this -->
      <div :class="generalClass" @click="clicked('generalSwitch')">General</div>
      <div :class="errorClass" @click="clicked('errorSwitch')">Errors</div>
      <!-- <div>+</div> -->
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
      generalClass: "selected",
      errorClass: "",
    };
  },

  mounted() {},

  methods: {
    clicked(event) {
      this.$emit("signalSwitch", event);
      //needToChange THAT TODO IMPORTANT
      if (event == "generalSwitch") {
        this.generalClass = "selected";
        this.errorClass = "";
      }
      if (event == "errorSwitch") {
        this.generalClass = "";
        this.errorClass = "selected";
      }
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

div.selected {
  color: $color-active;
}
</style>
