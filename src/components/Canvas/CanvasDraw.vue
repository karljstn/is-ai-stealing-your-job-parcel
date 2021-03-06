<template>
  <canvas ref="canvasDraw" />
</template>

<script lang="ts">
import Vue from "vue";
import { clamp, map } from "~util/";
import store from "~store";
import { Vector2 } from "three";
import { PALETTE } from "~constants/PALETTE";
// import n from 'noisejs';
// const noise = new n.Noise(Math.random());
import AudioController from "~/singletons/AudioController";
import { getCurrentRoute } from "~router";

const init = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const origin = new Vector2();
  const current = new Vector2();
  const params = {
    line: {
      width: 15,
    },
    finishDistance: 160,
  };

  // canvas rect
  let rect: DOMRect;

  const setPos = (x: number, y: number) => {
    if (getCurrentRoute().name !== "DefinitionTwo") return; //TODO: fix  unsubs not actually working

    const offset = {
      x: x - rect.left,
      y: y - rect.top,
    };
    const mapped = {
      x: map(offset.x, 0, rect.width, 0, 1),
      y: map(offset.y, 0, rect.height, 0, 1),
    };
    const scaled = {
      x: clamp(mapped.x, -0.05, 1.05) * rect.width * 3,
      y: clamp(mapped.y, -0.05, 1.05) * rect.height * 1.5,
    }; //TODO: figure out the *3 and *1.5 constants here

    current.set(scaled.x, scaled.y);

    if (mapped.x > 0 && mapped.x < 1 && mapped.y > 0 && mapped.y < 1) {
      AudioController.play("pen");

      const d = origin.distanceTo(current);
      if (d > params.finishDistance && !store.state.isPencilFinished) {
        store.commit("setPencilFinished", true);
      }
      if (origin.length() === 0) {
        origin.set(scaled.x, scaled.y);
      }
    }
  };

  const onMouseDown = (e: MouseEvent) => {
    setPos(e.pageX, e.pageY);
  };

  // resize canvas
  const onResize = () => {
    if (!ctx) return;

    rect = ctx.canvas.getBoundingClientRect();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!ctx) return;

    // Left mouse button must be pressed
    if (
      (e.buttons !== 1 && !store.state.isPencilWriting) ||
      !store.state.isPencilWriting
    )
      return;

    ctx.beginPath();

    ctx.lineWidth = params.line.width;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    ctx.moveTo(current.x, current.y); // From
    setPos(e.pageX, e.pageY);
    ctx.lineTo(current.x, current.y); // To

    ctx.stroke();
  };

  onResize();

  ctx.fillStyle = PALETTE.PINK;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  window.addEventListener("resize", onResize);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseenter", onMouseDown);

  return () => {
    // console.log('removing');
    window.removeEventListener("resize", onResize);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("mouseenter", onMouseDown);
  };
};

let unsub: () => void;

export default Vue.extend({
  name: "CanvasThree",
  props: ["id"],
  mounted() {
    if (store.state.isPencilFinished) store.commit("setPencilFinished", false);

    const canvas: HTMLCanvasElement = this.$refs
      .canvasDraw as HTMLCanvasElement;
    unsub = init(canvas);
  },
  destroyed() {
    unsub();
  },
});
</script>

<style scoped lang="scss">
@import "~/styles/_variables.scss";

canvas {
  user-select: none;
  outline: none;
  z-index: $content;
  pointer-events: none;
}
</style>
