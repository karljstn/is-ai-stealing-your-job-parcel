<template>
	<section>
		<div class="lottie">
			<lottie-animation :animationData="lottieURL" :loop="true" />
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
import lottie from '~/assets/Lottie/4. WELL LET ME TELL.json';
import LottieAnimation from 'lottie-web-vue';

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
		fadeBackground({ routeName: 'DefinitionOne' });
	},
});
</script>

<style lang="scss" scoped></style>
