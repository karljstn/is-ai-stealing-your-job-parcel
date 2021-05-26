<template>
	<section>
		<SaveRect rectName="DefinitionFive">
			<div class="lottie">
				<lottie-animation :animationData="lottieURL" :loop="false" />
			</div>
		</SaveRect>
	</section>
</template>

<script>
import Vue from 'vue';
import { fadeBackground } from '~util';
import lottieURL from '~/assets/Lottie/8. IVE ALREADY LOST.json';
import LottieAnimation from 'lottie-web-vue';
import SaveRect from '~components/Common/SaveRect.vue';
import store from '~store';

export default Vue.extend({
	data() {
		return {
			lottieURL,
		};
	},
	components: {
		LottieAnimation,
		SaveRect,
	},
	mounted() {
		fadeBackground({ routeName: 'DefinitionFive' });
		store.state.sceneManager.QuestionMarkersScene.start();
	},
	destroyed() {
		store.state.sceneManager.QuestionMarkersScene.destroy();
	},
});
</script>

<style lang="scss" scoped>
.lottie {
	width: 560px;
}
</style>
