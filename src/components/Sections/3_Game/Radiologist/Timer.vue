<template>
  <div class="timer">
    <span class="min" ref="min">00</span>
    <span>:</span>
    <span class="sec" ref="sec"
      >{{ this.placeholder }}{{ this.countdown }}</span
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";

export default Vue.extend({
  mounted() {
    this.startCountdown();
  },
  data(): { countdown: number; interval: any; placeholder: string } {
    return {
      countdown: 60,
      interval: 0,
      placeholder: "0",
    };
  },
  methods: {
    startCountdown() {
      if (this.countdown > 10) {
        this.placeholder = "";
      } else {
        this.placeholder = "0";
      }
      this.countdown--;

      this.interval = setInterval(() => {
        if (this.countdown > 10) {
          this.placeholder = "";
        } else {
          this.placeholder = "0";
        }
        this.countdown--;
        if (this.countdown === 0) this.stopCountdown();
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
.timer {
  // position: absolute;
  // bottom: 10px;
  // left: 10px;
  font-size: 1.6em;
  color: white;
}
</style>