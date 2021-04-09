<template>
  <transition name="notification">
    <div class="notification" ref="notification">{{ content }}</div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["content"],
});
</script>

<style lang="scss" scoped>
.notification {
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  //   transform: translate(100px, 0);
  //   opacity: 0;
}

.notification-enter-active {
  transition: all 5s ease;
}

.notification-leave-active {
  transition: all 5s cubic-bezier(1, 0.5, 0.8, 1);
}

.notification-enter {
}

.notification-enter-to {
}

.notification-leave {
}
.notification-leave-to {
}

.notification-enter, .notification-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 1;
}
</style>