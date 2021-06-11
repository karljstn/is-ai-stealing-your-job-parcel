<template>
  <div class="cursor" :class="this.currentState" ref="cursor"></div>
</template>

<script lang="ts">
import Vue from "vue";
import MouseController from "~/singletons/MouseController";
import RAF from "~/singletons/RAF";
import store from "~/store";
import { Vector2 } from "three";

const cursor = {
  target: new Vector2(),
  current: new Vector2(),
};

export default Vue.extend({
  props: ["timerPause"],
  data() {
    return {
      currentState: "",
    };
  },
  mounted() {
    store.commit("setUpdateCursor", this.updateCursor);
    RAF.subscribe("cursor", this.update);
  },
  destroyed() {
    RAF.unsubscribe("cursor");
  },
  methods: {
    updateCursor(mode: number) {
      const newState = this.check(mode);

      if (MouseController.hoveredNodeName === "CANVAS") {
        if (this.currentState !== newState) {
          this.currentState = newState;
        }
      } else {
        this.currentState = "";
      }
    },
    check(mode: number) {
      switch (mode) {
        case -1:
        case 0:
          if (!store.state.sceneManager.radio.patientFileOpened)
            store.state.radiologist.canvasClass("game-active");
          return "rotate";
        case 1:
          // return 'dolly'
          return "";
        case 2:
          if (!store.state.sceneManager.radio.patientFileOpened)
            store.state.radiologist.canvasClass("game-active");
          return "pan";
        case -5:
          if (!store.state.sceneManager.radio.patientFileOpened)
            store.state.radiologist.canvasClass("game-active pointer");
          return "click";
        default:
          return "";
      }
    },
    update() {
      cursor.target.copy(MouseController.raw.current);
      cursor.current.lerp(cursor.target, 0.8);

      let x = cursor.current.x - this.$refs.cursor.offsetHeight / 2;
      let y = cursor.current.y - this.$refs.cursor.offsetHeight;

      this.$refs.cursor.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    },
  },
});
</script>

<style lang="scss" scoped>
.cursor {
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: absolute;
  overflow: hidden;
  z-index: 100;
  pointer-events: none;
  user-select: none;
}
.dolly {
  background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/zoom.svg");
}
.rotate {
  background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/rotate-game.svg");
}
.click {
  // background-size: 40px;
  // background-position: -15px -15px;
  // background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/select-game.svg");
  cursor: pointer;
}
.pan {
  background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/drag-game.svg");
}
</style>