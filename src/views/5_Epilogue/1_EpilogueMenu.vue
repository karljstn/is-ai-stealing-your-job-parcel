<template>
  <section>
    <h2 ref="title">Now, what do you<br />want to do next ?</h2>
    <nav>
      <router-link to="/12"
        ><svg
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

        <span>Play again</span></router-link
      >
      <router-link to="/ressources"
        ><svg
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

        <span>Learn more</span></router-link
      >
    </nav>
  </section>
</template>

<script>
import Vue from "vue";
import { VIEWS } from "~constants/VIEWS";
import store from "~store";
import { fadeBackground } from "~util";

export default Vue.extend({
  components: {},
  mounted() {
    fadeBackground({ routeName: "Outro" });

    const threeView = store.state.sceneManager.threeViews.get(
      VIEWS.find((VIEW) => VIEW.ROUTE_NAME === "Outro")
    );

    if (threeView) threeView.start(this.$refs.title);
    else console.error(("view is ", threeView));
  },
  destroyed() {
    // Execute code for every single scene
    for (const VIEW of VIEWS) {
      const threeView = store.state.sceneManager.threeViews.get(VIEW);
      for (const object of threeView.objects) {
        threeView.scene.remove(object);
      }
      for (const gltf of threeView.gltfMeshes) {
        if (typeof gltf.out !== "undefined") gltf.out();
        if (typeof gltf.killTimeouts !== "undefined") gltf.killTimeouts();
        setTimeout(() => {
          gltf.destroy();
        }, 500);
      }
    }
  },
});
</script>

<style lang="scss" scoped>
@import "~/styles/_variables.scss";
h2 {
  font-weight: normal;
  font-size: 70px;
}
nav {
  margin-top: 100px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 560px;
  font-weight: 200;

  a {
    display: flex;
    align-items: center;

    span {
      transition: color 0.25s ease-in-out;
    }

    &:hover {
      span {
        color: $orange;
      }
      svg path {
        fill: $orange;
      }
    }

    svg {
      width: 30px;
      margin-right: 15px;
      path {
        fill: $black;
        transition: fill 0.25s ease-in-out;
      }
    }
  }
}
</style>
