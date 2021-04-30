<template>
  <div class="notification-container">
    <transition-group name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.index"
        class="notification"
      >
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
import Notification from "./Notification.vue";

export default Vue.extend({
  data(): { notifications: Object[]; index: number } {
    return {
      notifications: [],
      index: 0,
    };
  },
  mounted() {
    this.addNotification(60000, "bonjour");
    setTimeout(() => {
      this.addNotification(60000, "bonsoir");
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
        this.notifications.shift();
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
  right: 11%;
  top: 18%;
  z-index: 1000;
}

.close-notification {
  position: absolute;
  top: 5px;
  right: -15px;
  width: 12px;
  height: 11px;
  background-color: #5d34fb;
  cursor: pointer;

  &:after,
  &:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 1px;
    background-color: white;
    transform-origin: center;
  }

  &:after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

.notification {
  // position: absolute;
  position: relative;
  padding: 10px;
  font-size: 0.9em;
  margin-bottom: 20px;
  background-color: #f7edff;
  border-radius: 5px;
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