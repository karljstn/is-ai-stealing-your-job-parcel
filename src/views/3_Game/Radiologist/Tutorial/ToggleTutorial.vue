<template>
  <button v-on:click="this.showTutorial">help</button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["showTutorial"],
});
</script>

<style lang="scss" scoped>
button {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: transparent;
  font-weight: bolder;
  color: white;
  background-image: url("~/assets/Games/Radiologist/controls.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 83px;
  height: 41px;
  border: none;
  outline: initial;
  cursor: pointer;
}
</style>