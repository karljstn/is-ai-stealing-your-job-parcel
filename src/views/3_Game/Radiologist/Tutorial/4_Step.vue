<template>
  <div class="explanation-container">
    <img
      src="~/assets/Games/Radiologist/Icons/Tutorial/01-mouse-left.png"
      alt=""
    />
    <p>Hold left click and drag to rotate.</p>
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
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-15deg);
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