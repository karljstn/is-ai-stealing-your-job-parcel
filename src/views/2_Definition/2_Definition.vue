<template>
	<section>
		<p :class="isWritingFinished ? hideClass : showClass">
			First and foremost, do you even know what AI is?
		</p>

		<div :class="isWritingFinished ? hideFormClass : showFormClass">
			<QuestionForm>
				<div class="btn">
					<div class="canvas-container"><CanvasDraw></CanvasDraw></div>
					<span>Not really</span>
				</div>
				<div class="btn">
					<div class="canvas-container"><CanvasDraw></CanvasDraw></div>
					<span>Of course</span>
				</div>
			</QuestionForm>
		</div>
	</section>
</template>

<script lang="ts">
import Button from '~/components/UI/Button.vue';
import QuestionForm from '~/components/UI/QuestionForm.vue';
import CanvasDraw from '~/components/Canvas/CanvasDraw.vue';
import Vue from 'vue';
import store from '~store';
import { fadeBackground } from '~util';
import { VIEWS } from '~constants/VIEWS';
import AudioController from '~/singletons/AudioController';

let voiceTimeout: NodeJS.Timeout;

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
		fadeBackground({ routeName: 'DefinitionTwo' });
		const threeView = store.state.sceneManager.threeViews.get(
			VIEWS.find(VIEW => VIEW.ROUTE_NAME === 'DefinitionTwo')
		);
		threeView.start();

		const intID = setInterval(() => {
			if (this.isWritingFinished) {
				clearInterval(intID);
				// store.state.sceneManager.PencilScene.Pencil.out();
				setTimeout(() => {
					this.$router.push('/7');
				}, 1000);
			}
		}, 64);

		voiceTimeout = setTimeout(() => AudioController.play('firstandforemost'), 100);
	},
	destroyed() {
		const threeView = store.state.sceneManager.threeViews.get(
			VIEWS.find(VIEW => VIEW.ROUTE_NAME === 'DefinitionTwo')
		);
		threeView.destroy();
		clearTimeout(voiceTimeout);
		AudioController.stop('firstandforemost');
	},
});
</script>

<style lang="scss" scoped>
@import '~/styles/_variables.scss';
section {
	cursor: none;

	p {
		user-select: none;
		transition: opacity 0.75s ease-in-out;
		font-size: 5.3rem;
		width: 1280px;
		text-align: center;
		line-height: 130%;
		margin-bottom: 150px;
	}

	.form {
		margin-top: 40px;
		transition: opacity 0.5s ease-in-out;
		transition-delay: 0.5s;
		width: 55%;
		.btn {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			margin: 0 20px;
			span {
				user-select: none;
				font-size: 3.3rem;
			}
			.form {
				margin-top: 45px;
				width: 600px;
			}
		}
	}

	.canvas-container {
		width: 115px;
		height: 115px;
		clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%);
		background: $black;
		display: flex;
		justify-content: center;
		align-items: center;

		canvas {
			width: 100px;
			height: 100px;
			clip-path: polygon(
				50% 0%,
				80% 10%,
				100% 35%,
				100% 70%,
				80% 90%,
				50% 100%,
				20% 90%,
				0% 70%,
				0% 35%,
				20% 10%
			);
		}
	}
}

.fade {
	opacity: 0;
}
</style>
