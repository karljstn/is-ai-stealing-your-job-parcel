<template>
	<section>
		<p class="hello">
			<span>Let me</span>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<SaveRect :rectName="rect"><span>guess :</span></SaveRect>
		</p>
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
		fadeBackground({ routeName: 'IntroGuess' });
		store.state.scene.CrystalBallScene.start();
	},
	destroyed() {
		store.state.scene.CrystalBallScene.destroy();
	},
});
</script>

<style lang="scss" scoped>
p,
span {
	font-size: 4rem;
}
.hello {
	display: flex;
}
</style>
