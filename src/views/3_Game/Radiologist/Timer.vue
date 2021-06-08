<template>
  <div class="timer-container">
    <!-- <img
      src="~/assets/Games/Radiologist/Icons/Clock/02-clock.png"
      class="clock"
      alt=""
    /> -->
    <div class="clock"></div>
    <div class="timer">
      <span>{{ this.min }}:{{ this.sec }}</span>
    </div>
    <span class="penalty" ref="penalty">-5</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";
import gsap from "gsap";
import AudioController from "~/singletons/AudioController";

const notifications = [
  `5 seconds penalty on the timer! It wasn't the right diagnosis, be careful!`,
  `Another 5 seconds penalty! Try harder!`,
  `And one more penalty...`,
];

export default Vue.extend({
  props: ["timerCanStart", "timerPause"],

  data(): {
    countdown: number;
    interval: any;
    min: number | string;
    sec: number | string;
    display: string;
    penaltyAnimation: any;
    notification: number;
  } {
    return {
      countdown: 120,
      interval: 0,
      min: 0,
      sec: 0,
      display: "",
      penaltyAnimation: null,
      notification: 0,
    };
  },
  mounted() {
    // this.startCountdown();
    this.convertSeconds();
    this.penaltyAnimation = gsap.to(this.$refs.penalty, {
      duration: 0.5,
      opacity: 1,
      y: 30,
      paused: true,
      onComplete: () => {
        this.penaltyAnimation.reverse();
      },
    });

    store.commit("setPenalty", this.applyPenalty);
  },
  watch: {
    timerCanStart(newVal) {
      store.state.sceneManager?.radio.gameState("timerCanStart", newVal);
      if (newVal) this.startCountdown();
    },
    timerPause(newVal) {
      store.state.sceneManager?.radio.gameState("timerPause", newVal);
      if (newVal) this.stopCountdown();
      else this.startCountdown();
    },
  },
  methods: {
    convertSeconds() {
      const min = Math.floor(this.countdown / 60);
      const sec = this.countdown % 60;

      if (min < 10) this.min = "0" + min;
      else this.min = min;

      if (sec < 10) this.sec = "0" + sec;
      else this.sec = sec;
    },
    applyPenalty() {
      console.log("apply penalty");

      this.countdown -= 4;
      this.penaltyAnimation.play();
      AudioController.play("penalty");
      if (this.notification < notifications.length) {
        store.state.radiologist.addNotification(
          15000,
          notifications[this.notification]
        );
        this.notification++;
      }

      if (this.countdown <= 0) {
        console.log("stop countdown");

        this.stopCountdown();
      } else {
        this.convertSeconds();
      }
    },
    startCountdown() {
      store.state.radiologist.canvasClass("game-active");
      this.convertSeconds();
      this.countdown--;

      this.interval = setInterval(() => {
        this.convertSeconds();
        this.countdown--;

        if (this.countdown === -1) this.stopCountdown();
      }, 1000);
    },
    resetCountdown(newCountdown: number) {
      clearInterval(this.interval);
      this.countdown = newCountdown;
    },
    stopCountdown() {
      if (this.countdown <= 0) {
        this.min = "00";
        this.sec = "00";
        store.state.sceneManager?.radio.endGame();
        AudioController.play("timerend");
      }

      store.state.radiologist.canvasClass("");
      clearInterval(this.interval);
    },
  },
});
</script>
<style lang="scss">
.timer-container {
  position: absolute;
  bottom: 5%;
  right: 10.3%;
  width: 194px;
  height: 72px;
  display: flex;
  align-items: center;
  background-color: #dedcdc;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);

  .clock {
    width: 110px;
    height: 126px;
    background-image: url("~/assets/Games/Radiologist/Icons/Clock/02-clock.png");
    background-size: contain;
    background-repeat: no-repeat;
    -webkit-filter: drop-shadow(1px 1px 1px #000);
    filter: drop-shadow(1px 1px 1px #000);

    position: absolute;
    // right: 35px;
    left: -35px;
    bottom: 0;
  }

  .timer {
    position: absolute;
    right: 15px;
    font-size: 2em;
  }

  .penalty {
    position: absolute;
    right: 12px;
    font-size: 2em;
    color: red;
    opacity: 0;
  }
}
</style>
