<template>
  <section>
    <!-- <Panel v-bind:case="this.case"></Panel>
    <Side v-bind:case="this.case"></Side>

    <button class="tutorial" v-on:click="tutorial = !tutorial">?</button>
    <ControlsTutorial
      v-if="tutorial"
      v-bind:setTutorial="this.setTutorial"
    ></ControlsTutorial>

    <div class="button-container">
      <button class="ai-button" v-on:click="this.useAI"></button>
      <button
        class="patient-file-button"
        v-on:click="this.openPatientFile"
      ></button>
    </div> -->

    <TutorialManager
      v-bind:tutorialCount="tutorialCount"
      v-bind:setTutorialCount="this.setTutorialCount"
      ref="tutorialManager"
    ></TutorialManager>

    <Countdown v-if="this.tutorialCount >= 2"></Countdown>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import store from "~/store";

import ControlsTutorial from "./Radiologist/Tutorial/ControlsTutorial.vue";
import Side from "./Radiologist/Side.vue";
import Panel from "./Radiologist/Panel.vue";
import TutorialManager from "./Radiologist/Tutorial/TutorialManager.vue";
import Countdown from "./Radiologist/Tutorial/Countdown.vue";

import gsap from "gsap";
// import PatientFile from "./Radiologist/PatientFile.vue";
// import data from "~/assets/Games/Radiologist/data.json";

export default Vue.extend({
  data(): { tutorial: Boolean; patientFile: Boolean; tutorialCount: number } {
    return {
      tutorial: false,
      patientFile: false,
      tutorialCount: 0,
    };
  },

  computed: {
    case() {
      return store.state.count;
    },
  },

  watch: {
    tutorialCount(newVal) {
      console.log("here");
    },
  },

  mounted() {
    // const ease = store.state.eases.get("test");
    // const uniforms =
    //   store.state.scene &&
    //   store.state.scene.Loader &&
    //   store.state.scene.Loader.fullScreenPlane.uniforms;
    // uniforms &&
    //   gsap.to(uniforms.uMixFactor, { value: 0, ease: ease, duration: 0.5 });

    // console.log(uniforms?.uMixFactor);

    // console.log(store.state.scene?.scene);

    store.state.scene?.renderer.setClearColor(0x231f38, 1);

    if (!store.state.devMode.forceRadiologist) {
      store.state.scene?.startRadiologist();
      store.state.scene?.Loader?.fullScreenPlane.hide();
    }
  },
  destroyed() {
    store.state.scene?.renderer.setClearColor(0x000000, 1);
    if (!store.state.devMode.forceRadiologist) {
      store.state.scene?.destroyRadiologist();
      store.state.scene?.Loader?.fullScreenPlane.show();
    }
  },
  components: {
    Panel,
    Side,
    ControlsTutorial,
    TutorialManager,
    Countdown,
  },

  methods: {
    setTutorial(cond: Boolean) {
      this.tutorial = cond;
    },
    useAI() {
      store.state.scene?.radio.useAI();
    },
    openPatientFile() {
      this.patientFile = !this.patientFile;
      store.state.scene?.radio.patientFile(this.patientFile);
    },
    setTutorialCount() {
      console.log("set tutorial count", this.tutorialCount);

      if (this.tutorialCount === 1) {
        console.log("tutorialCount", this.tutorialCount);

        console.log(this.$refs.tutorialManager.$el);

        gsap.to(this.$refs.tutorialManager?.$el, {
          duration: 1,
          scale: 0,
        });
      }

      this.tutorialCount++;
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

  .button-container {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #302d4c;
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    padding: 20px;
    border-radius: 20px;

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

    .ai-button {
      border: none;
      background-image: url("~assets/Games/Radiologist/ordi.png");
      background-size: contain;
      background-repeat: no-repeat;
      width: 70px;
      height: 70px;
      background-color: transparent;
      margin-bottom: 20px;
      outline: none;
      transition: all 0.2s;
      cursor: pointer;

      &:hover {
        transform: scale(1.2);
      }
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
    z-index: 10;
  }
}
</style>
