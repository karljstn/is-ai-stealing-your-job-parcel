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
  right: 9%;
  transform: translate(0%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 20px;

  .ai-button-container {
    background-image: url("~assets/Games/Radiologist/cube-ai.png");
    background-size: contain;
    background-repeat: no-repeat;
    width: 80px;
    cursor: pointer;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .ai-button {
      border: none;
      background-image: url("~assets/Games/Radiologist/ordi.png");
      background-size: contain;
      background-repeat: no-repeat;
      width: 70px;
      height: 70px;
      background-color: transparent;
      margin-bottom: 20px;
      cursor: pointer;
      outline: none;
      transition: all 0.2s;
      // transform: rotateY(180deg) rotateZ(-10deg);

      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .patient-file-container {
    background-image: url("~assets/Games/Radiologist/cube-patient-file.png");
    background-size: contain;
    background-repeat: no-repeat;
    width: 80px;
    cursor: pointer;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .patient-file-button {
      background-image: url("~assets/Games/Radiologist/patient_file.png");
      background-size: contain;
      background-repeat: no-repeat;
      width: 70px;
      height: 70px;
      border: none;
      background-color: transparent;
      outline: none;
      transition: all 0.2s;
      cursor: pointer;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>