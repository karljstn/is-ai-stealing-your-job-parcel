<template>
	<section>
		<p>
			Well, let me tell you: you've come to the right place ! First and foremost, do you even know what AI is?
		</p>

		<div class="form">
			<QuestionForm>
				<Button value="yes">Of course!</Button>
				<Button value="no">Not sure...</Button>
			</QuestionForm>
		</div>
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import Vue from 'vue';

export default Vue.extend({
	components: {
		QuestionForm,
		Button,
	},
});
</script>

<style lang="scss" scoped>
.form {
	margin-top: 45px;
	width: 400px;
}
</style>
