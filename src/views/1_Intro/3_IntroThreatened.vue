<template>
  <section>
    <LottieThree
      routeName="IntroThreatened"
      :lottieURL="lottie"
      lottieScale="1"
      :onRect="this.onRect"
    />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import LottieThree from "~components/Common/LottieThree.vue";
import Lottie from "~/assets/Lottie/3. YOURE HERE BECAUSE.json";
import { Group } from "three";

export default Vue.extend({
  data() {
    return {
      lottie: Lottie,
      onRect: (x: number, y: number, w: number, h: number, group: Group) => {},
    };
  },
  components: {
    LottieThree,
  },
  mounted() {
    document.body.classList.add("white-nav");
  },
  destroyed() {
    document.body.classList.remove("white-nav");
  },
});
</script>

<style lang="scss" scoped></style>
