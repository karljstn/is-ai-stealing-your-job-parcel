<template>
  <div class="toolbar-container">
    <div class="cases-to-come">
      <transition-group name="cases">
        <Folder
          v-for="casesInfo in casesPending"
          :key="casesInfo.index"
          :duration="casesInfo.duration"
          :index="casesInfo.index"
          :removeFolder="removeFolder"
        ></Folder>
      </transition-group>
    </div>
    <img src="~/assets/Games/Radiologist/Icons/loop.png" class="loop" alt="" />
    <div class="files-processed">
      <img src="~/assets/Games/Radiologist/Icons/Box/05-box.png" alt="" />
      <div class="wrapper">
        <span class="cases">{{ this.progress }}</span>
        <span class="processed"
          >files <br />
          processed</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Folder from "./Folder.vue";

import store from "~/store";

export default Vue.extend({
  data(): { casesPending: Object[]; index: number } {
    return {
      casesPending: [],

      index: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.addFolder(500);
    }, 1000);

    setTimeout(() => {
      this.addFolder(500);
    }, 3000);
  },
  computed: {
    progress() {
      return store.state.radiologist.progress;
    },
  },
  methods: {
    addFolder(duration: number) {
      this.casesPending.push({
        duration: duration,
        index: this.index++,
      });
    },
    removeFolder(index: number) {
      const i = this.casesPending.findIndex((elem) => elem.index === index);
      this.casesPending.splice(i, 1);
    },
  },
  components: {
    Folder,
  },
});
</script>

<style lang="scss" scoped>
.toolbar-container {
  width: 580px;
  height: 50px;
  // width: 40%;
  // height: 5vh;
  background-color: #dedcdc;
  // background-image: url("~/assets/Games/Radiologist/files-bar.png");
  // background-repeat: no-repeat;
  // background-size: contain;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  position: absolute;
  bottom: 5%;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .loop {
    width: 30px;
    height: 30px;
  }

  .cases-to-come {
    width: 50%;
    height: 100%;

    span {
      display: flex;
    }

    .cases-enter,
    .cases-leave-to {
      opacity: 0;
      transform: translateX(100px);
    }
    .cases-leave-active {
      //set transition duration when leaving
      //position absolute is required i guess
      position: absolute;
      transition: all 0.5s;
    }
  }

  .files-processed {
    width: 40%;
    display: flex;

    img {
      width: 70px;
      -webkit-filter: drop-shadow(1px 1px 1px #000);
      filter: drop-shadow(1px 1px 1px #000);
    }

    .wrapper {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      left: 5px;

      .cases {
        font-size: 2em;
        margin-right: 7.5px;
      }

      .processed {
        line-height: 15px;
        font-weight: lighter;
      }
    }
  }
}
</style>