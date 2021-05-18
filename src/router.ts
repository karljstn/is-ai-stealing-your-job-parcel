import Vue from 'vue'
import VueRouter from 'vue-router'
import { PALETTE } from '~constants/PALETTE'

import LandingPage from '~views/LandingPage.vue'
import IntroHello from '~/views/1_Intro/1_IntroHello.vue';
import IntroGuess from '~/views/1_Intro/2_IntroGuess.vue';
import IntroThreatened from '~/views/1_Intro/3_IntroThreatened.vue';
import IntroQuestion from '~views/1_Intro/4_IntroQuestion.vue';
import DefinitionOne from '~views/2_Definition/1_Definition.vue';
import DefinitionTwo from '~views/2_Definition/2_Definition.vue';
import DefinitionThree from '~views/2_Definition/3_Definition.vue';
import GameOne from '~/views/3_Game/1_GameChoice.vue';
import GameTwo from '~/views/3_Game/2_GameRadiology.vue';
import EndOne from '~views/4_End/1_EndHard.vue';
import EndTwo from '~views/4_End/2_EndExample.vue';
import EndThree from '~views/4_End/3_EndArticle.vue';
import EndFour from '~views/4_End/4_EndChangedYourMind.vue';
import EndFive from '~views/4_End/5_EndRemedy.vue';
import Outro from '~views/5_Epilogue/1_EpilogueMenu.vue';
import OutroRessources from '~views/5_Epilogue/2_EpilogueRessources.vue';
import OutroShare from '~views/5_Epilogue/3_EpilogueShare.vue';
import OutroTakeAction from '~views/5_Epilogue/4_EpilogueTakeAction.vue';
import Credits from '~views/5_Epilogue/5_EpilogueCredits.vue';
import store from '~store';
import { fadeBackground } from '~util';

Vue.use(VueRouter)

const routes = [
  {
    path: '/', component: LandingPage, name: "LandingPage", color: PALETTE.WHITE, meta: {
      scroll: {
        disabled: false
      },
      transition: {
        delay: 2700,
        out: () => {
          store.state.scene.TrashcanScene.Trashcan.drop();
          store.commit("setHideLanding", true)
          fadeBackground({ routeName: "IntroHello" });
          store.commit('setDarkenScrollDownArrow', false)

          setTimeout(() => {
            store.commit('setDarkenScrollDownArrow', true);
            store.state.scene.TrashcanScene.Trashcan.out()
          }, 1700)
        }
      }
    }
  },
  {
    path: '/1', component: IntroHello, name: "IntroHello", color: PALETTE.WHITE, meta: {
      scroll: { disabled: false, darkenScrollDownArrow: true }, transition: { delay: 1000, out: () => { store.state.scene.HandWaveScene.Hand.out() } }
    }
  },
  {
    path: '/2', component: IntroGuess, name: "IntroGuess", color: PALETTE.LIGHTPINK, meta: {
      scroll: { disabled: false, darkenScrollDownArrow: true }, transition: {
        delay: 800, out: () => {
          store.state.scene.CrystalBallScene.CrystalBall.out()
        }
      }
    }
  },
  {
    path: '/3', component: IntroThreatened, name: "IntroThreatened", color: PALETTE.VIOLET, meta: {
      scroll: { disabled: false, darkenScrollDownArrow: false }, transition: {
        delay: 1100, out: () => {
          store.state.scene.HereCryEmojiScene.Here.out()
          store.state.scene.HereCryEmojiScene.SadEmoji.out()
        }
      }
    }
  },
  {
    path: '/4', component: IntroQuestion, name: "IntroQuestion", color: PALETTE.YELLOW, meta: {
      scroll: { disabled: true }, transition: { delay: 0, out: () => { } }
    }
  },
  {
    path: '/5', component: DefinitionOne, name: "DefinitionOne", color: PALETTE.ORANGE, meta: {
      scroll: { disabled: false, darkenScrollDownArrow: true }, transition: { delay: 0, out: () => { } }
    }
  },
  {
    path: '/6', component: DefinitionTwo, name: "DefinitionTwo", color: PALETTE.WHITE, meta: {
      scroll: { disabled: true }, transition: { delay: 1000, out: () => { } }
    }
  },
  {
    path: '/7', component: DefinitionThree, name: "DefinitionThree", color: PALETTE.WHITE, meta: {
      scroll: { disabled: true }, transition: { delay: 1000, out: () => { } }
    }
  },
  {
    path: '/8', component: GameOne, name: "GameOne", color: PALETTE.LIGHTPINK, meta: {
      scroll: { disabled: true }, transition: { delay: 1000, out: () => { } }
    }
  },
  {
    path: '/9', component: GameTwo, name: "GameTwo", meta: {
      scroll: { disabled: true }, transition: { delay: 1000, out: () => { } }
    }
  },
  {
    path: '/10', component: EndOne, name: "EndOne", color: PALETTE.YELLOW, meta: {
      scroll: { disabled: false, darkenScrollDownArrow: true }, transition: {
        delay: 1000, out: () => {
          store.state.scene.DistraughtEmojiScene.Emoji.out()
        }
      }
    }
  },
  {
    path: '/11', component: EndTwo, name: "EndTwo", color: PALETTE.LIGHTPINK, meta: {
      scroll: { disabled: false, darkenScrollDownArrow: true }, transition: {
        delay: 1000, out: () => {
          store.state.scene.HandOKScene.Hand.out()
        }
      }
    }
  },
  {
    path: '/12', component: EndThree, name: "EndThree", color: PALETTE.ORANGE, meta: {
      scroll: { disabled: true }, transition: { delay: 1000, out: () => { } }
    }
  },
  {
    path: '/13', component: EndFour, name: "EndFour", color: PALETTE.WHITE, meta: {
      scroll: { disabled: true }, transition: { delay: 1000, out: () => { } }
    }
  },
  {
    path: '/14', component: EndFive, name: "EndFive", color: PALETTE.BLACK, meta: {
      scroll: { disabled: true }, transition: { delay: 1000, out: () => { } }
    }
  },
  {
    path: '/outro', component: Outro, name: "Outro", color: PALETTE.LIGHTPINK, meta: {
      scroll: { disabled: true }, transition: { delay: 1000, out: () => { } }
    }
  },
  {
    path: '/outro/ressources', component: OutroRessources, name: "OutroRessources", meta: {
      scroll: { disabled: true }, transition: { delay: 1000, out: () => { } }
    }
  },
  {
    path: '/outro/share', component: OutroShare, name: "OutroShare", meta: {
      scroll: { disabled: true }, transition: { delay: 1000, out: () => { } }
    }
  },
  {
    path: '/outro/takeaction', component: OutroTakeAction, name: "OutroTakeAction", meta: {
      scroll: { disabled: true }, transition: { delay: 1000, out: () => { } }
    }
  },
  {
    path: '/credits', component: Credits, name: "Credits", meta: {
      scroll: { disabled: true }, transition: { delay: 1000, out: () => { } }
    }
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})

export default router