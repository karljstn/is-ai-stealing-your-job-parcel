<template>
  <div class="panel-container">
    <h4>Notifications</h4>
    <p>Notification sample</p>

    <h4>Timer</h4>
    <Timer></Timer>

    <h4>Processing files</h4>
    {{ this.case }} / 4
  </div>
</template>

<script lang="ts">
import Timer from "./Timer.vue";

export default {
  props: ["case"],
  components: {
    Timer,
  },
};
</script>

<style lang="scss" scoped>
.panel-container {
  color: white;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translate(0%, -50%);
  width: 200px;

  h4 {
    // display: inline-block;
  }

  p {
    font-size: 1em;
  }
}
</style>