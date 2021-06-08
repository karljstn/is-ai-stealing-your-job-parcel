<template>
  <canvas ref="canvasThree" :class="canvasClass" />
</template>

<script lang="ts">
import Vue from "vue";
import ThreeMainController from "~three/MainController";
import store from "~/store";

export default Vue.extend({
  name: "CanvasThree",
  data() {
    return {
      canvasClass: false,
    };
  },
  mounted() {
    const controller = new ThreeMainController(this.$refs.canvasThree, 60);
    controller.start();

    // if(store.state.devMode.forceRadiologist) scene.startRadiologist()
    store.commit("setScene", controller);
    store.commit("setClassCanvas", this.changeCursor);
  },
  methods: {
    changeCursor(canvasClass: string) {
      this.canvasClass = canvasClass;
    },
  },
});
</script>

<style scoped lang="scss">
@import "~/styles/_variables.scss";

canvas {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  z-index: $canvas;
  pointer-events: none;
}

.game-active {
  cursor: none;
}

.pointer {
  cursor: pointer;
}
</style>
