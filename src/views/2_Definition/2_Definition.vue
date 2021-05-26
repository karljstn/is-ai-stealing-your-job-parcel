<template>
	<section>
		<p :class="isWritingFinished ? hideClass : showClass">
			First and foremost, do you even know what AI is?
		</p>

		<div :class="isWritingFinished ? hideFormClass : showFormClass">
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
	data() {
		return {
			hideClass: 'fade',
			showClass: '',
			hideFormClass: 'form fade',
			showFormClass: 'form',
		};
	},
	computed: {
		isWritingFinished() {
			return store.state.isPencilFinished;
		},
	},
	mounted() {
		fadeBackground({ routeName: 'DefinitionOne' });
		store.state.sceneManager.PencilScene.start();

		const intID = setInterval(() => {
			if (this.isWritingFinished) {
				clearInterval(intID);
				store.state.sceneManager.PencilScene.Pencil.out();
				setTimeout(() => {
					this.$router.push('/7');
				}, 1000);
			}
		}, 64);
	},
	destroyed() {
		store.state.sceneManager.PencilScene.destroy();
	},
});
</script>

<style lang="scss" scoped>
section {
	cursor: none;

	p {
		user-select: none;
		transition: opacity 0.75s ease-in-out;
	}

	.form {
		margin-top: 40px;
		transition: opacity 0.5s ease-in-out;
		transition-delay: 0.5s;
		.btn {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 20px;
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
}

.fade {
	opacity: 0;
}
</style>
