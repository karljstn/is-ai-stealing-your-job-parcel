<template>
  <nav>
    <div class="left">
      <h3>is ai stealing your job.com</h3>
    </div>
    <div class="right">
      <span>menu</span>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
@import "~/styles/_variables.scss";

nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  padding: $menu-padding;
  display: flex;
  justify-content: space-between;
  h3 {
    width: 150px;
    transform: rotate(-15deg);
  }
  h3,
  span {
    font-weight: 200;
  }
}
</style>
