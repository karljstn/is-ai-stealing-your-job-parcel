<template>
  <section>
    <LottieThree routeName="IntroGuess" :lottieURL="lottie" lottieScale="1" />
  </section>
</template>

<script lang="ts">
import LottieThree from "~components/Common/LottieThree.vue";
import lottie from "~/assets/Lottie/2. LET ME GUESS.json";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      lottie,
    };
  },
  components: {
    LottieThree,
  },
});
</script>
