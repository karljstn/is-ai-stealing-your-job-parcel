import Vue from "vue";
import VueRouter from "vue-router";
import { PALETTE } from "~constants/PALETTE";

import LandingPage from "~views/LandingPage.vue";
import IntroHello from "~/views/1_Intro/1_IntroHello.vue";
import IntroGuess from "~/views/1_Intro/2_IntroGuess.vue";
import IntroThreatened from "~/views/1_Intro/3_IntroThreatened.vue";
import IntroQuestion from "~views/1_Intro/4_IntroQuestion.vue";
import DefinitionOne from "~views/2_Definition/1_Definition.vue";
import DefinitionTwo from "~views/2_Definition/2_Definition.vue";
import DefinitionThree from "~views/2_Definition/3_Definition.vue";
import DefinitionFour from "~views/2_Definition/4_Definition.vue";
import DefinitionFive from "~views/2_Definition/5_Definition.vue";
import DefinitionSix from "~views/2_Definition/6_Definition.vue";
import DefinitionSeven from "~views/2_Definition/7_Definition.vue";
// import DefinitionEight from "~views/2_Definition/8_Definition.vue";
import GameOne from "~/views/3_Game/1_GameChoice.vue";
import GameTwo from "~/views/3_Game/2_GameRadiology.vue";
import EndOne from "~views/4_End/1_EndHard.vue";
import EndTwo from "~views/4_End/2_EndExample.vue";
import EndThree from "~views/4_End/3_EndArticle.vue";
// import EndFour from "~views/4_End/4_EndChangedYourMind.vue";
import EndFive from "~views/4_End/5_EndRemedy.vue";
import Outro from "~views/5_Epilogue/1_EpilogueMenu.vue";
import OutroRessources from "~views/5_Epilogue/2_EpilogueRessources.vue";
import OutroShare from "~views/5_Epilogue/3_EpilogueShare.vue";
import OutroTakeAction from "~views/5_Epilogue/4_EpilogueTakeAction.vue";
import Credits from "~views/5_Epilogue/5_EpilogueCredits.vue";
import store from "~store";
import { fadeBackground } from "~util";
import { VIEWS } from "~constants/VIEWS";
import { TweenedGLTF } from "~three/Meshes/GLTF";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: LandingPage,
    name: "LandingPage",

    meta: {
      color: PALETTE.WHITE,
      scroll: {
        disabled: false,
      },
      transition: {
        delay: 2700,
        out: () => {
          // Execute code for every single gltf
          for (const VIEW of VIEWS) {
            for (const gltf of store.state.sceneManager.threeViews.get(VIEW)
              .gltfMeshes) {
              const tweened = gltf as TweenedGLTF;

              if (typeof tweened.playAllAnims !== "undefined")
                tweened.playAllAnims();
            }
          }

          store.commit("setHideLanding", true);
          fadeBackground({ routeName: "IntroHello" });
          store.commit("setDarkenScrollDownArrow", false);

          setTimeout(() => {
            store.commit("setDarkenScrollDownArrow", true);
          }, 1700);
        },
      },
    },
  },
  {
    path: "/1",
    component: IntroHello,
    name: "IntroHello",
    meta: {
      color: PALETTE.WHITE,
      scroll: { disabled: false, darkenScrollDownArrow: true },
      transition: {
        delay: 1000,
        out: () => {
          // Execute code for every single gltf
          for (const VIEW of VIEWS) {
            for (const gltf of store.state.sceneManager.threeViews.get(VIEW)
              .gltfMeshes) {
              const tweened = gltf as TweenedGLTF;

              if (typeof tweened.out !== "undefined") tweened.out();
              if (typeof tweened.killTimeouts !== "undefined")
                tweened.killTimeouts();
            }
          }
        },
      },
    },
  },
  {
    path: "/2",
    component: IntroGuess,
    name: "IntroGuess",
    meta: {
      color: PALETTE.LIGHTPINK,
      scroll: { disabled: false, darkenScrollDownArrow: true },
      transition: {
        delay: 800,
        out: () => {
          // Execute code for every single gltf
          for (const VIEW of VIEWS) {
            for (const gltf of store.state.sceneManager.threeViews.get(VIEW)
              .gltfMeshes) {
              const tweened = gltf as TweenedGLTF;

              if (typeof tweened.out !== "undefined") tweened.out();
              if (typeof tweened.killTimeouts !== "undefined")
                tweened.killTimeouts();
            }
          }
        },
      },
    },
  },
  {
    path: "/3",
    component: IntroThreatened,
    name: "IntroThreatened",
    meta: {
      color: PALETTE.VIOLET,
      scroll: { disabled: false, darkenScrollDownArrow: false },
      transition: {
        delay: 1000,
        out: () => {
          // Execute code for every single gltf
          for (const VIEW of VIEWS) {
            for (const gltf of store.state.sceneManager.threeViews.get(VIEW)
              .gltfMeshes) {
              const tweened = gltf as TweenedGLTF;

              if (typeof tweened.out !== "undefined") tweened.out();
              if (typeof tweened.killTimeouts !== "undefined")
                tweened.killTimeouts();
            }
          }
        },
      },
    },
  },
  {
    path: "/4",
    component: IntroQuestion,
    name: "IntroQuestion",
    meta: {
      color: PALETTE.YELLOW,
      scroll: { disabled: true },
      transition: { delay: 0, out: () => {} },
    },
  },
  {
    path: "/5",
    component: DefinitionOne,
    name: "DefinitionOne",
    meta: {
      color: PALETTE.ORANGE,
      scroll: { disabled: false, darkenScrollDownArrow: true },
      transition: {
        delay: 1000,
        out: () => {},
      },
    },
  },
  {
    path: "/6",
    component: DefinitionTwo,
    name: "DefinitionTwo",
    meta: {
      color: PALETTE.PINK,
      scroll: { disabled: true },
      transition: { delay: 1000, out: () => {} },
    },
  },
  {
    path: "/7",
    component: DefinitionThree,
    name: "DefinitionThree",
    meta: {
      color: PALETTE.BLACK,
      scroll: { disabled: false },
      transition: { delay: 1000, out: () => {} },
    },
  },
  {
    path: "/8",
    component: DefinitionFour,
    name: "DefinitionFour",
    meta: {
      color: PALETTE.YELLOW,
      scroll: { disabled: false },
      transition: {
        delay: 1000,
        out: () => {},
      },
    },
  },
  {
    path: "/9",
    component: DefinitionFive,
    name: "DefinitionFive",
    meta: {
      color: PALETTE.ORANGE,
      scroll: { disabled: false },
      transition: { delay: 1000, out: () => {} },
    },
  },
  {
    path: "/10",
    component: DefinitionSix,
    name: "DefinitionSix",
    meta: {
      color: PALETTE.VIOLET,
      scroll: { disabled: false },
      transition: { delay: 1000, out: () => {} },
    },
  },
  {
    path: "/11",
    component: DefinitionSeven,
    name: "DefinitionSeven",
    meta: {
      color: PALETTE.YELLOW,
      scroll: { disabled: false },
      transition: { delay: 1000, out: () => {} },
    },
  },
  // Lottie doesn't work rn
  // {
  //   path: "/12",
  //   component: DefinitionEight,
  //   name: "DefinitionEight",
  //   meta: {
  //     color: PALETTE.LIGHTPINK,
  //     scroll: { disabled: false },
  //     transition: { delay: 1000, out: () => {} },
  //   },
  // },
  {
    path: "/12",
    component: GameOne,
    name: "GameOne",
    meta: {
      color: PALETTE.LIGHTPINK,
      scroll: { disabled: true },
      transition: { delay: 1000, out: () => {} },
    },
  },
  {
    path: "/13",
    component: GameTwo,
    name: "GameTwo",
    meta: {
      scroll: { disabled: true },
      transition: { delay: 1000, out: () => {} },
    },
  },
  {
    path: "/14",
    component: EndOne,
    name: "EndOne",
    meta: {
      color: PALETTE.YELLOW,
      scroll: { disabled: false, darkenScrollDownArrow: true },
      transition: {
        delay: 1000,
        out: () => {
          // store.state.sceneManager.DistraughtEmojiScene.Emoji.out()
        },
      },
    },
  },
  {
    path: "/15",
    component: EndTwo,
    name: "EndTwo",
    meta: {
      color: PALETTE.LIGHTPINK,
      scroll: { disabled: false, darkenScrollDownArrow: true },
      transition: {
        delay: 1000,
        out: () => {
          // store.state.sceneManager.HandOKScene.Hand.out()
        },
      },
    },
  },
  {
    path: "/16",
    component: EndThree,
    name: "EndThree",
    meta: {
      color: PALETTE.ORANGE,
      scroll: { disabled: true },
      transition: { delay: 1000, out: () => {} },
    },
  },
  // {
  //   path: "/17",
  //   component: EndFour,
  //   name: "EndFour",
  //   meta: {
  //     color: PALETTE.WHITE,
  //     scroll: { disabled: true },
  //     transition: { delay: 1000, out: () => {} },
  //   },
  // },
  {
    path: "/17",
    component: EndFive,
    name: "EndFive",
    meta: {
      color: PALETTE.BLACK,
      scroll: { disabled: true },
      transition: { delay: 1000, out: () => {} },
    },
  },
  {
    path: "/outro",
    component: Outro,
    name: "Outro",
    meta: {
      color: PALETTE.LIGHTPINK,
      scroll: { disabled: true },
      transition: { delay: 1000, out: () => {} },
    },
  },
  {
    path: "/outro/ressources",
    component: OutroRessources,
    name: "OutroRessources",
    meta: {
      scroll: { disabled: true },
      transition: { delay: 1000, out: () => {} },
    },
  },
  {
    path: "/outro/share",
    component: OutroShare,
    name: "OutroShare",
    meta: {
      scroll: { disabled: true },
      transition: { delay: 1000, out: () => {} },
    },
  },
  {
    path: "/outro/takeaction",
    component: OutroTakeAction,
    name: "OutroTakeAction",
    meta: {
      scroll: { disabled: true },
      transition: { delay: 1000, out: () => {} },
    },
  },
  {
    path: "/credits",
    component: Credits,
    name: "Credits",
    meta: {
      scroll: { disabled: true },
      transition: { delay: 1000, out: () => {} },
    },
  },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
