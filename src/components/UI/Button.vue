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
button {
  margin: 0 1rem;
  padding: 1rem;
  cursor: pointer;
}
</style>
