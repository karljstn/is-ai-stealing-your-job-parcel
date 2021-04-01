<template>
  <section>
    <Panel v-bind:case="this.case"></Panel>
    <Side v-bind:case="this.case"></Side>

    <button class="tutorial" v-on:click="tutorial = !tutorial">?</button>
    <Tutorial v-if="tutorial" v-bind:setTutorial="this.setTutorial"></Tutorial>

    <button class="patient-file-button" v-on:click="this.openPatientFile">
      Patient file
    </button>
    <button class="ai-button">AI</button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";

import Tutorial from "./Radiologist/Tutorial.vue";
import Side from "./Radiologist/Side.vue";
import Panel from "./Radiologist/Panel.vue";
import PatientFile from "./Radiologist/PatientFile.vue";
import data from "~/assets/Games/Radiologist/data.json";

export default Vue.extend({
  data(): { tutorial: Boolean; patientFile: Boolean } {
    return {
      tutorial: false,
      patientFile: false,
    };
  },
  computed: {
    case() {
      return store.state.count;
    },
  },
  mounted() {
    // console.log(store.state.radio);
    // store.commit('setRect', { name: this.$props.rectName, rect: element.getBoundingClientRect() });
    // this.nextCase();
    // store.state.scene.startRadiologist();
    // store.state.scene.Loader.fullScreenPlane.hide();
  },
  destroyed() {
    // store.state.scene.destroyRadiologist();
    // store.state.scene.Loader.fullScreenPlane.show();
  },
  components: {
    Panel,
    Side,
    Tutorial,
  },

  methods: {
    setTutorial(cond: Boolean) {
      this.tutorial = cond;
    },
    openPatientFile() {
      console.log("alloa");

      this.patientFile = !this.patientFile;
      store.state.scene?.radio.patientFile(this.patientFile);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "~/styles/_variables.scss";

section {
  // width: initial;
  height: initial;
  display: initial;

  .patient-file-button {
    padding: 10px 20px;
    width: 115px;
    background-color: white;
    position: absolute;
    bottom: 10px;
    right: 180px;

    &:after {
      content: "";
      background-image: url("~assets/Games/Radiologist/patient_file.png");
      background-size: contain;
      background-repeat: no-repeat;
      width: 70px;
      height: 70px;
      position: absolute;
      left: -40px;
      top: -20px;
    }
  }

  .ai-button {
    padding: 10px 20px;
    background-color: white;
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 115px;

    &:after {
      content: "";
      background-image: url("~assets/Games/Radiologist/ordi.png");
      background-size: contain;
      background-repeat: no-repeat;
      width: 70px;
      height: 70px;
      position: absolute;
      left: -40px;
      top: -20px;
    }
  }

  .tutorial {
    padding: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: transparent;
    outline: initial;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 2em;
  }
}
</style>
