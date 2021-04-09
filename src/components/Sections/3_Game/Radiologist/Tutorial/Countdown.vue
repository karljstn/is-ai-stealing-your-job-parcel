<template>
  <div class="countdown-container" ref="countdownContainer">
    <!-- <div class="number-container">
      <span>3</span>
      <span>2</span>
      <span>1</span>
    </div> -->

    <p class="go" ref="go">Let's go!</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gsap from "gsap";

export default Vue.extend({
  props: ["hide"],
  mounted() {
    gsap.to(this.$refs.countdownContainer, {
      duration: 0.3,
      scale: 1,
      opacity: 1,
      rotateZ: -5,
    });

    gsap.to(this.$refs.go, {
      duration: 0.5,
      x: 0,
      opacity: 1,
      delay: 0.3,
    });

    gsap.to(this.$refs.go, {
      duration: 0.5,
      x: 200,
      opacity: 0,
      delay: 0.9,
    });

    gsap.to(this.$refs.countdownContainer, {
      duration: 0.3,
      scale: 0,
      opacity: 0,
      delay: 1.2,
      onComplete: this.hide,
    });
  },
});
</script>

<style lang="scss" scoped>
.countdown-container {
  padding: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;

  width: 25%;

  border-radius: 20px;
  background-color: #452ca0;
  color: white;

  .go {
    transform: translate(-200px, 0);
    text-align: center;
    opacity: 0;
  }
}
</style>