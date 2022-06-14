<!-- Settigns where you set length of each frame and errors frames -->
<template>
  <div class="frameBox" :class="{ closed: isClosed }">
    <div
      class="close"
      :class="{ hovered: setCursor }"
      @click="closeBox()"
      @mouseover="setCursor = true"
      @mouseleave="setCursor = false"
    >
      <font-awesome-icon icon="xmark" />
    </div>
    <div class="inputs">
      <table>
        <tr>
          <td>
            <label>Frame 26</label>
          </td>
          <td>
            <input
              v-model="frameLength[0]"
              type="number"
              name="frameLength"
              placeholder="enter frame length"
              class="input"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>Frame 27</label>
          </td>
          <td>
            <input
              v-model="frameLength[1]"
              type="number"
              name="frameLength"
              placeholder="enter frame length"
              class="input"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>Frame 28</label>
          </td>
          <td>
            <input
              v-model="frameLength[2]"
              type="number"
              name="frameLength"
              placeholder="enter frame length"
              class="input"
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>Frame 29</label>
          </td>
          <td>
            <input
              v-model="frameLength[3]"
              type="number"
              name="frameLength"
              placeholder="enter frame length"
              class="input"
            />
          </td>
        </tr>
      </table>
    </div>
    <div class="buttons"></div>
  </div>
  <div class="frameButton">
    <button @click="openFrameSettings()">
      <font-awesome-icon :icon="['fas', 'gear']" />
      Frame Settings
    </button>
  </div>
</template>

<script>
export default {
  name: "FrameSettings",
  components: {},
  emits: ["openFrameSettings"],
  data() {
    return {
      setCursor: false,
      isClosed: true,
      frameLength: [20, 20, 20, 20],
    };
  },
  methods: {
    openFrameSettings() {
      this.isClosed = false;
    },
    closeBox() {
      this.isClosed = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.frameButton {
  height: 26px;
  background-color: $color-background;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  button {
    background-color: $color-dark;
    margin: 0px;
    margin-right: 2px;
    border: none;
    font-size: $font-xs;
    height: 100%;
    background-color: $color-dark;
    color: $color-white;

    &:hover {
      cursor: pointer;
      color: $color-accent;
    }
  }
}

.frameBox {
  &.closed {
    display: none;
  }

  .close {
    width: 100;
    text-align: right;
    font-size: $font-sm;
    padding-right: 10px;
  }
}
</style>
