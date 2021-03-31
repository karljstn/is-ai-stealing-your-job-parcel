<template>
  <section>
    <Timer />
    <!-- <Toolbar :nextCase="this.nextCase" :updateTool="this.updateTool" />
    
    <PatientFile /> -->
  </section>
</template>

<script>
import Vue from "vue";
import store from "~/store";
import Toolbar from "./Radiologist/Toolbar.vue";
import Timer from "./Timer.vue";
import PatientFile from "./Radiologist/PatientFile.vue";
import QuestionForm from "~/components/UI/QuestionForm.vue";
import Button from "~/components/UI/Button.vue";
import data from "~/assets/Games/Radiologist/data.json";

export default Vue.extend({
  // data() {
  //   return {
  //     data: data.patients,
  //     case: 0,
  //     selectedTool: null,
  //   }
  // },
  mounted() {
    // console.log("start radiologist is called");
    // store.state.scene.startRadiologist();
  },
  destroyed() {
    store.state.scene.destroyRadiologist();
  },
  components: {
    // Toolbar,
    Timer,
    // PatientFile,
    // QuestionForm,
    // Button,
  },

  methods: {
    nextCase() {
      console.log("next case", this.case);
      console.log(this.data[this.case]);
      this.case++;
    },
  },
});
</script>

<style lang="scss" scoped>
section {
  // width: initial;
  height: initial;
  display: initial;
}
</style>
