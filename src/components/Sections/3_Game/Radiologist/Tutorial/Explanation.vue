<template>
  <div class="explanation-container">
    <img src="~/assets/Games/Radiologist/ordi.png" alt="" />
    <p>
      {{ this.text }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["img", "text"],
  data() {
    return {
      src: this.img,
    };
  },
});
</script>

<style lang="scss" scoped>
.explanation-container {
  h1 {
    background-color: #452ca0;
    padding: 20px;
    border-radius: 20px;
    position: absolute;
    top: -40px;
    left: -50px;
    transform: rotateZ(-4deg);
    color: white;
    font-size: 2.5em;
  }

  img {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  p {
    width: 70%;
    // display: block;
    // margin: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2em;
    text-align: center;
  }
}
</style>