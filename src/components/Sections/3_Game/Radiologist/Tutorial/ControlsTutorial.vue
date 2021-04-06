<template>
  <div class="tutorial-container">
    <h3>Instructions</h3>
    <p>blablablablablablablablablablablabla</p>
    <span v-on:click="setTutorial(false)">x</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "Tutorial",
  props: ["setTutorial"],
};
</script>

<style lang="scss" scoped>
.tutorial-container {
  width: initial;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: blue;
  padding: 100px;

  span {
    position: absolute;
    top: 0;
    right: 10px;
    padding: 5px;
    cursor: pointer;
  }

  p {
    font-size: initial;
  }
}
</style>