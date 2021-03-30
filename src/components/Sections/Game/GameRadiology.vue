<template>
  <section>
    <h1>oui</h1>
    <!-- <Toolbar :nextCase="this.nextCase" :updateTool="this.updateTool" />
    <Timer />
    <PatientFile /> -->
    <!-- <div class="skip">
      <QuestionForm>
        <Button value="yes">Skip</Button>
      </QuestionForm>
    </div> -->
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
  // mounted() {
  //   // store.state.scene.startRadiologist()
  // },
  // components: {
  //   Toolbar,
  //   Timer,
  //   PatientFile,
  //   QuestionForm,
  //   Button,
  // },
  // unmounted() {
  //   store.state.scene.destroyRadiologist()
  // },
  // methods: {
  //   nextCase() {
  //     console.log("next case", this.case)
  //     console.log(this.data[this.case])
  //     this.case++
  //     //update radio
  //     //reset timer
  //     //update case
  //   },
  //   updateTool(tool) {
  //     console.log("update tool", tool)
  //     if (this.selectedTool !== tool) {
  //       //turn on tool
  //       this.selectedTool = tool
  //       switch (tool) {
  //         case "zoom":
  //           store.state.scene.radio.zoomMaterial.uniforms.scale.value = 2
  //           break
  //         default:
  //           break
  //       }
  //     } else {
  //       switch (tool) {
  //         case "zoom":
  //           store.state.scene.radio.zoomMaterial.uniforms.scale.value = 1
  //           break
  //         default:
  //           break
  //       }
  //       //turn off tool
  //       this.selectedTool = null
  //     }
  //   },
  // },
});
</script>

<style lang="scss" scoped>
.skip {
  position: absolute;
  top: 0;
  left: 0;
}

section {
  // width: initial;
  height: initial;
  display: initial;
}
</style>
