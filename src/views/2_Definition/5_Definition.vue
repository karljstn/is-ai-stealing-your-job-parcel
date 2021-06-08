<template>
  <section>
    <LottieThree
      routeName="DefinitionFive"
      :lottieURL="lottie"
      lottieScale="1"
      voiceID="ivealreadylostyouhaventi"
      :voiceDelay="1050"
    />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import LottieThree from "~components/Common/LottieThree.vue";
import Lottie from "~/assets/Lottie/8. IVE ALREADY LOST.json";

export default Vue.extend({
  data() {
    return {
      lottie: Lottie,
    };
  },
  components: {
    LottieThree,
  },
});
</script>

<style lang="scss" scoped></style>
