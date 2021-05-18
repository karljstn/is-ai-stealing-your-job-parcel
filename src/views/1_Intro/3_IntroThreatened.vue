<template>
	<section>
		<!-- <SaveRect :rectName="helloRect">
			<p class="hello">
				you're here because you feel like your job is threatened by Artificial Intelligence
			</p>
		</SaveRect> -->
		<!-- <autoskip :time="3000" /> -->
		<div class="lottie">
			<lottie-animation :animationData="lottieURL" :loop="false" />
		</div>
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import SaveRect from '~/components/Common/SaveRect.vue';
import { RECTS } from '~/constants/RECTS';
import Vue from 'vue';
import Autoskip from '~components/Common/Autoskip.vue';
import { fadeBackground } from '~util';
import lottie from '~/assets/Lottie/3. YOURE HERE BECAUSE.json';
import LottieAnimation from 'lottie-web-vue';
import store from '~store';

export default Vue.extend({
	data() {
		return {
			helloRect: RECTS.INTRO.THREATHENED,
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
	mounted() {
		store.state.scene.HereCryEmojiScene.start();
		fadeBackground({ routeName: 'IntroThreatened' });
		document.body.classList.add('white-nav');
	},
	destroyed() {
		store.state.scene.HereCryEmojiScene.destroy();
		document.body.classList.remove('white-nav');
	},
});
</script>

<style lang="scss" scoped>
p {
	font-size: 4rem;
	text-align: center;
	color: white;
}

.lottie {
	width: 560px;
}
</style>
