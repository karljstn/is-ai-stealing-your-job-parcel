<template>
	<canvas ref="canvasDraw" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'CanvasThree',
	mounted() {
		const canvas: HTMLCanvasElement = this.$refs.canvasDraw as HTMLCanvasElement;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const rect = ctx.canvas.getBoundingClientRect();

		onResize();

		// last known position
		const pos = { x: 0, y: 0 };

		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		window.addEventListener('resize', onResize);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mouseenter', onMouseDown);

		function setPos(x: number, y: number) {
			pos.x = x;
			pos.y = y;
		}

		function onMouseDown(e: MouseEvent) {
			setPos(e.pageX, e.pageY);
		}

		// resize canvas
		function onResize() {
			if (!ctx) return;

			console.log(rect);
			// ctx.canvas.width = window.innerWidth;
			// ctx.canvas.height = window.innerHeight;
		}

		function onMouseMove(e: MouseEvent) {
			if (!ctx) return;

			// Left mouse button must be pressed
			if (e.buttons !== 1) return;

			console.log(e.pageX, e.pageY);

			ctx.beginPath();

			ctx.lineWidth = 20;
			ctx.lineCap = 'round';
			ctx.strokeStyle = '#000';

			ctx.moveTo(pos.x, pos.y); // From
			setPos(e.pageX, e.pageY);
			ctx.lineTo(pos.x, pos.y); // To

			ctx.stroke();
		}
	},
});
</script>

<style scoped lang="scss">
@import '~/styles/_variables.scss';

canvas {
	user-select: none;
	outline: none;
	z-index: $content;
	pointer-events: none;
	width: 150px;
	height: 150px;
}
</style>
