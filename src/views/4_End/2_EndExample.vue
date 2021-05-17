<template>
	<section>
		<lottie-animation :animationData="lottieURL" :loop="false" />
	</section>
</template>

<script>
import Vue from 'vue';
import { fadeBackground } from '~util';
import LottieAnimation from 'lottie-web-vue';
import lottie from '~/assets/Lottie/13. THIS IS A SIMPLE.json';
import store from '~store';

export default Vue.extend({
	components: { LottieAnimation },
	data() {
		return {
			lottieURL: lottie,
		};
	},
	mounted() {
		store.state.scene.HandOKScene.start();
		fadeBackground({ routeName: 'EndTwo' });
	},
	destroyed() {
		store.state.scene.HandOKScene.destroy();
	},
});
</script>

<style lang="scss" scoped></style>
