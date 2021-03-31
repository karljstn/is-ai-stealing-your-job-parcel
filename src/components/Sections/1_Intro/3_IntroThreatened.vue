<template>
	<section>
		<SaveRect :rectName="helloRect">
			<p class="hello">
				you're here because you feel like your job is threatened
			</p>
		</SaveRect>

		<QuestionForm>
			<Button value="yes">Of course!</Button>
			<Button value="no">Not sure...</Button>
		</QuestionForm>
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import SaveRect from '~/components/Common/SaveRect.vue';
import { RECTS } from '~/constants/RECTS';
import Vue from 'vue';

export default Vue.extend({
	data() {
		return {
			helloRect: RECTS.INTRO.HELLO,
			progression: 0,
		};
	},
	components: {
		SaveRect,
		QuestionForm,
		Button,
	},
});
</script>

<style lang="scss" scoped></style>
