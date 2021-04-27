<template>
  <div class="button-container">
    <div class="ai-button-container" v-on:click="this.useAI">
      <button class="ai-button"></button>
    </div>
    <div class="patient-file-container">
      <button
        class="patient-file-button"
        v-on:click="this.openPatientFile"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";

export default Vue.extend({
  data() {
    return {
      patientFile: false,
    };
  },
  methods: {
    useAI() {
      console.log("use AI");

      store.state.scene?.radio.useAI();
    },
    openPatientFile() {
      this.patientFile = !this.patientFile;
      store.state.scene?.radio.patientFile(this.patientFile);
    },
  },
});
</script>

<style lang="scss" scoped>
.button-container {
  position: absolute;
  top: 50%;
  right: 8%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  div {
    width: 73px;
    height: 74px;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      border: none;
      background-size: contain;
      background-repeat: no-repeat;
      width: 80%;
      height: 80%;
      cursor: pointer;
      outline: none;
      transition: all 0.2s;

      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .ai-button-container {
    background-image: url("~assets/Games/Radiologist/Icons/square-interface.png");
    margin-bottom: 30px;

    .ai-button {
      background-image: url("~assets/Games/Radiologist/Icons/ai.png");
      position: relative;
      top: 5px;
    }
  }

  .patient-file-container {
    background-image: url("~assets/Games/Radiologist/Icons/square-interface.png");

    .patient-file-button {
      background-image: url("~assets/Games/Radiologist/Icons/clipboard.png");
      position: relative;
      left: 5px;
    }
  }
}
</style>