<template>
	<section>
		<div>
			<SaveRect :rectName="helloRect">
				<lottie-animation ref="anim" :animationData="lottieURL" :loop="false" @complete="onAnimationComplete" />
			</SaveRect>
		</div>
		<!-- <autoskip :time="12000" /> -->
	</section>
</template>

<script lang="ts">
import LottieAnimation from 'lottie-web-vue';
import lottie from '~/assets/Lottie/HELLO_THERE_2.json';
import Button from '~/components/UI/Button.vue';
import QuestionForm from '~/components/UI/QuestionForm.vue';
import SaveRect from '~/components/Common/SaveRect.vue';
import Autoskip from '~/components/Common/Autoskip.vue';
import { RECTS } from '~/constants/RECTS';
import gsap from 'gsap';
import Vue, { Component } from 'vue';
import store from '~store';
import { fadeBackground } from '~util';
import router from '~router';
import { RouteConfig, RouteConfigMultipleViews } from 'vue-router/types/router';
import { PALETTE } from '~constants/PALETTE';

export default Vue.extend({
	name: 'IntroHello',
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
		onAnimationComplete: function() {
			store.state.scene?.HandWaveScene.out();
			fadeBackground({ routeName: 'IntroGuess' });
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
	width: 72vw;
}
</style>
