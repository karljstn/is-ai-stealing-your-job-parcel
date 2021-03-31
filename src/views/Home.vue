<template>
	<div>
		<main class="home">
			<transition appear mode="out-in" @enter="enter" @leave="leave" :css="false">
				<component v-if="show" :is="view" />
			</transition>
		</main>
		<CanvasThree />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import gsap from 'gsap';
import store from '~/store';

import CanvasThree from '~/components/Canvas/CanvasThree.vue';

import SectionTransition from '~/components/Transitions/SectionTransition.vue';
import LoaderTransition from '~/components/Transitions/LoaderTransition.vue';
import GameChoice from '~/components/Sections/Game/GameChoice.vue';
import GameRadiology from '~/components/Sections/Game/GameRadiology.vue';
import LandingPagePlaceholder from '~/components/Sections/LandingPage/LandingPage.vue';
import DefinitionOne from '~/components/Sections/Definition/QuestionOne.vue';
import DefinitionTwo from '~/components/Sections/Definition/QuestionTwo.vue';
import DefinitionThree from '~/components/Sections/Definition/QuestionThree.vue';
import FieldOne from '~/components/Sections/Field/QuestionOne.vue';
import FieldTwo from '~/components/Sections/Field/QuestionTwo.vue';

export default Vue.extend({
	name: 'Home',
	data() {
		return {
			show: false,
		};
	},
	computed: {
		view() {
			let component = 'LoaderTransition';

			if (!store.state.devMode.enabled || (store.state.devMode.enabled && store.state.devMode.loader)) {
				if (store.state.load.isVueReady && !store.state.load.isLoaderReady) component = 'LoaderTransition';
				else if (store.state.load.isVueReady && store.state.load.isThreeReady && store.state.load.isLoaderReady)
					component = 'SectionTransition';
			} else {
				component = 'SectionTransition';
			}

			return component;
		},
	},
	methods: {
		enter(el: HTMLElement, done: Function) {
			const ease = store.state.eases.get('test');

			gsap.to(el, {
				duration: 1.0,
				opacity: 1,
				ease: ease,
				onComplete: () => {
					done();
				},
			});
		},
		leave(el: HTMLElement, done: Function) {
			const ease = store.state.eases.get('test');
			const duration = 0.5;

			gsap.to(el, {
				duration: duration,
				opacity: 0,
				ease: ease,
				onComplete: () => {
					done();
				},
			});
		},
	},
	components: {
		CanvasThree,
		LandingPagePlaceholder,
		DefinitionOne,
		DefinitionTwo,
		DefinitionThree,
		GameChoice,
		GameRadiology,
		FieldOne,
		FieldTwo,
		SectionTransition,
		LoaderTransition,
	},
	mounted() {
		// const data = { answers: { jobreplacementbefore: "0" } };

		// patchData(answersURL, data)
		//   .then(data => {
		//     console.log(data) // JSON data parsed by `data.json()` call
		//   })
		//   .catch(error => {
		//     console.error("Error:", error)
		//   })

		// patchData("https://is-ai-stealing.herokuapp.com/items/", data)
		//   .then(data => {
		//     console.log(data) // JSON data parsed by `data.json()` call
		//   })
		//   .catch(error => {
		//     console.error("Error:", error)
		//   })

		// postData("https://is-ai-stealing.herokuapp.com/auth/login", {
		//   email: "ac2031@hotmail.com",
		//   password: "Bitch123@!",
		// })
		//   .then((response) => response)
		//   .then((response) => console.log(response))

		// fetch(answersURL)
		//   .then((response) => response.json())
		//   .then((answers) => console.log(answers.data))

		this.$nextTick(() => {
			store.commit('toggleIsVueReady');

			setTimeout(() => {
				this.show = true;
			}, store.state.load.pauseBeforeLoaderDuration);

			setTimeout(() => {
				store.commit('toggleIsLoaderReady');
			}, store.state.load.minLoaderDuration);
		});
	},
});
</script>

<style lang="scss">
section {
	// position: absolute;
	// pointer-events: none;
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: white;

	p {
		color: white;
	}
}
</style>
