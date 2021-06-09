<template>
  <div class="notification-container">
    <transition-group name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.index"
        class="notification"
      >
        <Notification
          :index="notification.index"
          :content="notification.text"
          :vduration="notification.duration"
          :remove="removeNotification"
        ></Notification>
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
import store from "~/store";

export default Vue.extend({
  data(): { notifications: Object[]; index: number } {
    return {
      notifications: [],
      index: 0,
    };
  },
  mounted() {
    store.commit("setAddNotification", this.addNotification);
  },
  components: {
    Notification,
  },
  methods: {
    addNotification(duration: number, text: string) {
      this.notifications.push({
        text,
        duration,
        index: this.index++,
      });
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