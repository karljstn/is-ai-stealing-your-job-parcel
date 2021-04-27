<template>
  <section>
    <Side></Side>
    <ButtonsRight></ButtonsRight>

    <!-- <NotificationManager></NotificationManager> -->

    <Toolbar></Toolbar>

    <Confirm v-if="this.confirm"></Confirm>

    <Timer
      :timerCanStart="this.timerCanStart"
      :timerPause="this.timerPause"
    ></Timer>

    <ToggleTutorial :showTutorial="this.showTutorial"></ToggleTutorial>

    <TutorialManager
      v-if="!this.HIDE"
      v-bind:tutorialCount="tutorialCount"
      v-bind:setTutorialCount="this.setTutorialCount"
      v-bind:hideTutorial="this.hideTutorial"
      ref="tutorialManager"
    ></TutorialManager>

    <Countdown v-if="this.countdown" :hide="this.hideCountdown"></Countdown>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";

import Side from "./Radiologist/Side.vue";
import ButtonsRight from "./Radiologist/ButtonsRight.vue";

import Toolbar from "./Radiologist/Toolbar.vue";
import Confirm from "./Radiologist/Confirm.vue";
import ToggleTutorial from "./Radiologist/Tutorial/ToggleTutorial.vue";
import NotificationManager from "./Radiologist/Notifications/NotificationManager.vue";
import TutorialManager from "./Radiologist/Tutorial/TutorialManager.vue";
import Countdown from "./Radiologist/Tutorial/Countdown.vue";

import Timer from "./Radiologist/Timer.vue";

import gsap from "gsap";
// import PatientFile from "./Radiologist/PatientFile.vue";
// import data from "~/assets/Games/Radiologist/data.json";

export default Vue.extend({
  data(): {
    patientFile: Boolean;
    tutorialCount: number;
    countdown: Boolean;
    timerCanStart: Boolean;
    timerPause: Boolean;
    HIDE: Boolean;
  } {
    return {
      patientFile: false,

      //progress of the tutorial
      tutorialCount: 0,

      //display the 3,2,1,go
      countdown: false,

      //can the timer starts?
      timerCanStart: false,
      timerPause: false,

      HIDE: true,
    };
  },

  computed: {
    confirm() {
      return store.state.radiologist.confirm;
    },
  },

  watch: {
    tutorialCount(newVal) {},
  },

  mounted() {
    document.body.style.overflowX = "hidden";
    // const ease = store.state.eases.get("test");
    // const uniforms =
    //   store.state.scene &&
    //   store.state.scene.Loader &&
    //   store.state.scene.Loader.fullScreenPlane.uniforms;
    // uniforms &&
    //   gsap.to(uniforms.uMixFactor, { value: 0, ease: ease, duration: 0.5 });

    // console.log(uniforms?.uMixFactor);

    // console.log(store.state.scene?.scene);

    // store.state.scene?.renderer.setClearColor(0x231f38, 1);

    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.style.zIndex = "-1";
      canvas.style.pointerEvents = "all";
    }

    if (!store.state.devMode.forceRadiologist) {
      store.state.scene?.startRadiologist();
      // store.state.scene?.Loader?.fullScreenPlane.hide();
    }
  },
  destroyed() {
    // store.state.scene?.renderer.setClearColor(0x000000, 1);
    if (!store.state.devMode.forceRadiologist) {
      store.state.scene?.destroyRadiologist();
    }
    document.body.style.overflowX = "visible";
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.style.zIndex = "1";
      canvas.style.pointerEvents = "none";
    }
  },
  components: {
    NotificationManager,
    Side,
    ToggleTutorial,
    TutorialManager,
    Countdown,
    ButtonsRight,
    Timer,
    Toolbar,
    Confirm,
  },

  methods: {
    setTutorialCount() {
      if (this.tutorialCount === 3) {
        this.hideTutorial();
        return;
      }

      this.tutorialCount++;
    },
    showTutorial() {
      this.timerPause = true;
      this.tutorialCount = 1;
      const manager: any = this.$refs.tutorialManager;
      gsap.to(manager.$el, {
        duration: 0.3,
        scale: 1,
      });
    },
    hideTutorial() {
      const manager: any = this.$refs.tutorialManager;
      gsap.to(manager.$el, {
        duration: 0.3,
        scale: 0,
        onComplete: this.showCountdown,
      });

      this.tutorialCount = -1;
    },
    showCountdown() {
      if (!this.timerCanStart) this.countdown = true;
      else this.timerPause = false;
    },
    hideCountdown() {
      this.countdown = false;
      this.timerCanStart = true;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "~/styles/_variables.scss";

section {
  // width: initial;
  height: initial;
  display: initial;

  .tutorial {
    padding: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: transparent;
    outline: initial;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 2em;
    z-index: 10;
  }
}
</style>
