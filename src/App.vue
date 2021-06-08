<template>
  <div class="container">
    <Navigation></Navigation>
    <CanvasThree></CanvasThree>
    <MuteButton></MuteButton>
    <ScrollDownArrow></ScrollDownArrow>
    <ScrollController>
      <router-view></router-view>
    </ScrollController>
  </div>
</template>

<script lang="js">
import './styles/_global.scss'

import Vue from "vue"

import router from "~/router"
import store from "~/store"
import CustomEase from "~/lib/CustomEase/esm/CustomEase.js"
import gsap from "gsap"
import NormalizeWheel from 'normalize-wheel';
import {SOUNDS} from "~/constants/SOUNDS.ts"

import CanvasThree from '~/components/Canvas/CanvasThree.vue';
import Navigation from '~/components/UI/Navigation.vue';
import MuteButton from '~/components/UI/MuteButton.vue';
import ScrollDownArrow from "~/components/UI/ScrollDownArrow.vue"
import ScrollController from "~/components/Common/ScrollController.vue"
import AudioController from "~/singletons/AudioController"
import { Howler } from "howler"

gsap.registerPlugin(CustomEase)

const name = "custom"
const ease = "M0,0,C0.126,0.382,0.218,0.566,0.376,0.714,0.46,0.793,0.58,0.894,0.684,0.924,0.818,0.962,0.898,1,1,1"
const testEase = CustomEase.create(
  name,
  ease
)

store.commit("setEase", { name: "test", ease: testEase })

let int;

export default Vue.extend({
    name: "Home",
		components: {
			CanvasThree,
			Navigation,
			MuteButton,
			ScrollDownArrow,
			ScrollController
		},
		mounted() {
			this.$nextTick(() => {
				store.commit('toggleIsVueReady');

				store.state.tweakpane.hidden = true

				setTimeout(() => {
					this.show = true;
				}, store.state.load.pauseBeforeLoaderDuration);

				setTimeout(() => {
					store.commit('toggleIsLoaderReady');
					this.isProgressionReady = true
				}, store.state.load.minLoaderDuration);

				// AudioController.play('backgroundMusic')
        AudioController.manageMusic()
			});
		},
		destroyed() {
			AudioController.stop('backgroundMusic')
      AudioController.stop('minigameMusic')
		}
})
</script>
