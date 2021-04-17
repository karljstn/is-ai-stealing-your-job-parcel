<template>
  <div class="patient-file">
    <p>Surname: {{ data.surname }}</p>
    <p>Name: Oui</p>
    <p>
      Case: Came to the ER after puking blood and "something that looked like
      graphite"(?)
    </p>
    <p>
      Medical history : Multiple instances of unidentified objects insterted in
      various parts of the body
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["patientData"],
  data() {
    return {
      data: this.patientData,
    };
  },
  watch: {
    patientData: function (newVal, oldVal) {
      this.data = newVal;
    },
  },
  mounted() {
    // console.log(this.patientData.surname)
  },
});
</script>

<style lang="scss" scoped>
.patient-file {
  position: absolute;
  width: 300px;
  background-color: #7e7e7e;
  padding: 30px;
  border-radius: 10px;

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    background-color: white;
  }
}
</style>