<template>
  <div class="panel-container">
    <div class="top">
      <h4>Timer</h4>
      <Timer></Timer>

      <h4 class="notification-header">Notifications</h4>
      <p class="notification">Click on the file icon to discover this case</p>
      <p class="notification">Move your mouse to rotate the scan</p>
    </div>
    <div class="bottom">
      <h4>Processing files</h4>
      <div class="bar-container">
        <div class="progress" ref="progress"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Timer from "./Timer.vue";

export default {
  props: ["case"],
  components: {
    Timer,
  },
  watch: {
    case: function (newVal, oldVal) {
      this.$refs.progress.style.width = 25 * newVal + "%";
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-container {
  color: white;
  position: absolute;
  left: 50px;
  top: 50%;
  transform: translate(0%, -50%);
  width: 250px;

  h4 {
    color: #5331d4;
    font-size: 1.3em;
  }

  .top {
    background-color: #302d4c;
    padding: 20px;
    margin-bottom: 50px;
    border-radius: 20px;
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  }

  .bottom {
    padding: 20px;
    background-color: #302d4c;
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    border-radius: 20px;

    .bar-container {
      width: 100%;
      background-color: #373556;
      height: 10px;
      border-radius: 20px;
      position: relative;
      margin-top: 10px;

      .progress {
        border-radius: 20px;
        width: 0%;
        height: 100%;
        background-color: #f1b732;
        transition: all 0.25s;
      }
    }
  }

  .notification-header {
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .notification {
    font-size: 0.9em;
    padding: 10px;
    background-color: #403e66;
    border-radius: 15px;
    font-weight: 200;
    margin: 10px 0px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>