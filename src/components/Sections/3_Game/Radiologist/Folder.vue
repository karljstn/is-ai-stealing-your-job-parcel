<template >
  <div class="folder">
    <div class="bar-background">
      <div class="bar">
        <div
          class="progress"
          :style="{ width: (this.progress / this.duration) * 100 + '%' }"
        >
          {{ this.index }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["duration", "index", "removeFolder"],
  data(): {
    progress: number;
    interval: any;
    show: Boolean;
  } {
    return {
      progress: 0,
      interval: 0,
      show: false,
    };
  },
  mounted() {
    if (this.progress === this.duration) {
      this.removeFolder(this.index);
      clearInterval(this.interval);
    }
    this.progress++;

    this.interval = setInterval(() => {
      console.log(this.progress + "/" + this.duration, this.index);

      if (this.progress === this.duration) {
        this.removeFolder(this.index);
        clearInterval(this.interval);
      }
      this.progress++;
    }, 1000);
  },
});
</script>

<style lang="scss" scoped>
.folder {
  width: 70px;
  height: 100px;
  background-image: url("~/assets/Games/Radiologist/files.png");
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  margin-right: 30px;
  transition: all 0.5s;

  .bar-background {
    width: 40px;
    height: 15px;
    position: absolute;
    background-color: #4f4f7e;
    border-radius: 20px;
    bottom: 35px;
    right: -10px;

    .bar {
      background-color: #373655;
      width: 70%;
      border-radius: 20px;
      height: 5px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .progress {
        background-color: #e4cef6;
        transition: all 0.5s;
        border-radius: 20px;
        height: 5px;
        width: 0;
        transition: all 0.3s;
      }
    }
  }
}
</style>