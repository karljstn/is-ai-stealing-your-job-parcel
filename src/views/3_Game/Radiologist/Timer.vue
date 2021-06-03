<template>
  <div class="timer-container">
    <img
      src="~/assets/Games/Radiologist/Icons/Clock/02-clock.png"
      class="clock"
      alt=""
    />
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

export default Vue.extend({
  props: ["timerCanStart", "timerPause"],

  data(): {
    countdown: number;
    interval: any;
    min: number | string;
    sec: number | string;
    display: string;
    penaltyAnimation: any;
  } {
    return {
      countdown: 60,
      interval: 0,
      min: 0,
      sec: 0,
      display: "",
      penaltyAnimation: null,
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
      this.countdown -= 4;
      this.penaltyAnimation.play();
      if (this.countdown <= 0) {
        console.log("stop countdown");

        this.stopCountdown();
      } else {
        this.convertSeconds();
      }
    },
    startCountdown() {
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
      console.log(this.countdown);
      if (this.countdown <= 0) {
        this.min = "00";
        this.sec = "00";
        store.state.sceneManager?.radio.endGame();
      }
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
    width: 117px;
    height: 126px;
    -webkit-filter: drop-shadow(1px 1px 1px #000);
    filter: drop-shadow(1px 1px 1px #000);

    position: relative;
    right: 35px;
    bottom: 35%;
  }

  .timer {
    position: relative;
    right: 20px;
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
