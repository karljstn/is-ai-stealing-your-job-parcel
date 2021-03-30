<template>
  <header>
    <Logo />
  </header>
</template>

<script lang="ts">
import Logo from "./Logo.vue";
import Vue from "vue";

export default Vue.extend({
  components: {
    Logo,
  },
});
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  color: white;
}
</style>