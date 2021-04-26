<template>
	<section>
		<SaveRect :rectName="helloRect">
			<p class="hello">
				you're here because you feel like your job is threatened
			</p>
		</SaveRect>
		<autoskip :time="3000" />
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

export default Vue.extend({
	data() {
		return {
			helloRect: RECTS.INTRO.THREATHENED,
		};
	},
	components: {
		SaveRect,
		QuestionForm,
		Button,
		Autoskip,
	},
	mounted() {
		fadeBackground({ routeName: 'IntroThreatened' });
		document.body.classList.add('white-nav');
	},
	destroyed() {
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
</style>
