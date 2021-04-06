<template>
  <div class="countdown-container">
    <span>3, 2, 1</span>

    <p>Let's goooo</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.countdown-container {
  padding: 10px;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>