<template>
	<section>
		<p>
			Well, let me tell you: you've come to the right place ! First and foremost, do you even know what AI is?
		</p>

		<div class="form">
			<QuestionForm>
				<div class="btn"><CanvasDraw></CanvasDraw><span>Of course!</span></div>
				<div class="btn"><CanvasDraw></CanvasDraw><span>Not sure...</span></div>
			</QuestionForm>
		</div>
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import CanvasDraw from '~/components/Canvas/CanvasDraw';
import Vue from 'vue';
import store from '~store';
import { fadeBackground } from '~util';

export default Vue.extend({
	components: {
		QuestionForm,
		CanvasDraw,
		Button,
	},
	mounted() {
		fadeBackground({ routeName: 'DefinitionOne' });
		store.state.scene.PencilScene.start();
	},
	destroyed() {
		store.state.scene.PencilScene.destroy();
	},
});
</script>

<style lang="scss" scoped>
section {
	cursor: none;

	p {
		user-select: none;
	}

	.btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		span {
			margin-left: 20px;
			user-select: none;
		}
		.form {
			margin-top: 45px;
			width: 600px;
		}
	}
}
</style>
