import Vue from 'vue'
import VueRouter from 'vue-router'
import { PALETTE } from '~constants/PALETTE'

import LandingPage from '~views/LandingPage.vue'
import IntroHello from '~/views/1_Intro/1_IntroHello.vue';
import IntroGuess from '~/views/1_Intro/2_IntroGuess.vue';
import IntroThreatened from '~/views/1_Intro/3_IntroThreatened.vue';
import IntroAI from '~/views/1_Intro/4_IntroAI.vue';
import IntroQuestion from '~/views/1_Intro/5_IntroQuestion.vue';
import DefinitionOne from '~/views/2_Definition/1_Definition.vue';
import DefinitionTwo from '~/views/2_Definition/2_Definition.vue';
import GameOne from '~/views/3_Game/1_GameChoice.vue';
import GameTwo from '~/views/3_Game/2_GameRadiology.vue';
import EndOne from '~/views/4_End/1_EndArticle.vue';
import EndTwo from '~/views/4_End/2_EndChangedYourMind.vue';
import EndThree from '~/views/4_End/3_EndRemedy.vue';
import Outro from '~views/5_Epilogue/1_EpilogueMenu.vue';
import OutroRessources from '~views/5_Epilogue/2_EpilogueRessources.vue';
import OutroShare from '~views/5_Epilogue/3_EpilogueShare.vue';
import OutroTakeAction from '~views/5_Epilogue/4_EpilogueTakeAction.vue';


Vue.use(VueRouter)

const routes = [
  { path: '/', component: LandingPage, name: "Landing", color: PALETTE.WHITE },
  { path: '/1', component: IntroHello, name: "IntroHello", color: PALETTE.YELLOW },
  { path: '/2', component: IntroGuess, name: "IntroGuess", color: PALETTE.LIGHTPINK },
  { path: '/3', component: IntroThreatened, name: "IntroThreatened", color: PALETTE.BLACK },
  { path: '/4', component: IntroAI, name: "IntroAI", color: PALETTE.PINK },
  { path: '/5', component: IntroQuestion, name: "IntroQuestion", color: PALETTE.YELLOW },
  { path: '/6', component: DefinitionOne, name: "DefinitionOne" },
  { path: '/7', component: DefinitionTwo, name: "DefinitionTwo" },
  { path: '/8', component: GameOne, name: "GameOne" },
  { path: '/9', component: GameTwo, name: "GameTwo" },
  { path: '/10', component: EndOne, name: "EndOne" },
  { path: '/11', component: EndTwo, name: "EndTwo" },
  { path: '/12', component: EndThree, name: "EndThree" },
  { path: '/outro', component: Outro, name: "Outro" },
  { path: '/outro/ressources', component: OutroRessources, name: "OutroRessources" },
  { path: '/outro/share', component: OutroShare, name: "OutroShare" },
  { path: '/outro/takeaction', component: OutroTakeAction, name: "OutroTakeAction" },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router