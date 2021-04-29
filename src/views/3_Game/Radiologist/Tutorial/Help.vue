<template>
  <div class="help-container" ref="helpContainer">
    <h1>Help</h1>
    <Controls ref="controls" v-if="this.component === 'controls'"></Controls>
    <Goal ref="goal" v-if="this.component === 'goal'"></Goal>
    <div class="wrapper">
      <button
        class="controls"
        v-bind:class="{ buttonActive: component === 'controls' }"
        v-on:click="onClick('controls')"
      >
        Controls
      </button>
      <button
        class="goal"
        v-bind:class="{ buttonActive: component === 'goal' }"
        v-on:click="onClick('goal')"
      >
        Goal
      </button>
    </div>
    <button class="close" v-on:click="onClose">Close</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";

import Controls from "./Controls.vue";
import Goal from "./Goal.vue";

import gsap from "gsap";

export default Vue.extend({
  props: ["toggleHelp", "help"],
  data() {
    return {
      component: "controls",
    };
  },
  mounted() {
    gsap.to(this.$refs.helpContainer, {
      duration: 0.25,
      opacity: 1,
    });
  },

  methods: {
    onClick(component: string) {
      this.component = component;
    },
    onClose() {
      gsap.to(this.$refs.helpContainer, {
        duration: 0.25,
        opacity: 0,
        onComplete: () => {
          this.toggleHelp(false);
        },
      });
    },
  },
  components: {
    Controls,
    Goal,
  },
});
</script>

<style lang="scss" scoped>
.help-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 536px;
  height: 449px;
  border-radius: 23px;
  opacity: 0;

  h1 {
    font-size: 2.5em;
    font-weight: bold;
    text-align: center;
    // margin-top: 20px;
    margin: 30px 0;
  }

  .wrapper {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40px;
    margin: auto;
    display: flex;
    justify-content: center;

    button {
      outline: none;
      border: none;
      border-radius: 10px;
      width: 142px;
      height: 43px;
      font-size: 1.2em;
      margin: 0 25px;
      cursor: pointer;
      background-color: #e5cff7;
      transition: all 0.5s;
      &:hover {
        background-color: #bb71f8;
      }
    }

    .buttonActive {
      background-color: #bb71f8;
    }
  }

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    // opacity: 0.5;
    font-weight: lighter;
    cursor: pointer;
    outline: none;
    border: none;
  }
}
</style>