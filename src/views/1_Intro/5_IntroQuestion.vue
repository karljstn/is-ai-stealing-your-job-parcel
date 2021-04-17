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
					<Button size="2.1" value="yes">😧</Button>
					<Button size="2.1" value="no">🤓</Button>
				</QuestionForm>
			</div>
		<div>
	</section>
</template>

<script>
import Button from '~/components/UI/ButtonEmoji';
import QuestionForm from '~/components/UI/QuestionForm';
import SaveRect from '~/components/Common/SaveRect.vue';
import { RECTS } from '~/constants/RECTS';
import Vue from 'vue';

export default Vue.extend({
	data() {
		return {
			helloRect: RECTS.INTRO.HELLO,
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
	p{
		font-size: 4rem;
	}
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
