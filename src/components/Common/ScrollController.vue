<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "~/router";
import NormalizeWheel from "normalize-wheel";
import VueRouter, { RouteRecordPublic } from "vue-router";
import { debounce } from "~util/_index.js";
import store from "~store";
import { VIEWS } from "~constants/VIEWS";
import { TweenedGLTF } from "~three/Meshes/GLTF";

const wait = 150;

export default Vue.extend({
  methods: {
    onWheel(event: Event) {
      const routes = router.getRoutes();
      const normalized = NormalizeWheel(event);
      const pixelSpeed = normalized.pixelY;
      const index = this.getPathIndex(router);
      const currentRoute = router.getRoutes()[this.getPathIndex(router)];
      const transition = this.getTransition(currentRoute.meta);

      if (currentRoute && this.getDisabled(currentRoute.meta)) {
        store.commit("setHideScrollDownArrow", true);
        return;
      }

      let target: RouteRecordPublic;

      if (pixelSpeed >= 1) {
        target = this.getNextRoute(routes, index);
        this.defaultNextTransition();
      } else if (!index) return;
      else {
        target = this.getPreviousRoute(routes, index);
        this.defaultPreviousTransition();
      }

      this.setScrollArrow(target.meta);

      this.defaultTransition();

      transition.out();

      setTimeout(() => {
        router.push(target);
      }, transition.delay);
    },
    getNextRoute(routes: RouteRecordPublic[], index: number) {
      if (!index) {
        return routes[1];
      } else {
        return routes[index + 1];
      }
    },
    getPreviousRoute(routes: RouteRecordPublic[], index: number) {
      if (index === 1) {
        return routes[0];
      } else {
        return routes[index - 1];
      }
    },
    getPathIndex(router: VueRouter) {
      const r = router as VueRouter & any; // bad type
      const index = parseFloat(r.history.current.path.substring(1));
      return index ? index : 0;
    },
    setScrollArrow(meta: any) {
      if (this.getDisabled(meta)) {
        store.commit("setHideScrollDownArrow", true);
      } else {
        store.commit("setHideScrollDownArrow", false);
      }

      if (this.getDarkenScrollDownArrow(meta)) {
        store.commit("setDarkenScrollDownArrow", true);
      } else {
        store.commit("setDarkenScrollDownArrow", false);
      }
    },
    getDisabled(meta: any) {
      return meta.scroll.disabled;
    },
    getTransition(meta: any) {
      return meta.transition;
    },
    getDarkenScrollDownArrow(meta: any) {
      return meta.scroll.darkenScrollDownArrow;
    },
    defaultTransition() {
      for (const VIEW of VIEWS) {
        for (const gltf of store.state.sceneManager.threeViews.get(VIEW)
          .gltfMeshes) {
          const tweened = gltf as TweenedGLTF;

          if (typeof tweened.out !== "undefined") tweened.out();
          if (typeof tweened.killTimeouts !== "undefined")
            tweened.killTimeouts();
        }
      }
    },
    defaultNextTransition() {
      //TODO: ugly but it works I guess
      const el = document.querySelector(".lottie");
      if (typeof el !== "undefined") el.classList.add("out-next");
    },
    defaultPreviousTransition() {
      //TODO: ugly but it works I guess
      const el = document.querySelector(".lottie");
      if (typeof el !== "undefined") el.classList.add("out-previous");
    },
  },
  mounted() {
    const debounced = debounce(this.onWheel, wait, true);
    const currentRoute = router.getRoutes()[this.getPathIndex(router)];

    if (currentRoute) this.setScrollArrow(currentRoute.meta);

    window.addEventListener("wheel", debounced);
    window.addEventListener("mousewheel", debounced);
  },
});
</script>
