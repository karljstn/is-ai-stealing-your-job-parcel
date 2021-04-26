<template>
  <div class="welcome-container">
    <h1>Radiologist game</h1>
    <p>
      You've got one job: Find the lesion in the X-Ray and process as many files
      as possible!

      <br />
      <br />

      Good luck...
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.welcome-container {
  h1 {
    background-color: #452ca0;
    padding: 20px;
    border-radius: 20px;
    position: absolute;
    top: -40px;
    left: -50px;
    transform: rotateZ(-4deg);
    color: white;
    font-size: 2.5em;
  }
  p {
    width: 70%;
    // display: block;
    // margin: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2em;
    text-align: center;
  }
}
</style>