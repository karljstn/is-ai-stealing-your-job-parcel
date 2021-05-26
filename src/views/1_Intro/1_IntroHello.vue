<template>
	<section>
		<div>
			<SaveRect rectName="IntroHello">
				<lottie-animation :animationData="lottieURL" :loop="false" />
			</SaveRect>
		</div>
	</section>
</template>

<script lang="ts">
import LottieAnimation from 'lottie-web-vue';
import lottie from '~/assets/Lottie/1. HELLO THERE.json';
import Button from '~/components/UI/Button.vue';
import QuestionForm from '~/components/UI/QuestionForm.vue';
import SaveRect from '~/components/Common/SaveRect.vue';
import Autoskip from '~/components/Common/Autoskip.vue';
import Vue from 'vue';
import store from '~store';
import { fadeBackground } from '~util';

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
		Autoskip,
		LottieAnimation,
	},
	methods: {
		previous() {
			// store.state.sceneManager?.HandWaveScene.Hand.out();
			store.commit('toggleHideScrollDownArrow');
		},
		next() {
			// store.state.sceneManager?.HandWaveScene.Hand.out();
			setTimeout(() => {
				this.$router.push('/2');
			}, 1000);
		},
	},
	mounted() {
		fadeBackground({ routeName: 'IntroHello' });
		// store.state.sceneManager?.HandWaveScene.start();
	},
	destroyed() {
		// store.state.sceneManager?.HandWaveScene.destroy();
	},
});
</script>

<style lang="scss" scoped>
div {
	width: 380px;
}
</style>
