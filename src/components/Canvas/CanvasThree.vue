<template>
	<canvas ref="canvasThree" />
</template>

<script lang="js">
import Vue from "vue";

import Scene from "~/three/MainScene";
import { getMaxFPS } from "~/util/";
import store from "~/store";

export default Vue.extend({
  name: "CanvasThree",
  mounted() {
    const scene = new Scene(this.$refs.canvasThree, 60);
    scene.start()
    store.commit("setScene", scene)
  },
});
</script>

<style scoped lang="scss">
@import '../../styles/variables.scss';

canvas {
	position: fixed;
	top: 0;
	left: 0;
	outline: none;
	z-index: $canvas;
}
</style>
