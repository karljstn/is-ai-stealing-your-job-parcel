<template>
	<div class="anim-container">
		<Loader />
	</div>
</template>

<script lang="ts">
import gsap from 'gsap';
import store from '~/store';

import Vue from 'vue';
import Loader from '~/components/UI/Loader.vue';

export default Vue.extend({
	components: {
		Loader,
	},
	mounted() {
		const isLoader = !store.state.devMode.enabled || (store.state.devMode.enabled && store.state.devMode.loader);
		const ease = store.state.eases.get('test');
		const uniforms =
			store.state.sceneManager &&
			store.state.sceneManager.Loader &&
			store.state.sceneManager.Loader.fullScreenPlane.uniforms;
		isLoader && uniforms && gsap.to(uniforms.uMixFactor, { value: 1, ease: ease, duration: 1 });
	},
	destroyed() {
		const isLoader = !store.state.devMode.enabled || (store.state.devMode.enabled && store.state.devMode.loader);
		const ease = store.state.eases.get('test');
		const uniforms =
			store.state.sceneManager &&
			store.state.sceneManager.Loader &&
			store.state.sceneManager.Loader.fullScreenPlane.uniforms;
		const duration = 0.5;
		isLoader && uniforms && gsap.to(uniforms.uMixFactor, { value: 0, ease: ease, duration: duration });
	},
});
</script>
