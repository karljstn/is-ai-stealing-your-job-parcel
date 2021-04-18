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

    if(store.state.devMode.forceRadiologist) scene.startRadiologist()
    store.commit("setScene", scene)
  },
});
</script>

<style scoped lang="scss">
@import '~/styles/_variables.scss';

canvas {
	position: fixed;
	top: 0;
	left: 0;
	outline: none;
	z-index: $canvas;
	pointer-events: none;
}
</style>
