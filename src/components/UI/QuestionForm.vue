<template>
  <form @submit="onSubmit">
    <slot />
    <!-- example : -->
    <!-- <button value="test1">testing1</button> -->
    <!-- <button value="test2">testing2</button> -->
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";

export interface SubmitEvent {
  submitter: HTMLFormElement;
}

export default Vue.extend({
  methods: {
    onSubmit: (e: Event & SubmitEvent) => {
      e.preventDefault();

      if (!e.submitter) return;

      store.commit("incrementProgression");
      console.log(store.state.progression);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
