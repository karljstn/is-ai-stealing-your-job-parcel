<template>
  <div class="end-screen-container">
    <div class="end-screen-1" ref="endScreen1">
      <p>You processed {{ this.results.processedFiles }} files</p>
      <p>You asked {{ this.results.AIused }} time for AI assistance</p>
      <p>Your diagnosis was right {{ this.results.goodAnswers }} times</p>
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
import store from "~/store";

export default Vue.extend({
  mounted() {
    const tl = gsap.timeline({
      onComplete: () => {
        // this.$router.push("15");
      },
    });
    tl.to(this.$refs.endScreen1, { duration: 1, opacity: 1 });
    tl.to(this.$refs.endScreen1, { duration: 1, opacity: 0, delay: 3 });
    tl.to(this.$refs.endScreen2, { duration: 1, opacity: 1 });
    tl.to(this.$refs.endScreen2, { duration: 1, opacity: 0, delay: 3 });
  },
  computed: {
    results() {
      return store.state.radiologist.results;
    },
  },
});
</script>

<style lang="scss" scoped>
.end-screen-container {
  .end-screen-1,
  .end-screen-2 {
    position: absolute;
    left: 50%;
    top: 54%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    opacity: 0;
  }

  p {
    color: white;
    text-align: center;
    font-size: 2.5em;
  }
}
</style>
