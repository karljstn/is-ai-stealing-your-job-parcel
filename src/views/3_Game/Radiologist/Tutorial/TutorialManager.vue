<template>
  <div class="tutorial-container">
    <div class="content" ref="tutorialContainer">
      <Welcome v-if="this.tutorialCount === 0"></Welcome>

      <Explanation
        v-if="this.tutorialCount === 1"
        v-bind:text="`Each file has to be processed within a 20 second time limit. Failure to do so will incur penalties in your overall timer.`"
        v-bind:img="`~/assets/Games/Radiologist/ordi.png`"
      ></Explanation>

      <Explanation
        v-if="this.tutorialCount === 2"
        v-bind:text="`In trouble? Click on the AI cursor icon to ask the AI for assistance. Read each patient file for clues.`"
        v-bind:img="`~/assets/Games/Radiologist/ordi.png`"
      ></Explanation>

      <Explanation
        v-if="this.tutorialCount === 3"
        v-bind:text="`Drag to rotate. Scroll to zoom. Click to select anomalies.`"
        v-bind:img="`~/assets/Games/Radiologist/ordi.png`"
      ></Explanation>

      <!-- <Explanation
        v-if="this.tutorialCount === 4"
        v-bind:text="`Click to select the area on the x-ray where there is a lesion.`"
        v-bind:img="`~/assets/Games/Radiologist/ordi.png`"
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
    <button v-on:click="this.fadeOut" class="next-button">
      {{ this.buttonContent }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Welcome from "./Welcome.vue";
import Explanation from "./Explanation.vue";
import gsap from "gsap";

export default Vue.extend({
  props: ["tutorialCount", "setTutorialCount", "hideTutorial"],
  data() {
    return {
      buttonContent: "Ok!",
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
          opacity: 1,
        });
      }

      if (newValue < 4) this.fadeIn();
    },
  },
  components: {
    Welcome,
    Explanation,
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
          opacity: 1,
        });

        this.showUI = true;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 36vh;
  background-color: white;
  padding: 50px;
  border-radius: 20px;
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

    &:hover {
    }
  }

  .next-button {
    background-color: #e5cff7;
    border: none;
    outline: initial;
    padding: 5px 25px;
    font-size: 1em;
    position: absolute;
    left: 50%;
    bottom: 2%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    transition: all 0.5s;
    cursor: pointer;

    &:hover {
      color: white;
      background-color: #452ca0;
    }
  }
}
</style>