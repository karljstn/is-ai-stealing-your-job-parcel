<template>
  <div class="side-container">
    <ul class="infos">
      <li v-for="item in this.patient" :key="item">
        {{ item }}
      </li>

      <span class="progress">{{ this.progress }}</span>

    </ul>

    <div class="range">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

    <ul class="infos-2">
      <li>W 82</li>
      <li>L 92</li>
      <br />
      <li>P 98 H 02 L29</li>
      <li>TSE/SE/ME(23)</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import patientsData from "~/assets/patients";
import store from "~/store";
export default Vue.extend({
  data() {
    return {
      patient: patientsData[0],
    };
  },
  mounted() {},
  computed: {
    progress() {
      this.patient = patientsData[store.state.radiologist.progress];
      return store.state.radiologist.progress;
    },
  },
});
</script>


<style lang="scss" scoped>
.side-container {
  position: absolute;
  top: 53%;
  left: 15%;
  transform: translate(-50%, -50%);
  font-size: 0.6em;
  opacity: 0.6;
}

ul {
  color: white;
  list-style: none;
  font-weight: lighter;
}

.progress {
  display: none;
}

.infos {
  margin-bottom: 50px;
}

.infos-2 {
  margin-top: 50px;
}

.range {
  width: 1px;
  height: 260px;
  background-color: white;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 260px;
    li {
      width: 10px;
      height: 1px;
      background-color: white;
    }
  }
}
</style>