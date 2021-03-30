<template>
  <div class="container">
    <div class="bar" />
    <div class="text">L E A R N I N G</div>
    <div class="bar" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .text {
    color: white;
    padding: 0 1rem;
  }
  .bar {
    width: 0.2rem;
    background: white;
    height: 1.1rem;
    margin: 0 0 0.2rem 0;
  }
}
</style>
