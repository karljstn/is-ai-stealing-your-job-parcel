<template>
	<section>
		<div class="lottie">
			<lottie-animation :animationData="lottieURL" :loop="false" />
		</div>
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import SaveRect from '~/components/Common/SaveRect.vue';
import Vue from 'vue';
import { fadeBackground } from '~util';
import lottie from '~/assets/Lottie/4. WELL LET ME TELL.json';
import LottieAnimation from 'lottie-web-vue';
import store from '~store';

export default Vue.extend({
	data() {
		return {
			lottieURL: lottie,
		};
	},
	components: {
		SaveRect,
		QuestionForm,
		Button,
		LottieAnimation,
	},
	mounted() {
		store.state.sceneManager.EmojiSmileScene.start();
		fadeBackground({ routeName: 'DefinitionOne' });
	},
	destroyed() {
		store.state.sceneManager.EmojiSmileScene.destroy();
	},
});
</script>

<style lang="scss" scoped>
.lottie {
	width: 600px;
}
</style>
