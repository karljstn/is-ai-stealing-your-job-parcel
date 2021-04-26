<template>
	<section>
		<p>
			Well, let me tell you: you've come to the right place ! First and foremost, do you even know what AI is?
		</p>

		<div class="form">
			<QuestionForm>
				<Button classes="nocursor" value="yes"></Button>Of course!
				<Button classes="nocursor" value="no"></Button>Not sure...
			</QuestionForm>
		</div>
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import Vue from 'vue';
import store from '~store';

export default Vue.extend({
	components: {
		QuestionForm,
		Button,
	},
	mounted() {
		store.state.scene.PencilScene.start();
	},
	destroyed() {
		store.state.scene.PencilScene.destroy();
	},
});
</script>

<style lang="scss" scoped>
.form {
	margin-top: 45px;
	width: 400px;
}
section {
	cursor: none;
}
</style>
