<template>
  <div class="rect" ref="rect">
    <div ref="lottie" class="lottie">
      <lottie-animation :animationData="lottieURL" :loop="false" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { fadeBackground } from "~util";
import LottieAnimation from "lottie-web-vue";
import SaveRect from "~components/Common/SaveRect.vue";
import store from "~store";
import { VIEWS } from "~constants/VIEWS";

export default Vue.extend({
  props: [
    "routeName",
    "lottieURL",
    "lottieScale",
    "onMount",
    "onDestroy",
    "onRect",
  ],
  data() {
    return {
      viewData: VIEWS.find((VIEW) => VIEW.ROUTE_NAME === this.routeName),
    };
  },
  components: {
    LottieAnimation,
    SaveRect,
  },
  mounted() {
    this.$refs.lottie.style.maxWidth = this.lottieScale * 600 + "px";

    this.$nextTick(() => {
      const manager = store.state.sceneManager;
      const { viewData, onRect } = this;
      const threeView = manager.threeViews.get(viewData);
      const rectElement = this.$refs.rect;

      threeView.start({ rectElement, onRect });

      fadeBackground({ routeName: this.routeName });

      if (typeof this.onMount === "function") this.onMount();

      // Hot reloading
      if (!module.hot) return;
      module.hot.dispose(() => {
        manager.threeViews.get(this.viewData).destroy();
        if (typeof this.onDestroy === "function") this.onDestroy();
      });
    });
  },
  destroyed() {
    store.state.sceneManager.threeViews.get(this.viewData).destroy();

    if (typeof this.onDestroy === "function") this.onDestroy();
  },
});
</script>

<style lang="scss" scoped>
.lottie {
  max-width: 600px;
  transition: all 0.3s ease-in-out;
  &.out-previous {
    transform: translate3d(0, -5%, 0);
    opacity: 0;
  }
  &.out-next {
    transform: translate3d(0, 5%, 0);
    opacity: 0;
  }
}
</style>
