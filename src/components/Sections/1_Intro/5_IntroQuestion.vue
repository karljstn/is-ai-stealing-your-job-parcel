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
import store from '~/store'
import gsap from 'gsap'

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
	destroyed(){
		const ease = store.state.eases.get('test');
		const uniforms =
			store.state.scene &&
			store.state.scene.Loader &&
			store.state.scene.Loader.fullScreenPlane.uniforms;
		uniforms && gsap.to(uniforms.uMixFactor, { value: 0, ease: ease, duration: 0.5 });
	}
});
</script>

<style lang="scss" scoped>
.container{
	p{
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
