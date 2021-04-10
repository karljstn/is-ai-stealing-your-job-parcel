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
    <div class="files-processed">
      <img src="~/assets/Games/Radiologist/files.png" alt="" />
      <div class="wrapper">
        <span class="cases">{{ this.case }}</span>
        <span class="processed">files processed</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Folder from "./Folder.vue";

export default Vue.extend({
  data(): { casesPending: Object[]; case: number; index: number } {
    return {
      casesPending: [],
      case: 0,
      index: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.addFolder(5);
    }, 1000);

    setTimeout(() => {
      this.addFolder(15);
    }, 3000);
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

      console.log(this.casesPending);

      this.casesPending.splice(i, 1);

      // const arr = this.casesPending.splice(this.casesPending.indexOf(), 1);
      // console.log(arr);
    },
  },
  components: {
    Folder,
  },
});
</script>

<style lang="scss" scoped>
.toolbar-container {
  width: 40%;
  height: 100px;
  background-image: url("~/assets/Games/Radiologist/files-bar.png");
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;

  .cases-to-come {
    width: 60%;
    height: 100%;

    span {
      display: flex;
    }

    .cases-enter-active,
    .cases-leave-active {
      transition: all 0.5s;
    }
    .cases-enter, .cases-leave-to /* .cases-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateX(100px);
    }
  }

  .files-processed {
    width: 40%;
    height: 100%;
    position: relative;
    // background-color: aqua;

    &:after {
      content: "";
      width: 1px;
      height: 40%;
      background-color: white;
      position: absolute;
      top: 0;
      bottom: 20px;
      left: -25px;
      margin: auto;
    }

    img {
      width: 70px;
    }

    .wrapper {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: white;
      position: relative;
      bottom: 10px;
      left: 10px;

      .cases {
        font-size: 2em;
        margin-right: 10px;
      }

      .processed {
        width: 30px;
        word-break: normal;
        line-height: 15px;
      }
    }
  }
}
</style>