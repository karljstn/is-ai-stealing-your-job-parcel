<template>
	<section>
		<div>
			<SaveRect :rectName="helloRect">
				<lottie-animation :animationData="lottieURL" :loop="false" />
			</SaveRect>
		</div>
		<!-- <autoskip :time="12000" /> -->
	</section>
</template>

<script lang="ts">
import LottieAnimation from 'lottie-web-vue';
import lottie from '~/assets/Lottie/1. HELLO THERE.json';
import Button from '~/components/UI/Button.vue';
import QuestionForm from '~/components/UI/QuestionForm.vue';
import SaveRect from '~/components/Common/SaveRect.vue';
import Autoskip from '~/components/Common/Autoskip.vue';
import { RECTS } from '~/constants/RECTS';
import Vue from 'vue';
import store from '~store';
import { fadeBackground } from '~util';

export default Vue.extend({
	data() {
		return {
			lottieURL: lottie,
			helloRect: RECTS.INTRO.HELLO,
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
			store.state.scene?.HandWaveScene.Hand.out();
			store.commit('toggleHideScrollDownArrow');
		},
		next() {
			store.state.scene?.HandWaveScene.Hand.out();
			setTimeout(() => {
				this.$router.push('/2');
			}, 1000);
		},
	},
	mounted() {
		fadeBackground({ routeName: 'IntroHello' });
		store.state.scene?.HandWaveScene.start();
	},
	destroyed() {
		store.state.scene?.HandWaveScene.destroy();
	},
});
</script>

<style lang="scss" scoped>
div {
	width: 380px;
}
</style>
