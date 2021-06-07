<template>
  <div>
    <p class="notification-content">{{ content }}</p>
    <div
      class="bar"
      :style="{ width: (this.progress / this.duration) * 100 + '%' }"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["index", "content", "vduration"],
  data(): {
    interval: any;
    progress: number;
    duration: number;
  } {
    return {
      interval: null,
      progress: 0,
      duration: 0,
    };
  },
  mounted() {
    this.duration = this.vduration / 1000;

    this.interval = setInterval(() => {
      if (this.progress === this.duration) {
        clearInterval(this.interval);
      }

      this.progress++;
    }, 1000);
  },

  destroyed() {
    clearInterval(this.interval);
  },
});
</script>

<style lang="scss" scoped>
.notification-content {
  font-size: 0.5em;
}
.bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #5d34fb;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  transition: width 0.5s;
}
</style>