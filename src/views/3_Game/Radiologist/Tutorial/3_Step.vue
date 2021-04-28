<template>
  <div class="explanation-container">
    <img src="~/assets/Games/Radiologist/Icons/mouse.png" alt="" />
    <p>
      Drag to rotate. <br />
      Scroll to zoom. <br />
      Click to select anomalies.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.explanation-container {
  img {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 160px;
    height: 150px;
  }

  p {
    width: 77%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2em;
    text-align: center;
    line-height: 130%;
  }
}
</style>