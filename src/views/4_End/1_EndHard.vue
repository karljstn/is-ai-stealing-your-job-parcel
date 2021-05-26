<template>
	<section>
		<div class="lottie">
			<lottie-animation :animationData="lottieURL" :loop="false" />
		</div>
	</section>
</template>

<script>
import Vue from 'vue';
import { fadeBackground } from '~util';
import lottie from '~/assets/Lottie/12._HARD_TO_BELIEVE.json';
import LottieAnimation from 'lottie-web-vue';
import store from '~store';

export default Vue.extend({
	components: { LottieAnimation },
	data() {
		return {
			lottieURL: lottie,
		};
	},
	mounted() {
		fadeBackground({ routeName: 'EndOne' });
		store.state.sceneManager.DistraughtEmojiScene.start();
	},
	destroyed() {
		store.state.sceneManager.DistraughtEmojiScene.destroy();
	},
});
</script>

<style lang="scss" scoped>
.lottie {
	width: 500px;
}
</style>
