<template>
  <div class="tutorial-container">
    <div class="content" ref="tutorialContainer">
      <Welcome v-if="this.tutorialCount === 0"></Welcome>
      <Schema v-if="this.tutorialCount === 1"></Schema>

      <button v-if="this.tutorialCount < 2" v-on:click="this.fadeOut">
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Welcome from "./Welcome.vue";
import Schema from "./Schema.vue";
import gsap from "gsap";

export default Vue.extend({
  props: ["tutorialCount", "setTutorialCount"],
  watch: {
    tutorialCount(newValue) {
      console.log("new value", newValue);

      if (newValue < 2) {
        this.fadeIn();
      } else {
        console.log("end");
      }
    },
  },
  components: {
    Welcome,
    Schema,
  },
  methods: {
    fadeIn() {
      gsap.to(this.$refs.tutorialContainer, {
        duration: 0.2,
        opacity: 1,
      });
    },
    fadeOut() {
      gsap.to(this.$refs.tutorialContainer, {
        duration: 0.2,
        opacity: 0,
        onComplete: this.setTutorialCount,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.tutorial-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: #7a77a8;
  padding: 50px;
  border-radius: 20px;
}
</style>