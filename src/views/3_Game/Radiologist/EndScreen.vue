<template>
  <div class="end-screen-container">
    <div class="end-screen-1" ref="endScreen1">
      <p>You processed 3 files</p>
      <p>You asked 1 time for AI assistance</p>
      <p>Your diagnosis was right once</p>
    </div>
    <div class="end-screen-2" ref="endScreen2">
      <p>
        Maybe if you had asked the AI for further assistance, you would have
        been more efficient.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gsap from "gsap";

export default Vue.extend({
  mounted() {
    const tl = gsap.timeline();
    tl.to(this.$refs.endScreen1, { duration: 1, opacity: 1 });
    tl.to(this.$refs.endScreen1, { duration: 1, opacity: 0, delay: 1 });
    tl.to(this.$refs.endScreen2, { duration: 1, opacity: 1 });
    tl.to(this.$refs.endScreen2, { duration: 1, opacity: 0, delay: 1 });
  },
});
</script>

<style lang="scss" scoped>
.end-screen-container {
  .end-screen-1,
  .end-screen-2 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    opacity: 0;
  }

  p {
    font-size: 2.5em;
  }
}
</style>