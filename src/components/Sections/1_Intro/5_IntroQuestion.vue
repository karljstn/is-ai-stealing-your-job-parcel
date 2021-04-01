<template>
	<section>
		<div class="container">
			<SaveRect :rectName="helloRect">
				<p class="hello">
					Am I right ?
				</p>
			</SaveRect>

			<div class="form">
				<QuestionForm>
					<Button value="yes">Yes!</Button>
					<Button value="no">No, my job is fine</Button>
				</QuestionForm>
			</div>
		<div>
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

<style lang="scss" scoped>
.container{
	width: 700px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.form{
		width: 50%;
		margin-top: 4rem;
	}
}
</style>
