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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";

export default Vue.extend({
  props: ["timerCanStart", "timerPause"],
  mounted() {
    // this.startCountdown();
    this.convertSeconds();
  },
  data(): {
    countdown: number;
    interval: any;
    min: number | string;
    sec: number | string;
    display: string;
  } {
    return {
      countdown: 45,
      interval: 0,
      min: 0,
      sec: 0,
      display: "",
    };
  },
  watch: {
    timerCanStart(newVal) {
      console.log("newVal", newVal);

      if (newVal) this.startCountdown();
    },
    timerPause(newVal) {
      console.log("newVal", newVal);
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
      // store.state.scene?.radio.endGame();
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
  // justify-content: space-around;
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
}
</style>