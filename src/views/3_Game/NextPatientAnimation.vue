<template>
  <div class="lottie">
    <lottie-animation
      ref="nextpatient"
      :animationData="lottieURL"
      :loop="false"
      :autoPlay="true"
      @complete="this.nextPatientCallback"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import lottieNextPatientURL from "~/assets/Lottie/Radiologist/nextpatient.json";
import LottieAnimation from "lottie-web-vue";

export default Vue.extend({
  props: ["nextPatientCallback"],
  data() {
    return {
      lottieURL: lottieNextPatientURL,
    };
  },

  components: {
    LottieAnimation,
  },
});
</script>

<style lang="scss" scoped>
</style>