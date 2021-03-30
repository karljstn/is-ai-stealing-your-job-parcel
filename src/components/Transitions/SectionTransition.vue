<template>
  <transition mode="out-in" appear @enter="enter" @leave="leave" :css="false">
    <component :is="view" />
  </transition>
</template>

<script lang="ts">
import LandingPage from "~/components/Sections/LandingPage.vue";
import DefinitionOne from "~/components/Sections/Definition/QuestionOne.vue";
import DefinitionTwo from "~/components/Sections/Definition/QuestionTwo.vue";
import DefinitionThree from "~/components/Sections/Definition/QuestionThree.vue";
import FieldOne from "~/components/Sections/Field/QuestionOne.vue";
import FieldTwo from "~/components/Sections/Field/QuestionTwo.vue";
import GameChoice from "~/components/Sections/Game/GameChoice.vue";
import GameQuestion from "~/components/Sections/Game/GameQuestion.vue";
import GameRadiology from "~/components/Sections/Game/GameRadiology.vue";
import EndArticle from "~/components/Sections/End/EndArticle.vue";
import EndChangedYourMind from "~/components/Sections/End/EndChangedYourMind.vue";
import EndRemedy from "~/components/Sections/End/EndRemedy.vue";
import EpilogueHub from "~/components/Sections/Epilogue/EpilogueHub.vue";

import gsap from "gsap";
import store from "~/store";

import Vue from "vue";

export default Vue.extend({
  name: "section-transition",
  computed: {
    view() {
      let component: string;

      switch (store.state.progression) {
        case 0:
          component = "LandingPage";
          break;

        case 1:
          component = "DefinitionOne";
          break;

        case 2:
          component = "DefinitionTwo";
          break;

        case 3:
          component = "DefinitionThree";
          break;

        case 4:
          component = "FieldOne";
          break;

        case 5:
          component = "FieldTwo";
          break;

        case 6:
          component = "GameChoice";
          break;

        case 7:
          component = "GameQuestion";
          break;

        case 8:
          component = "GameRadiology";
          break;

        case 9:
          component = "EndArticle";
          break;

        case 10:
          component = "EndChangedYourMind";
          break;

        case 11:
          component = "EndRemedy";
          break;

        case 12:
          component = "EpilogueHub";
          break;

        default:
          component = "LandingPage";
          break;
      }

      return component;
    },
  },
  components: {
    LandingPage,
    DefinitionOne,
    DefinitionTwo,
    DefinitionThree,
    FieldOne,
    FieldTwo,
    GameChoice,
    GameQuestion,
    GameRadiology,
    EndArticle,
    EndChangedYourMind,
    EndRemedy,
    EpilogueHub,
  },
  methods: {
    enter(el: HTMLElement, done: Function) {
      done();
    },
    leave(el: HTMLElement, done: Function) {
      // console.log("section leave")
      gsap.to(el, {
        duration: 0.3,
        opacity: 0,
        onComplete: () => {
          done();
        },
      });
    },
  },
});
</script>

<style lang="scss">
section {
  opacity: 0;
}
</style>
