<template>
  <div class="button-container">
    <div
      class="ai-button-container"
      v-on:click="this.useAI"
      :class="this.classAIBtn"
    >
      <button
        class="ai-button"
        v-bind:class="{ tutorialOpened: timerPause || !timerCanStart }"
      ></button>
      <div class="btnAbout">AI's assistance</div>
    </div>
    <div class="patient-file-container">
      <button
        class="patient-file-button"
        v-bind:class="{ tutorialOpened: timerPause || !timerCanStart }"
        v-on:click="this.openPatientFile"
      ></button>
      <div class="btnAbout">Patient file</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";

export default Vue.extend({
  props: ["timerCanStart", "timerPause", "progress"],
  data() {
    return {
      patientFile: false,
      usedAI: false,
    };
  },
  methods: {
    useAI() {
      if (this.timerCanStart && !this.timerPause && !this.usedAI) {
        store.state.scene?.radio.useAI();
        this.usedAI = true;
      }
    },

    openPatientFile() {
      if (this.timerCanStart && !this.timerPause) {
        this.patientFile = !this.patientFile;
        store.state.scene?.radio.patientFile(this.patientFile);
      }
    },
  },
  watch: {
    progress(newVal) {
      console.log(newVal);
      this.usedAI = false;
    },
  },
  computed: {
    classAIBtn() {
      return this.usedAI ? "used-ai" : "";
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

  .used-ai {
    filter: grayscale(1);
    cursor: initial;
    .ai-button {
      cursor: initial;
      &:hover {
        transform: scale(1);
      }
    }
  }

  .ai-button-container,
  .patient-file-container {
    width: 73px;
    height: 74px;
    background-size: contain;
    background-repeat: no-repeat;
    // cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: filter 0.5s;

    &:hover {
      .btnAbout {
        opacity: 1;
      }
    }

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

    .tutorialOpened {
      &:hover {
        transform: scale(1);
      }
    }
  }

  .ai-button-container {
    background-image: url("~assets/Games/Radiologist/Icons/square-interface.png");
    margin-bottom: 50px;

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

  .btnAbout {
    position: absolute;
    bottom: -27px;
    width: 94px;
    height: 18px;
    border-radius: 3px;
    font-size: 0.7em;
    background: rgba(253, 243, 233, 0.3);
    color: white;
    text-align: center;
    opacity: 0;
    transition: opacity 0.5s;
  }
}
</style>