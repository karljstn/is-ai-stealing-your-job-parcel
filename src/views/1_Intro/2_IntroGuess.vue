<template>
	<section>
		<SaveRect :rectName="rect">
			<p class="hello">
				Let me guess :
			</p>
		</SaveRect>
		<autoskip :time="3000" />
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import SaveRect from '~/components/Common/SaveRect.vue';
import { RECTS } from '~/constants/RECTS';
import Vue from 'vue';
import Autoskip from '~components/Common/Autoskip.vue';
import store from '~store';
import { fadeBackground } from '~util';
import { PALETTE } from '~constants/PALETTE';

export default Vue.extend({
	data() {
		return {
			rect: RECTS.INTRO.GUESS,
		};
	},
	components: {
		SaveRect,
		QuestionForm,
		Button,
		Autoskip,
	},
	mounted() {
		fadeBackground({ color: PALETTE.LIGHTPINK });
		store.state.scene.CrystalBallScene.start();
	},
	destroyed() {
		store.state.scene.CrystalBallScene.destroy();
	},
});
</script>

<style lang="scss" scoped>
p {
	font-size: 4rem;
}
</style>
