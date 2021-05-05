<template>
  <div class="welcome-container">
    <img src="~/assets/Games/Radiologist/Icons/09-title.png" alt="" />
    <p>
      Your job is to detect the anomaly in each patient's 3D scan. You've got a
      lot of patient files, so don't fall behind!
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.welcome-container {
  img {
    width: 381px;
    height: 99px;
    display: block;
    margin: auto;
    position: relative;
    bottom: 100px;
  }

  p {
    width: 77%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.3em;
    text-align: center;
    line-height: 130%;
  }
}
</style>