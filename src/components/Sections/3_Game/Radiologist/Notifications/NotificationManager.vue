<template>
  <div class="notification-container">
    <transition-group name="notification">
      <div
        v-for="(notification, index) in notifications"
        :key="notification"
        class="notification"
        :style="{ top: 100 * index + 'px' }"
      >
        a
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Notification from "./Notification.vue";

export default Vue.extend({
  data(): { notifications: Object[]; index: number } {
    return {
      notifications: [],
      index: 0,
    };
  },
  mounted() {
    this.addNotification(2000);
    setTimeout(() => {
      this.addNotification(2000);
    }, 1000);
  },
  watch: {
    notifications() {
      //   deep: true;
      //   console.log("allo");
    },
  },
  components: {
    Notification,
  },
  methods: {
    addNotification(duration: number) {
      this.notifications.push(this.index);
      this.index++;

      setTimeout(() => {
        this.notifications.shift();
      }, 1000);
    },
  },
});
</script>

<style lang="scss" scoped>
.notification-container {
  background-color: red;
  width: 300px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
  //   .notification {
  //     padding: 20px;
  //     background-color: white;
  //     border-radius: 20px;
  //     transform: translate(100px, 0);
  //     opacity: 0;
  //   }
}

.notification {
  position: absolute;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
}
.notification-enter-active,
.notification-leave-active {
  transition: all 1s;
}
.notification-enter, .notification-leave-to /* .notification-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100px);
}
</style>