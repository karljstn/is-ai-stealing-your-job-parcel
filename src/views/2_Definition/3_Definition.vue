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
import lottieURL from '~/assets/Lottie/6. AI IS.json';
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
		store.state.sceneManager.PenPaperScene.start();
		document.body.classList.add('white-nav');
		fadeBackground({ routeName: 'DefinitionThree' });
	},
	destroyed() {
		store.state.sceneManager.PenPaperScene.destroy();
		document.body.classList.remove('white-nav');
	},
});
</script>

<style lang="scss" scoped>
.lottie {
	width: 560px;
}
</style>
