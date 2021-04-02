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
  font-size: $text-size * 0.8;
  padding: 1rem;
  cursor: pointer;
  background: $white;
  border: none;
}
</style>
