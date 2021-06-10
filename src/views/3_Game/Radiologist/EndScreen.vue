<template>
  <div class="end-screen-container">
    <div class="end-screen-1" ref="endScreen1">
      <p>You processed {{ this.results.processedFiles }} files</p>
      <p>You asked {{ this.results.AIused }} time for AI assistance</p>
      <p>Your diagnosis was right {{ this.results.goodAnswers }} times</p>
      <div class="img folder" ref="folder"></div>
      <div class="img ai-cursor" ref="ai"></div>
    </div>
    <div class="end-screen-2" ref="endScreen2">
      <p>
        Maybe if you had asked the AI for further assistance, you would have
        been more efficient.
      </p>
      <div class="img clock" ref="clock"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gsap from "gsap";
import MouseController from "~/singletons/MouseController";
import store from "~/store";

export default Vue.extend({
  data() {
    return {
      filesText: "",
      aiText: "",
      rightText: "",
      parallax: [],
    };
  },
  mounted() {
    this.parallax = [this.$refs.folder, this.$refs.ai, this.$refs.clock];
    MouseController.subscribe("parallaxItScreen", this.parallaxIt);

    const tl = gsap.timeline({
      onComplete: () => {
        this.$router.push("11");
      },
    });
    tl.to(this.$refs.endScreen1, { duration: 1, opacity: 1 });
    tl.to(this.$refs.endScreen1, { duration: 1, opacity: 0, delay: 3 });
    tl.to(this.$refs.endScreen2, { duration: 1, opacity: 1 });
    tl.to(this.$refs.endScreen2, { duration: 1, opacity: 0, delay: 3 });
  },
  methods: {
    parallaxIt(e: MouseEvent) {
      let sign;
      for (let i = 0; i < this.parallax.length; i++) {
        let relX = e.pageX - this.parallax[i].offsetLeft;
        let relY = e.pageY - this.parallax[i].offsetTop;

        if (i === 0) {
          sign = 1;
        } else {
          sign = -1;
        }

        gsap.to(this.parallax[i], {
          x: ((sign * relX - window.innerWidth / 2) / window.innerWidth) * 30,
          y: ((sign * relY - window.innerHeight / 2) / window.innerHeight) * 30,
        });
      }
    },
  },
  computed: {
    results() {
      // const processedFiles = store.state.radiologist.results.processedFiles
      // const aiUsed = store.state.radiologist.results.AIused
      // const goodAnswers = store.state.radiologist.results.goodAnswers

      //   if(processedFiles > 0){
      //     this.filesText = `You processed ${processedFiles} files`
      //   }else{
      //     this.filesText = `You processed ${processedFiles} file`
      //   }

      //   if(aiUsed > 0){
      //     this.aiText = `You asked ${aiUsed} times for assistance`
      //   }else{
      //     this.aiText = `You asked ${aiUsed} time for assistance`
      //   }

      //   if(goodAnswers === 0){
      //     this.rightText = `Your diagnosis was right ${goodAnswers} times`
      //   }else{
      //     this.rightText = `Your diagnosis was right ${goodAnswers} times`
      //   }
      return store.state.radiologist.results;
    },
  },
});
</script>

<style lang="scss" scoped>
.end-screen-container {
  .end-screen-1,
  .end-screen-2 {
    position: absolute;
    left: 50%;
    top: 54%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    opacity: 0;
  }

  p {
    width: 1000px;
    color: white;
    text-align: center;
    font-size: 3.5em;
  }

  .img {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .ai-cursor {
    background-image: url("~/assets/Games/Radiologist/Icons/ai.png");
    left: 25%;
    top: 75%;
  }

  .folder {
    width: 130px;
    height: 130px;
    background-image: url("~/assets/Games/Radiologist/Icons/File/03-files.png");
    left: 75%;
    top: 39%;
    transform: translate(-50%, -50%) rotate(10deg);
  }

  .clock {
    left: 85%;
    top: 100%;
    width: 120px;
    height: 120px;
    background-image: url("~/assets/Games/Radiologist/Icons/Clock/02-clock.png");
  }
}
</style>
