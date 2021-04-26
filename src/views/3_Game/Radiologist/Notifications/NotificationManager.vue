<template>
  <div class="notification-container">
    <transition-group name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.index"
        class="notification"
      >
        <!-- :style="{ top: 100 * notification.index + 'px' }" -->
        Notification
        <span
          class="close-notification"
          v-on:click="removeNotification(notification.index)"
        ></span>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): { notifications: Object[]; index: number } {
    return {
      notifications: [],
      index: 0,
    };
  },
  mounted() {
    this.addNotification(2000, "bonjour");
    setTimeout(() => {
      this.addNotification(2000, "bonsoir");
    }, 1000);
  },
  methods: {
    addNotification(duration: number, text: string) {
      this.notifications.push({
        text,
        index: this.index++,
      });

      setTimeout(() => {
        const index = this.index;
        // this.notifications.shift();
      }, duration);
    },
    removeNotification(index: number) {
      const i = this.notifications.findIndex((elem) => elem.index === index);
      this.notifications.splice(i, 1);
    },
  },
});
</script>

<style lang="scss" scoped>
.notification-container {
  width: 300px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
}

.close-notification {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 10px;
  height: 10px;
  background-color: black;
}

.notification {
  // position: absolute;
  position: relative;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  transition: all 0.5s;
}

.notification-leave-active {
  position: absolute;
  width: 100%;
  transition: all 0.5s;
}
.notification-enter, .notification-leave-to /* .notification-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100px);
}
</style>