<template>
  <section>
    <LottieThree
      routeName="DefinitionFour"
      :lottieURL="lottie"
      lottieScale="1"
      voiceID="devicesthatperceivetheirenvironment"
      :voiceDelay="1050"
    />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import LottieThree from "~components/Common/LottieThree.vue";
import Lottie from "~/assets/Lottie/7. DEVICES THAT.json";

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
