<template>
  <div class="explanation-container">
    <div class="ai"></div>
    <div class="clipboard"></div>

    <span class="and">&</span>

    <p>
      In trouble? Click on the AI cursor icon to ask the AI for assistance. Read
      each patient file for clues.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.explanation-container {
  .ai,
  .clipboard {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    transform: translate(-50%, -50%);
  }

  .and {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 10%;
    left: 50%;
    font-size: 1.3em;
  }

  .ai {
    width: 100px;
    height: 85px;

    background-image: url("~/assets/Games/Radiologist/Icons/ai.png");

    top: 5%;
    left: 35%;
  }
  .clipboard {
    width: 100px;
    height: 102px;
    background-image: url("~/assets/Games/Radiologist/Icons/clipboard.png");

    top: 0%;
    left: 65%;
  }

  p {
    width: 77%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2em;
    text-align: center;
    line-height: 130%;
  }
}
</style>