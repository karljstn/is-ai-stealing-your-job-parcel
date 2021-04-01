<template>
	<section>
		<div class="container">
			<div class="paragraphs">
				<save-rect :rectName="rect">
					<p>
						Scroll to throw <br />
						your biases away
					</p>
				</save-rect>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { RECTS } from '~/constants/RECTS';
import Button from '~/components/UI/Button.vue';
import QuestionForm from '~/components/UI/QuestionForm.vue';
import SaveRect from '~/components/Common/SaveRect.vue';
import Vue from 'vue';
import store from '~/store';
import Autoskip from '~components/Common/Autoskip.vue';
import NormalizeWheel from 'normalize-wheel';

export default Vue.extend({
	name: 'landing-page',
	data() {
		return {
			rect: RECTS.LANDING,
			progression: 0,
		};
	},
	mounted() {
		store.state.scene?.Loader?.fullScreenPlane.toggleTransitions();
		store.state.scene?.LandingPage.start();

		const onWheel = (event: any) => {
			const normalized = NormalizeWheel(event);
			const pixelSpeed = normalized.pixelY;
			if (pixelSpeed > 1) {
				window.removeEventListener('mousewheel', onWheel);
				window.removeEventListener('wheel', onWheel);
				store.state.scene?.LandingPage.trashcan.drop();
				setTimeout(() => {
					store.commit('incrementProgression');
				}, 2000);
			}
		};

		window.addEventListener('mousewheel', onWheel);
		window.addEventListener('wheel', onWheel);
	},
	destroyed() {
		store.state.scene?.LandingPage.trashcan.destroy();
	},
	components: {
		QuestionForm,
		Button,
		SaveRect,
		Autoskip,
	},
});
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	.paragraphs {
		display: flex;
		flex-direction: column;
		height: 50vh;
		justify-content: center;
		align-items: center;
		p {
			transition: opacity 0.2s ease-in-out;
			font-size: 4rem;
			text-align: center;
		}
		.hello,
		.threatened,
		.amiright {
			width: fit-content;
		}
		.hello {
			margin-right: 6rem;
			font-size: 6rem;
		}
	}
	.form {
		transition: opacity 0.2s ease-in-out;
		margin: 2rem 0 0 0;
	}
	.hide {
		display: none;
		opacity: 0;
	}
}
</style>
