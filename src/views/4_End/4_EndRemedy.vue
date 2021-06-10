<template>
  <section>
    <div class="section-1" ref="section1">
      <div class="container">
        <div class="title">
          <FadeTranslateSplitText
            text="In reality, the future is uncertain."
          ></FadeTranslateSplitText>
        </div>
        <h1 class="in-reality">
          In reality, the future is <span>uncertain</span>.
        </h1>
        <p>
          As we have no precedent for something resembling the rise of AI, we
          can't reliably predict what's coming.
        </p>
        <div class="calendar" ref="calendar"></div>
      </div>
    </div>
    <div class="section-2" ref="section2">
      <p class="header-p">
        In fact, even experts on the field of AI have very divergent opinions on
        :
      </p>
      <h2 class="h2-1">
        Whether "strong" AI will have a positive or negative impact on our
        lives,
      </h2>
      <div class="impact-ui">
        <div class="ui1">
          <div class="ball ball1"></div>
          <p class="stats stats1">
            <span class="percentage">20%</span>
            <span class="comment">extremely good</span>
          </p>
        </div>
        <div class="ui2">
          <div class="ball ball2"></div>
          <p class="stats stats2">
            <span class="percentage">25%</span>
            <span class="comment">on balance good</span>
          </p>
        </div>
        <div class="ui3">
          <div class="ball ball3"></div>
          <p class="stats stats3">
            <span class="percentage">20%</span>
            <span class="comment">neutral</span>
          </p>
        </div>
        <div class="ui4">
          <div class="ball ball4"></div>
          <p class="stats stats4">
            <span class="percentage">10%</span>
            <span class="comment">on balance bad</span>
          </p>
        </div>
        <div class="ui5">
          <div class="ball ball5"></div>
          <p class="stats stats5">
            <span class="percentage">5%</span>
            <span class="comment">extremely bad</span>
          </p>
        </div>
      </div>
      <p class="caption">
        Chance High Level Machine Intelligence has positive or negative <br />
        long run impact on humanity
      </p>
      <h3>
        <span class="first-line">
          <span class="stats">50% </span>probability
        </span>
        that a strong AI will appear in 2050
      </h3>
      <div class="rope-container">
        <div class="rope"></div>
      </div>
      <div class="right-container">
        <h2 class="h2-2">
          When should this type of "strong" AI come to be, or if it'll ever
          happen at all
        </h2>
      </div>
      <h2 class="h2-3">In which tasks AI outperfoms humans</h2>
      <div class="right-container bottom-container">
        <p>
          <span class="stats">80% </span>of the people working in Service
          <span class="last-line"
            >field have a low chance of being replaced</span
          >
        </p>
        <div class="balls"></div>
      </div>
      <p class="caption bottom-caption">
        Chance High Level Machine Intelligence has positive or negative <br />
        long run impact on humanity
      </p>
    </div>
    <div class="section-3" ref="section3">
      <div class="container">
        <div class="content">
          <h2>What we do know</h2>
          <p class="p1">
            Today's AI is excellent at very specific tasks, but it falters at
            multitasking, and is definitely not at the level of general problem
            solving that humans can be.
          </p>
        </div>
        <div class="img puzzle" ref="puzzle"></div>
      </div>
      <div class="container container-right">
        <div class="content">
          <h2>We also know</h2>
          <p class="p2">
            That our actions in this field will have far-reaching consequences,
            and the way that we'll use AI will greatly influence our future.
          </p>
        </div>
        <div class="img pendule" ref="pendule"></div>
      </div>
      <div class="container">
        <div class="content">
          <h2>In a perfect world,</h2>
          <p class="p3">
            Wealth created by the AI workforce could be redistributed equitably,
            so that people could live lives free of menial labor.
          </p>
        </div>
        <div class="img hammer" ref="hammer"></div>
      </div>
      <h2 class="end-h2">
        That being said, try bringing this up to Jeff Bezos.
      </h2>
    </div>
    <router-link to="/18" class="arrow"></router-link>
  </section>
</template>

<script lang="ts">
import Button from "~/components/UI/Button.vue";
import QuestionForm from "~/components/UI/QuestionForm.vue";
import MouseController from "~/singletons/MouseController";
import Vue from "vue";
import { fadeBackground } from "~util";
import AudioController from "~/singletons/AudioController";
import { PALETTE } from "~constants/PALETTE";
import { getSound } from "~constants/SOUNDS";
import FadeTranslateSplitText from "~/components/Common/SplitText/FadeTranslateSplitText.vue";
import gsap from "gsap";

const voiceIDs = {
  section1: "inrealitythefutureis",
  section2: "infacteven",
  section3: "whatdoweknow",
  section3bis: "inaperfect",
};

export default Vue.extend({
  data() {
    return {
      observer: null,
      parallax: [],
    };
  },
  components: {
    QuestionForm,
    Button,
    FadeTranslateSplitText,
  },
  methods: {
    //     export const parallaxIt = (e, target, movement) => {
    //     if (target && window.innerWidth > 992) {
    //         let relX = e.pageX - target.offsetLeft
    //         let relY = e.pageY - target.offsetTop

    //         gsap.to(target, 1, {
    //             x: ((relX - window.innerWidth / 2) / window.innerWidth) * movement,
    //             y:
    //                 ((relY - window.innerHeight / 2) / window.innerHeight) *
    //                 movement,
    //         })
    //     }
    // }
    parallaxIt(e: MouseEvent) {
      let sign;
      for (let i = 0; i < this.parallax.length; i++) {
        let relX = e.pageX - this.parallax[i].offsetLeft;
        let relY = e.pageY - this.parallax[i].offsetTop;

        if (i % 2 === 0) {
          sign = 1;
        } else {
          sign = -1;
        }

        gsap.to(this.parallax[i], {
          x: ((sign * relX - window.innerWidth / 2) / window.innerWidth) * 80,
          y: ((sign * relY - window.innerHeight / 2) / window.innerHeight) * 80,
        });
      }
    },
    onElementObserved(entries: IntersectionObserverEntry[]) {
      // console.log(entries);
      entries.forEach(({ target, isIntersecting }) => {
        // do something ...
        if (target.className === "section-1") {
          if (isIntersecting) {
            fadeBackground({ color: PALETTE.WHITE });
            this.speak(voiceIDs.section1);
          }
          // console.log("target 1", isIntersecting);
        }
        if (target.className === "section-2") {
          if (isIntersecting) {
            fadeBackground({ color: PALETTE.YELLOW });
            this.speak(voiceIDs.section2);
          }
          // console.log("target 2", isIntersecting);
        }
        if (target.className === "section-3") {
          if (isIntersecting) {
            fadeBackground({ color: PALETTE.VIOLET });
            this.speak(voiceIDs.section3);
          }
          // console.log("target 3", isIntersecting);
        }
        // console.log(target);
        // console.log(isIntersecting);
      });
    },
    speak(id: string) {
      AudioController.play(id);
      for (const voiceID of Object.values(voiceIDs)) {
        if (voiceID !== id) AudioController.stop(voiceID);
      }
    },
  },
  mounted() {
    console.log(this.$refs.calendar);

    this.parallax = [
      this.$refs.calendar,
      this.$refs.hammer,
      this.$refs.pendule,
      this.$refs.puzzle,
    ];

    this.observer = new IntersectionObserver(this.onElementObserved, {
      threshold: 0.1,
    });

    MouseController.subscribe("parallaxItRemedy", this.parallaxIt);

    this.observer.observe(this.$refs.section1);
    this.observer.observe(this.$refs.section2);
    this.observer.observe(this.$refs.section3);
  },
  destroyed() {
    MouseController.unsubscribe("parallaxItRemedy");
    //TODO: fix this, these don't work, need object or something
    // this.observer.unobserve(this.$refs.section1);
    // this.observer.unobserve(this.$refs.section2);
    // this.observer.unobserve(this.$refs.section3);
    for (const voiceID of Object.values(voiceIDs)) {
      AudioController.stop(voiceID);
    }
  },
});
</script>

<style lang="scss" scoped>
@import "~/styles/_variables.scss";

section {
  padding: 0;
  height: initial;
  width: initial;
  display: initial;
  justify-content: initial;
  align-items: initial;
  flex-direction: initial;

  .title {
    display: flex;
  }

  .arrow {
    margin: auto;
    margin-right: 350px;
    margin-bottom: 100px;
    display: block;
    background-image: url("~/assets/Images/Remedy/arrow.svg");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100px;
    height: 50px;
  }

  .section-1 {
    height: 100vh;

    .container {
      position: absolute;
      left: 45%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);

      width: 1012px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .in-reality {
        margin-bottom: 40px;
        font-size: 4em;
        font-weight: normal;

        span {
          font-style: italic;
          font-size: inherit !important;
        }
      }

      .calendar {
        width: 421px;
        height: 526px;
        background-image: url("~/assets/Images/Remedy/calendar.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;

        position: absolute;
        left: 100%;
        top: 35%;
        transform: translate3d(-50%, -50%, 0);
        z-index: -1;
      }

      p {
        width: 590px;
        font-size: 1.5em;
        margin: auto;
        position: relative;
        right: 65px;
        // font-weight: bold
        color: black;
      }
    }
  }

  .section-2 {
    padding: 100px;
    padding-bottom: 0;
    .header-p {
      margin-bottom: 40px;
    }
    h2 {
      font-size: 3em;

      font-style: normal;
      font-weight: normal;
      line-height: 58px;
      position: relative;
      margin-bottom: 70px;

      &:after {
        color: #f3e5cf;
        font-size: 6em;
        position: absolute;

        z-index: -1;
        transform: rotate(10deg);
      }
    }

    .h2-1 {
      width: 696px;
      &:after {
        content: "1";
        left: 8%;
        bottom: 30%;
      }
    }

    .h2-2 {
      width: 596px;
      position: relative;
      bottom: 180px;
      &:after {
        content: "2";
        right: 25%;
        font-size: 5.2em;
        bottom: 30%;
      }
    }

    .h2-3 {
      width: 470px;
      &:after {
        content: "3";
        font-size: 5.2em;
        left: 15%;
        bottom: 0%;
      }
    }

    h3 {
      color: $white;
      font-size: 1.5em;
      font-weight: normal;
      width: 246px;
      position: relative;
      top: 170px;
      left: 240px;
      .first-line {
        font-size: inherit;
        position: relative;
        color: $white;
        top: 15px;
      }
      .stats {
        color: $white;
        font-size: 2em;
        // position: relative;
        // top: 30px;
      }
    }

    .right-container {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      p {
        color: $white;
        font-size: 1.5em;
        width: 510px;
        position: relative;
        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 105%;
          height: 1px;
          background-color: black;
        }

        .stats {
          color: $white;
          font-size: 2.5em;
        }
        .last-line {
          color: $white;
          font-size: inherit;
          position: relative;
          bottom: 20px;
        }
      }

      .balls {
        width: 382px;
        height: 508px;
        background-image: url("~/assets/Images/Remedy/balls.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }
    }

    .bottom-container {
      position: relative;
      bottom: 100px;
    }

    .rope-container {
      height: 619px;
      z-index: -1;
      pointer-events: none;
      .rope {
        background-image: url("~/assets/Images/Remedy/rope.png");
        background-size: contain;
        background-position: right;
        background-repeat: no-repeat;
        width: 1440px;
        height: 619px;
        position: absolute;
        right: 0;
        // left: 0;
      }
    }

    .impact-ui {
      width: 1070px;
      height: 350px;
      margin: auto;
      margin-bottom: 100px;
      display: flex;
      // justify-content: space-between;
      // align-items: center;

      div[class^="ui"] {
        height: 100%;
        position: relative;
        margin: 0 20px;

        .ball {
          margin: auto;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
          position: relative;

          &:after {
            content: "";
            width: 1px;
            height: 259px;
            background-color: #052f36;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, 0%, 0);
          }
        }

        .ball1 {
          width: 164px;
          height: 164px;
          background-image: url("~/assets/Images/Remedy/ball1.png");

          &:after {
            height: 259px;
          }
        }

        .ball2 {
          width: 214px;
          height: 214px;
          background-image: url("~/assets/Images/Remedy/ball2.png");
          top: 80px;

          &:after {
            height: 234px;
            transform: translate3d(-50%, -100%, 0);
          }
        }
        .ball3 {
          width: 164px;
          height: 164px;
          background-image: url("~/assets/Images/Remedy/ball3.png");
          top: 70px;

          &:after {
            height: 239px;
          }
        }
        .ball4 {
          width: 122px;
          height: 122px;
          background-image: url("~/assets/Images/Remedy/ball4.png");
          top: 140px;

          &:after {
            height: 256px;
            transform: translate3d(-50%, -100%, 0);
          }
        }
        .ball5 {
          width: 72px;
          height: 72px;
          background-image: url("~/assets/Images/Remedy/ball5.png");
          top: 100px;

          &:after {
            height: 187px;
            // transform: translate3d(-50%, -100%, 0);
          }
        }

        .stats {
          display: flex;
          flex-direction: column;
          position: absolute;

          .percentage {
            font-size: 1.5em;
            line-height: 40px;
            color: $white;
          }
          .comment {
            color: $white;
            font-size: 0.75em;
            overflow: hidden;
            white-space: nowrap;
          }
        }

        .stats1 {
          left: 55%;
          bottom: 0%;
        }

        .stats2 {
          left: 55%;
          top: -12%;
        }
        .stats3 {
          left: 55%;
          bottom: -14%;
        }
        .stats4 {
          left: 60%;
          top: -15%;
        }
        .stats5 {
          left: 60%;
          bottom: 5%;
        }
      }
    }
    .caption {
      font-size: 0.75em;
      text-align: right;
      // font-weight: lighter;
    }
    .bottom-caption {
      position: relative;
      bottom: 100px;
    }
  }

  .section-3 {
    margin-bottom: 50px;
    .container {
      width: 1100px;
      display: flex;
      align-items: center;
      margin: 50px auto;

      h2 {
        color: $white;
        font-size: 3.5em;
        font-weight: normal;
        margin-bottom: 20px;
      }

      p {
        color: $white;
        // width: 755px;
        font-size: 1.5em;
      }

      .img {
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }

      .puzzle {
        background-image: url("~/assets/Images/Remedy/puzzle.png");
        width: 738px;
        height: 415px;
      }

      .pendule {
        background-image: url("~/assets/Images/Remedy/pendule.png");
        width: 738px;
        height: 415px;
      }
      .hammer {
        background-image: url("~/assets/Images/Remedy/hand-hammer.png");
        width: 738px;
        height: 415px;
      }
    }

    .p1 {
      width: 755px;
    }
    .p2 {
      width: 613px;
    }
    .p3 {
      width: 600px;
    }

    .end-h2 {
      font-size: 3em;
      width: 650px;
      margin: auto;
      margin-right: 250px;
      font-weight: normal;
      color: $white;
      line-height: 70px;
    }

    .container-right {
      flex-direction: row-reverse;
    }
  }
}
</style>

<style lang="scss">
@import "~/styles/_variables.scss";

.char {
  color: $black;
}
</style>
