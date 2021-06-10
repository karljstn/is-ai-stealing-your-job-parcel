<template>
  <section>
    <div class="ressourcesContainer">
      <h1>Ressources</h1>
      <div class="links-container">
        <Ressource
          v-for="ressource in this.ressources"
          :key="ressource.name"
          :data="ressource"
        ></Ressource>
      </div>
      <button @click="$router.go(-1)">
        <svg
          width="131"
          height="52"
          viewBox="0 0 131 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M129.475 28.4749C130.842 27.108 130.842 24.892 129.475 23.5251L107.201 1.25126C105.834 -0.115572 103.618 -0.115572 102.251 1.25126C100.884 2.6181 100.884 4.83418 102.251 6.20101L122.05 26L102.251 45.799C100.884 47.1658 100.884 49.3819 102.251 50.7487C103.618 52.1156 105.834 52.1156 107.201 50.7487L129.475 28.4749ZM0 29.5H127V22.5H0V29.5Z"
            fill="#EFEFEF"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { fadeBackground } from "~util";
import Ressource from "./Ressource.vue";
import ressourcesData from "~/assets/ressources.js";
import Button from "~components/UI/Button.vue";

export default Vue.extend({
  data() {
    return {
      ressources: ressourcesData,
    };
  },
  mounted() {
    document.body.classList.add("white-nav");

    fadeBackground({ color: "#052F36" });
  },
  components: {
    Ressource,
  },

  destroyed() {
    document.body.classList.remove("white-nav");
  },
});
</script>

<style lang="scss" scoped>
section {
  height: initial;
  padding: initial;
  display: initial;
  color: initial;

  .ressourcesContainer {
    width: 1100px;
    margin: 200px auto;

    h1 {
      color: white;
      font-size: 3.7em;
      font-weight: normal;
      margin-bottom: 50px;
    }

    .links-container {
      display: flex;
      flex-direction: column;
      margin-bottom: 50px;
    }

    button {
      border: none;
      cursor: pointer;

      svg {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
