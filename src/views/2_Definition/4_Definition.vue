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
import lottieURL from '~/assets/Lottie/7. DEVICES THAT.json';
import LottieAnimation from 'lottie-web-vue';
import store from '~store';

export default Vue.extend({
	data() {
		return {
			lottieURL,
		};
	},
	components: {
		LottieAnimation,
	},
	mounted() {
		store.state.sceneManager.TreeScene.start();
		fadeBackground({ routeName: 'DefinitionFour' });
	},
	destroyed() {
		store.state.sceneManager.TreeScene.destroy();
	},
});
</script>

<style lang="scss" scoped>
.lottie {
	width: 560px;
}
</style>
