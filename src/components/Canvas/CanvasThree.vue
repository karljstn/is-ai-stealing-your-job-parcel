<template>
  <canvas ref="canvasThree" />
</template>

<script lang="js">
import Vue from "vue";

import Scene from "~/three/MainScene";
// import Benchmark from "~/three/Benchmark";
import { getMaxFPS } from "~/util/";
import store from "~/store";

export default Vue.extend({
  name: "CanvasThree",
  mounted() {
    setTimeout(() => {
      getMaxFPS().then((maxFPS) => {
        console.log(Math.floor(maxFPS));
        const scene = new Scene(this.$refs.canvasThree, 60);
        scene.start();

        scene.startRadiologist();

        store.commit("setScene", scene);
      });
    }, 100);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
canvas {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  z-index: -1;
}
</style>
