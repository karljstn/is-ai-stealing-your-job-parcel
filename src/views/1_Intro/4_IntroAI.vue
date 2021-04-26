<template>
	<section>
		<SaveRect :rectName="helloRect">
			<p class="hello">by <span>Artificial Intelligence</span></p>
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
			helloRect: RECTS.INTRO.AI,
		};
	},
	components: {
		SaveRect,
		QuestionForm,
		Button,
		Autoskip,
	},
	mounted() {
		fadeBackground({ routeName: 'IntroAI' });
	},
});
</script>

<style lang="scss" scoped>
p {
	font-size: 4rem;
	span {
		font-style: italic;
	}
}
</style>
