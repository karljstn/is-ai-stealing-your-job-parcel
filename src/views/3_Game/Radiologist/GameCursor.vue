<template>
  <div class="cursor rotate" ref="cursor"></div>
</template>

<script lang="ts">
import Vue from "vue";
import MouseController from "~/singletons/MouseController";
import RAF from "~/singletons/RAF";
import store from "~/store";
import gsap from "gsap";
export default Vue.extend({
  mounted() {
    console.log(MouseController.mouseVec2.x);
    console.log(this.$refs.cursor.offsetWidth);

    RAF.subscribe("cursor", this.update);
  },
  destroyed() {
    RAF.unsubscribe("cursor");
  },
  methods: {
    updateCursor(mode: string) {
      switch (mode) {
        case "rotate":
          break;
        case "click":
          break;
        case "pan":
          break;

        default:
          break;
      }
    },
    update() {
      // console.log("oui");

      // this.$refs.cursor.style.transform =
      // this.$refs.cursor.style.y = MouseController.mouseVec2.y;

      //  (e.clientX / window.innerWidth) * 2 - 1

      gsap.to(this.$refs.cursor, {
        x:
          MouseController.mouseVec2Viewport.x -
          this.$refs.cursor.offsetWidth / 2,
        y:
          MouseController.mouseVec2Viewport.y -
          this.$refs.cursor.offsetHeight / 1,
      });
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
  // position: absolute;
  z-index: 100;
  pointer-events: none;
}

.rotate {
  background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/rotate.svg");
  background-color: red;
}
.click {
  background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/rotate.svg");
}
.pan {
  background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/rotate.svg");
}
</style>