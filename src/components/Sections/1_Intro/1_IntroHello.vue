<template>
	<section>
		<SaveRect :rectName="helloRect">
			<p class="hello">
				Hello there
			</p>
		</SaveRect>
		<autoskip />
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import SaveRect from '~/components/Common/SaveRect.vue';
import Autoskip from '~/components/Common/Autoskip.vue';
import { RECTS } from '~/constants/RECTS';
import { TRANSITIONS } from '~constants/TRANSITIONS';
import NormalizeWheel from 'normalize-wheel';

import Vue from 'vue';
import store from '~store';

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
		Autoskip,
	},
	mounted() {
		console.log('wtf2');
		store.state.scene?.IntroHand.start();
		setTimeout(() => {
			store.state.scene?.IntroHand.hand.wave();
		}, TRANSITIONS.DURATION.LEAVE * 2000);

		const onWheel = event => {
			const normalized = NormalizeWheel(event);
			const pixelSpeed = normalized.pixelY;
			if (pixelSpeed > 1) {
				store.commit('incrementProgression');
				window.removeEventListener('mousewheel', onWheel);
				window.removeEventListener('wheel', onWheel);
			}
		};
	},
	destroyed() {
		store.state.scene.IntroHand.hand.destroy();
	},
});
</script>

<style lang="scss" scoped>
p {
	font-size: 4rem;
}
</style>
