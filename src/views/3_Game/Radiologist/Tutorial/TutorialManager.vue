<template>
  <div class="tutorial-container">
    <div class="content" ref="tutorialContainer">
      <Welcome v-if="this.tutorialCount === 0"></Welcome>

      <Step1 v-if="this.tutorialCount === 1"></Step1>
      <Step2 v-if="this.tutorialCount === 2"></Step2>
      <Step3 v-if="this.tutorialCount === 3"></Step3>

      <!-- <Explanation
        v-if="this.tutorialCount === 4"
        v-bind:text="`Click to select the area on the x-ray where there is a lesion.`"
        v-bind:img="`~/assets/Games/Radiologist/Icons/ai.png`"
      ></Explanation> -->
    </div>
    <span
      v-show="this.showUI"
      ref="explanationCounter"
      class="explanation-counter"
      ><span>{{ this.tutorialCount }}</span
      >/3</span
    >
    <span
      v-show="this.showUI"
      ref="skipButton"
      class="skip-button"
      v-on:click="this.skipTutorial"
      >Skip</span
    >
    <button v-on:click="this.fadeOut" ref="nextButton" class="next-button">
      {{ this.buttonContent }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Welcome from "./Welcome.vue";
import Explanation from "./Explanation.vue";
import Step1 from "./1_Step.vue";
import Step2 from "./2_Step.vue";
import Step3 from "./3_Step.vue";

import gsap from "gsap";

export default Vue.extend({
  props: ["tutorialCount", "setTutorialCount", "hideTutorial"],
  data() {
    return {
      buttonContent: "Next",
      showUI: false,
    };
  },
  watch: {
    tutorialCount(newValue) {
      if (newValue === 1) {
        this.showUI = true;

        gsap.to(this.$refs.tutorialContainer, {
          duration: 0.2,
          opacity: 1,
        });

        gsap.to(this.$refs.explanationCounter, {
          duration: 0.2,
          opacity: 1,
        });

        gsap.to(this.$refs.skipButton, {
          duration: 0.2,
          opacity: 0.5,
        });
      }

      if (newValue < 4) this.fadeIn();
    },
  },
  components: {
    Welcome,
    Explanation,
    Step1,
    Step2,
    Step3,
  },
  methods: {
    skipTutorial() {
      gsap.to(this.$refs.explanationCounter, {
        duration: 0.2,
        opacity: 0,
      });

      gsap.to(this.$refs.skipButton, {
        duration: 0.2,
        opacity: 0,
        onComplete: () => {
          this.hideTutorial();
          this.showUI = false;
        },
      });

      gsap.to(this.$refs.tutorialContainer, {
        duration: 0.2,
        opacity: 0,
      });
    },
    updateButton() {
      gsap.to(this.$refs.nextButton, {
        duration: 0.2,
        opacity: 0,
        onComplete: () => {
          this.buttonContent = "Play!";
          gsap.to(this.$refs.nextButton, {
            duration: 0.2,
            opacity: 1,
          });
        },
      });
    },
    fadeIn() {
      gsap.to(this.$refs.tutorialContainer, {
        duration: 0.2,
        opacity: 1,
      });
    },
    fadeOut() {
      if (this.tutorialCount === 0) {
        gsap.to(this.$refs.explanationCounter, {
          duration: 0.2,
          opacity: 1,
        });

        gsap.to(this.$refs.skipButton, {
          duration: 0.2,
          opacity: 0.5,
        });

        this.showUI = true;
      }

      if (this.tutorialCount === 2) {
        this.updateButton();
      }

      if (this.tutorialCount === 3) {
        this.hideTutorial();
        this.showUI = false;
      }

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
  width: 536px;
  height: 260px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // width: 40%;
  // height: 36vh;
  background-color: white;
  padding: 50px;
  border-radius: 23px;
  color: #25213a;

  .skip-button {
    opacity: 0;
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 0.8em;
    // transition: all 0.5s;
    cursor: pointer;

    &:hover {
    }
  }

  .explanation-counter {
    opacity: 0;
    position: absolute;
    top: 10px;
    left: 15px;
    font-size: 0.8em;
    // transition: all 0.5s;
  }

  .next-button {
    width: 104px;
    height: 43px;
    font-size: 1.3em;

    background-color: #e5cff7;
    border: none;
    outline: initial;
    // padding: 5px 25px;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      color: white;
      background-color: #5254dd;
    }
  }
}
</style>