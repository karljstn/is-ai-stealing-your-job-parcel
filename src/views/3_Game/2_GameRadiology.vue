<template>
  <section>
    <div
      ref="gameContainer"
      class="game-container"
      :class="this.getClassForContainer"
    >
      <Side></Side>
      <ButtonsRight
        :timerCanStart="this.timerCanStart"
        :timerPause="this.timerPause"
        :progress="this.progress"
      ></ButtonsRight>

      <NotificationManager></NotificationManager>

      <GameCursor :timerPause="this.timerPause"></GameCursor>
      <div class="lottie">
        <lottie-animation
          ref="decompte"
          :animationData="lottieDecompteURL"
          :loop="false"
          :autoPlay="false"
          @complete="this.hideCountdown"
        />
      </div>
      <div class="lottie">
        <lottie-animation
          ref="timesup"
          :animationData="lottieTimesUpURL"
          :loop="false"
          :autoPlay="false"
          @complete="this.timesUpCompleted"
        />
      </div>
      <NextPatientAnimation
        v-if="this.nextPatient"
        :nextPatientCallback="this.animationCompleted"
      ></NextPatientAnimation>

      <Help v-if="this.help" :toggleHelp="this.toggleHelp"></Help>

      <Toolbar
        :progress="this.progress"
        :timerCanStart="this.timerCanStart"
        :help="this.help"
      ></Toolbar>

      <Confirm v-if="this.confirm"></Confirm>

      <!-- <button v-on:click="this.log" class="log">Log</button> -->

      <Timer
        :timerCanStart="this.timerCanStart"
        :timerPause="this.timerPause"
      ></Timer>

      <ToggleTutorial
        :timerCanStart="this.timerCanStart"
        :toggleHelp="this.toggleHelp"
        :help="this.help"
      ></ToggleTutorial>

      <TutorialManager
        v-bind:tutorialCount="tutorialCount"
        v-bind:setTutorialCount="this.setTutorialCount"
        v-bind:hideTutorial="this.hideTutorial"
        ref="tutorialManager"
      ></TutorialManager>
    </div>
    <EndScreen v-if="this.endScreen"></EndScreen>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";

import Side from "./Radiologist/Side.vue";
import ButtonsRight from "./Radiologist/ButtonsRight.vue";

import lottieDecompteURL from "~/assets/Lottie/Radiologist/decompte.json";
import lottieTimesUpURL from "~/assets/Lottie/Radiologist/timesup.json";
import LottieAnimation from "lottie-web-vue";

import Toolbar from "./Radiologist/Toolbar.vue";
import Confirm from "./Radiologist/Confirm.vue";
import ToggleTutorial from "./Radiologist/Tutorial/ToggleTutorial.vue";
import NotificationManager from "./Radiologist/Notifications/NotificationManager.vue";
import TutorialManager from "./Radiologist/Tutorial/TutorialManager.vue";
import NextPatientAnimation from "./NextPatientAnimation.vue";
// import Countdown from "./Radiologist/Tutorial/Countdown.vue";
import Help from "./Radiologist/Tutorial/Help.vue";
import EndScreen from "./Radiologist/EndScreen.vue";
import GameCursor from "./Radiologist/GameCursor.vue";

import Skeleton from "~/three/Games/Radiologist/Skeleton";

import Timer from "./Radiologist/Timer.vue";

import gsap from "gsap";
// import data from "~/assets/Games/Radiologist/data.json";

export default Vue.extend({
  data(): {
    tutorialCount: number;
    help: boolean;
    countdown: boolean;
    timerCanStart: boolean;
    timerPause: boolean;
    endScreen: boolean;
    lottieDecompteURL: string;
    nextPatient: boolean;
    lottieTimesUpURL: string;
  } {
    return {
      //progress of the tutorial
      tutorialCount: 0,

      //help
      help: false,

      //display the 3,2,1,go
      countdown: false,

      //can the timer starts?
      timerCanStart: false,
      timerPause: false,

      endScreen: false,


      lottieDecompteURL: lottieDecompteURL,
      // lottieNextPatientURL: lottieNextPatientURL,
      nextPatient: false,
      lottieTimesUpURL: lottieTimesUpURL,
    };
  },

  computed: {
    confirm() {
      return store.state.radiologist.confirm;
    },
    gameEnded() {
      return store.state.radiologist.gameEnded;
    },
    getClassForContainer() {
      return this.endScreen ? "game-fade" : "";
    },
    progress() {
      return store.state.radiologist.progress;
    },
  },

  watch: {
    tutorialCount(newVal) {},
    progress() {
      // console.log("progress updated", this.progress);
      setTimeout(() => {
        if (this.progress < 5) this.nextPatient = true;
      }, 500);
    },
    gameEnded() {
      if (this.gameEnded) this.$refs.timesup.play();
    },
  },

  mounted() {
      // this.timerCanStart = true;
    
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
      store.state.sceneManager?.startRadiologist();
      // store.state.scene?.Loader?.fullScreenPlane.hide();
    }
  },
  destroyed() {
    // store.state.scene?.renderer.setClearColor(0x000000, 1);
    if (!store.state.devMode.forceRadiologist) {
      store.state.sceneManager?.destroyRadiologist();
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
    // Countdown,
    NextPatientAnimation,
    ButtonsRight,
    Timer,
    Toolbar,
    Confirm,
    Help,
    EndScreen,
    LottieAnimation,
    GameCursor,
  },

  methods: {
    // log() {
    //   store.state.sceneManager.radio.log();
    // },
    setTutorialCount() {
      if (this.tutorialCount === 6) {
        this.hideTutorial();
        return;
      }

      this.tutorialCount++;
    },
    toggleHelp(cond: boolean) {
      // console.log(cond);

      if (this.timerCanStart) {
        this.help = cond;
        if (cond) this.timerPause = true;
        else this.timerPause = false;
      }
    },
    hideTutorial() {
      const manager: any = this.$refs.tutorialManager;
      gsap.to(manager.$el, {
        duration: 0.3,
        scale: 0,
        onComplete: this.$refs.decompte.play,
      });

      // console.log("tutorial complete");
      this.tutorialCount = -1;
    },
    hideCountdown() {
      // console.log(this.$refs.lottieContainer.classList.add('lottie'));

      this.timerCanStart = true;
      store.state.radiologist.addNotification(15000, "You have 30 seconds to process this patient's file. The timer is at the bottom of your screen.")
      Skeleton.addFirstSkeleton();
    },

    animationCompleted() {
      this.nextPatient = false;
      // console.log("go false", this.nextPatient);
    },
    timesUpCompleted() {
      this.endScreen = true;
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

  .lottie {
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) scale(0.8);
    pointer-events: none;
  }
  .log {
    position: absolute;
    bottom: 0;
    z-index: 1000;
  }

  .game-container {
    transition: all 1s;
  }

  .game-fade {
    opacity: 0;
    pointer-events: none;
  }

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
