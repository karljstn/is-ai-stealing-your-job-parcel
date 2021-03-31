<template>
	<transition mode="out-in" appear @leave="leave" :css="false">
		<component :is="view" />
	</transition>
</template>

<script lang="ts">
import { TRANSITIONS } from '~/constants/TRANSITIONS';
import LandingPage from '~components/Sections/LandingPage.vue';
import IntroOne from '~/components/Sections/1_Intro/1_IntroHello.vue';
import IntroTwo from '~/components/Sections/1_Intro/2_IntroGuess.vue';
import IntroThree from '~/components/Sections/1_Intro/3_IntroThreatened.vue';
import IntroFour from '~/components/Sections/1_Intro/4_IntroAI.vue';
import IntroFive from '~/components/Sections/1_Intro/5_IntroQuestion.vue';
import DefinitionOne from '~/components/Sections/2_Definition/1_Definition.vue';
import DefinitionTwo from '~/components/Sections/2_Definition/2_Definition.vue';
import DefinitionThree from '~/components/Sections/2_Definition/3_Definition.vue';
import GameOne from '~/components/Sections/3_Game/1_GameChoice.vue';
import GameTwo from '~/components/Sections/3_Game/2_GameRadiology.vue';
import EndOne from '~/components/Sections/4_End/1_EndArticle.vue';
import EndTwo from '~/components/Sections/4_End/2_EndChangedYourMind.vue';
import EndThree from '~/components/Sections/4_End/3_EndRemedy.vue';
import Epilogue from '~/components/Sections/5_Epilogue/1_Epilogue.vue';

import gsap from 'gsap';
import store from '~/store';

import Vue from 'vue';

export default Vue.extend({
	name: 'section-transition',
	computed: {
		view() {
			const components = [
				'LandingPage',
				'IntroOne',
				'IntroTwo',
				'IntroThree',
				'IntroFour',
				'IntroFive',
				'DefinitionOne',
				'DefinitionTwo',
				'DefinitionThree',
				'GameOne',
				'GameTwo',
				'EndOne',
				'EndTwo',
				'EndThree',
				'Epilogue',
			];

			return components[store.state.progression];
		},
	},
	components: {
		LandingPage,
		IntroOne,
		IntroTwo,
		IntroThree,
		IntroFour,
		IntroFive,
		DefinitionOne,
		DefinitionTwo,
		DefinitionThree,
		GameOne,
		GameTwo,
		EndOne,
		EndTwo,
		EndThree,
		Epilogue,
	},
	methods: {
		enter(el: HTMLElement, done: Function) {
			done();
		},
		leave(el: HTMLElement, done: Function) {
			// console.log("section leave")
			gsap.to(el, {
				duration: TRANSITIONS.DURATION.LEAVE,
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
