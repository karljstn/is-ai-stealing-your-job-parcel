<template>
  <transition mode="out-in" appear @enter="enter" @leave="leave" :css="false">
    <div class="anim-container">
      <Loader />
    </div>
  </transition>
</template>

<script lang="ts">
import gsap from "gsap";
import store from "~/store";

import Vue from "vue";
import Loader from "~/components/UI/Loader.vue";

export default Vue.extend({
  components: {
    Loader,
  },
  methods: {
    enter(el: HTMLElement, done: Function) {
      done();
    },
    leave(el: HTMLElement, done: Function) {
      done();
    },
  },
});
</script>

<style lang="scss" scoped>
.anim-container {
  opacity: 0;
}
</style>
