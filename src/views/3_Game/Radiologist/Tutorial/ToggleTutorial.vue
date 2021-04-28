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
  bottom: 5%;
  left: 10.3%;
  border-radius: 10px;
  background-color: #dedcdc;
  width: 83px;
  height: 41px;
  border: none;
  outline: initial;
  cursor: pointer;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
}
</style>