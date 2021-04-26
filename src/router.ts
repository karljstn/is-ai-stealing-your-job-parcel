import Vue from 'vue'
import VueRouter from 'vue-router'
import { PALETTE } from '~constants/PALETTE'

import LandingPage from '~views/LandingPage.vue'
import IntroOne from '~/views/1_Intro/1_IntroHello.vue';
import IntroTwo from '~/views/1_Intro/2_IntroGuess.vue';
import IntroThree from '~/views/1_Intro/3_IntroThreatened.vue';
import IntroFour from '~/views/1_Intro/4_IntroAI.vue';
import IntroFive from '~/views/1_Intro/5_IntroQuestion.vue';
import DefinitionOne from '~/views/2_Definition/1_Definition.vue';
import DefinitionTwo from '~/views/2_Definition/2_Definition.vue';
import GameOne from '~/views/3_Game/1_GameChoice.vue';
import GameTwo from '~/views/3_Game/2_GameRadiology.vue';
import EndOne from '~/views/4_End/1_EndArticle.vue';
import EndTwo from '~/views/4_End/2_EndChangedYourMind.vue';
import EndThree from '~/views/4_End/3_EndRemedy.vue';
import Epilogue from '~/views/5_Epilogue/1_Epilogue.vue';

Vue.use(VueRouter)

const routes = [
  { path: '/', component: LandingPage, name: "Landing", color: PALETTE.WHITE },
  { path: '/1', component: IntroOne, name: "IntroHello", color: PALETTE.YELLOW },
  { path: '/2', component: IntroTwo, name: "IntroTwo" },
  { path: '/3', component: IntroThree, name: "IntroThree" },
  { path: '/4', component: IntroFour, name: "IntroFour" },
  { path: '/5', component: IntroFive, name: "IntroFive" },
  { path: '/6', component: DefinitionOne, name: "DefinitionOne" },
  { path: '/7', component: DefinitionTwo, name: "DefinitionTwo" },
  { path: '/8', component: GameOne, name: "GameOne" },
  { path: '/9', component: GameTwo, name: "GameTwo" },
  { path: '/10', component: EndOne, name: "EndOne" },
  { path: '/11', component: EndTwo, name: "EndTwo" },
  { path: '/12', component: EndThree, name: "EndThree" },
  { path: '/13', component: Epilogue, name: "Epilogue" },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router