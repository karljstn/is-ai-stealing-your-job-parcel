<template>
  <button
    class="toggleTutorial"
    v-bind:class="{ tutorialOpened: !timerCanStart }"
    v-on:click="help ? toggleHelp(false) : toggleHelp(true)"
  >
    Help
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["toggleHelp", "help", "timerCanStart"],
});
</script>

<style lang="scss" scoped>
.toggleTutorial {
  position: absolute;
  bottom: 10%;
  left: 11.5%;
  border-radius: 5px;
  background-color: #f6f6f4;
  width: 55px;
  height: 29px;
  border: none;
  outline: initial;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background-color: #b4b4b3;
  }
}

.tutorialOpened {
  // cursor: initial;
  &:hover {
    background-color: #f6f6f4;
  }
}
</style>