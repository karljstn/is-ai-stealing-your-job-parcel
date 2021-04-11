<template>
  <div class="confirm">
    <p>Are you sure?</p>
    <div class="wrapper">
      <button v-on:click="onClick(true)">Yes</button>
      <button v-on:click="onClick(false)">No</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    onClick(result: boolean) {
      console.log(result);
    },
  },
});
</script>

<style lang="scss" scoped>
.confirm {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 20%;
  background-color: white;
}
</style>