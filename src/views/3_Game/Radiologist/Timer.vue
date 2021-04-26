<template>
  <div class="timer-container">
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
      countdown: 5,
      interval: 0,
      min: 0,
      sec: 0,
      display: "",
    };
  },
  watch: {
    timerCanStart(newVal) {
      if (newVal) this.startCountdown();
    },
    timerPause(newVal) {
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
  right: 10px;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("~/assets/Games/Radiologist/timer.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 130px;
  height: 50px;
}
.timer {
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
  position: relative;
  top: 5px;
  font-size: 1.6em;
  color: white;
}
</style>