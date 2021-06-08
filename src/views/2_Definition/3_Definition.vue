<template>
  <section>
    <LottieThree
      routeName="DefinitionThree"
      :lottieURL="lottie"
      lottieScale="1"
      voiceID="aiisthestudy"
      :voiceDelay="1050"
    />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import LottieThree from "~components/Common/LottieThree.vue";
import Lottie from "~/assets/Lottie/6. AI IS.json";

export default Vue.extend({
  data() {
    return {
      lottie: Lottie,
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
