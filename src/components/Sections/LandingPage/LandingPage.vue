<template>
	<section>
		<div class="container">
			<div class="paragraphs">
				<SaveRect v-show="progression === 0" :rectName="helloRect">
					<p class="hello">
						Hello there
					</p>
				</SaveRect>
				<p v-show="progression === 1" class="threatened">
					I'm pretty sure you're a poor 20-something who just had a panic attack after falling into the rabbit
					hole of alarming headlines about AI, and your first move was to search on google if your field is
					going to be AI-ruled in 10yrs from now-on.
				</p>
				<p v-show="progression === 2" class="amiright">Am I right?</p>
			</div>
			<div v-show="progression === 2" class="form">
				<QuestionForm>
					<Button value="yes">Yes...</Button>
					<Button value="no">No, I'm just here to learn</Button>
				</QuestionForm>
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
import { TRANSITIONS } from '~/constants/TRANSITIONS';
export default Vue.extend({
	name: 'landing-page',
	data() {
		return {
			helloRect: RECTS.INTRO.HELLO,
			progression: 0,
		};
	},
	mounted() {
		store.state.scene && store.state.scene.LandingPage.start();
		setTimeout(() => {
			store.state.scene && store.state.scene.LandingPage.hand.wave();
		}, TRANSITIONS.DURATION.LEAVE * 100);
	},
	components: {
		QuestionForm,
		Button,
		SaveRect,
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
