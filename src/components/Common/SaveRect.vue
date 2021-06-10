<template>
  <div ref="saveRect">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";
export default Vue.extend({
  props: ["rectName"],
  mounted() {
    const element: HTMLDivElement = this.$refs.saveRect as HTMLDivElement;
    store.commit("setRect", {
      name: this.$props.rectName,
      rect: element.getBoundingClientRect(),
    });

    // if (!module.hot) return;
    // module.hot.dispose(() => {
    // 	store.state.rects.delete(this.$props.rectName);
    // });
  },
});
</script>

<style lang="scss" scoped>
div {
  width: fit-content;
}
</style>
