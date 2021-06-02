<template>
  <section>
    <LottieThree
      routeName="DefinitionSix"
      :lottieURL="lottie"
      lottieScale="1"
    />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import LottieThree from "~components/Common/LottieThree.vue";
import Lottie from "~/assets/Lottie/9. BASICALLY.json";

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
