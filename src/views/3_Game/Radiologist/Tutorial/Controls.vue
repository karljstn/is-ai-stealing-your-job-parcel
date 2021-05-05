<template>
  <div class="controls-container">
    <div class="img-text-wrapper">
      <div class="icon-select"></div>
      <p>Left click to select</p>
    </div>
    <div class="img-text-wrapper">
      <div class="icon-rotate"></div>
      <p>Hold left click and drag to rotate</p>
    </div>
    <div class="img-text-wrapper">
      <div class="icon-zoom"></div>
      <p>Scroll to zoom</p>
    </div>
    <div class="img-text-wrapper">
      <div class="icon-move"></div>
      <p>Hold right click and drag to move</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";

export default Vue.extend({
  props: ["isActive"],
});
</script>

<style lang="scss" scoped>
.controls-container {
  //   position: absolute;
  //   left: 50%;
  //   top: 50%;
  //   transform: translate(-50%, -50%);
  .img-text-wrapper {
    display: flex;
    align-items: center;
    width: 75%;

    // margin: auto;
    margin: 25px auto;

    div {
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      background-size: contain;
      margin-right: 40px;
    }

    .icon-select {
      background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/select.svg");
    }
    .icon-rotate {
      background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/rotate.svg");
    }
    .icon-zoom {
      background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/zoom.svg");
    }
    .icon-move {
      background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/move.svg");
    }

    p {
      font-size: 1.2em;
    }
  }
}
</style>