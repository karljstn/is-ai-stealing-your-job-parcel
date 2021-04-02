<template>
	<section>
		<SaveRect :rectName="helloRect">
			<p class="hello">
				Let me guess :
			</p>
		</SaveRect>
		<autoskip />
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import SaveRect from '~/components/Common/SaveRect.vue';
import { RECTS } from '~/constants/RECTS';
import Vue from 'vue';
import Autoskip from '~components/Common/Autoskip.vue';
import { PALETTE } from '~constants/PALETTE';

export default Vue.extend({
	data() {
		return {
			helloRect: RECTS.INTRO.GUESS,
			progression: 0,
		};
	},
	components: {
		SaveRect,
		QuestionForm,
		Button,
		Autoskip,
	},
	destroyed(){
		// const ease = store.state.eases.get("test");
		// const uniforms =
		// store.state.scene &&
		// store.state.scene.Loader &&
		// store.state.scene.Loader.fullScreenPlane.uniforms;
		// uniforms &&
		// gsap.to(uniforms.uMixFactor, { value: 0, ease: ease, duration: 0.5, onComplete: ()=>{
		// 	// uniforms.uColorFinal.value = PALETTE.BLACK
		// 	// uniforms.uColorFinal.value = PALETTE.PINK
		// } });
	}
});
</script>

<style lang="scss" scoped>
p {
	font-size: 4rem;
}
</style>
