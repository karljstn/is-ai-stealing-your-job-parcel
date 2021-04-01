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
import Navigation from '~/components/UI/Navigation.vue';

import SectionTransition from '~/components/Transitions/SectionTransition.vue';
import LoaderTransition from '~/components/Transitions/LoaderTransition.vue';

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
		SectionTransition,
		LoaderTransition,
		Navigation,
	},
	mounted() {
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

<style lang="scss"></style>
