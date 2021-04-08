<template>
	<div>
		<main class="home">
			<transition appear mode="out-in" @enter="enter" @leave="leave" :css="false">
				<component v-if="show" :is="view" />
			</transition>
		</main>
		<Navigation></Navigation>
		<CanvasThree></CanvasThree>
		<MuteButton></MuteButton>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import gsap from 'gsap';
import store from '~/store';

import CanvasThree from '~/components/Canvas/CanvasThree.vue';
import Navigation from '~/components/UI/Navigation.vue';
import MuteButton from '~/components/UI/MuteButton.vue';

import SectionTransition from '~/components/Transitions/SectionTransition.vue';
import LoaderTransition from '~/components/Transitions/LoaderTransition.vue';
import Tweakpane from 'tweakpane';

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

			//TODO: add real loader
			//TODO: add preloading fonts

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
			done();
		},
		leave(el: HTMLElement, done: Function) {
			done();
		},
	},
	components: {
		CanvasThree,
		SectionTransition,
		LoaderTransition,
		Navigation,
		MuteButton,
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
