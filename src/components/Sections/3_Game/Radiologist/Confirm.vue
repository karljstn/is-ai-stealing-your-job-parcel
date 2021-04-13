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
import store from "~/store";

export default Vue.extend({
  computed: {
    confirmCallback() {
      return store.state.radiologist.confirmCallback;
    },
  },
  methods: {
    onClick(result: boolean) {
      console.log("on click");
      if (this.confirmCallback) this.confirmCallback(result);
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