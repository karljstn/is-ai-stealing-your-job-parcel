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
      {{ this.case }} / 4
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
  }

  .top {
    background-color: #302d4c;
    padding: 20px;
    margin-bottom: 50px;
    border-radius: 20px;
  }

  .bottom {
    padding: 20px;
    background-color: #302d4c;
  }

  .notification-header {
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .notification {
    font-size: 1em;
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