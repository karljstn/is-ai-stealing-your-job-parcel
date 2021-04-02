<template>
  <button :value="value"><slot /></button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["value"],
});
</script>

<style lang="scss" scoped>
@import "~/styles/_variables.scss";

button {
  font-size: $text-size * 2.5;
  padding: 1rem;
  cursor: pointer;
  background: none;
  border: none;
}
</style>
