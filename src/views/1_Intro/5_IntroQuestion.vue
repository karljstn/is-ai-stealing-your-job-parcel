<template>
	<section>
		<div class="container">
			<p class="hello">
				Am I right ?
			</p>

			<div class="form">
				<QuestionForm>
					<Button size="2.1" value="yes">😧</Button>
					<SaveRect :rectName="glassesEmoji">
						<div style="visibility: hidden;">
							<Button size="2.1" value="no">🤓</Button>
						</div>
					</SaveRect>
				</QuestionForm>
			</div>
		<div>
	</section>
</template>

<script>
import Button from '~/components/UI/ButtonEmoji';
import QuestionForm from '~/components/UI/QuestionForm';
import SaveRect from '~/components/Common/SaveRect.vue';
import { RECTS } from '~/constants/RECTS';
import Vue from 'vue';
import { fadeBackground } from '~util';
import store from '~store';

export default Vue.extend({
	data() {
		return {
			glassesEmoji: RECTS.INTRO.AMIRITE,
		};
	},
	components: {
		SaveRect,
		QuestionForm,
		Button,
	},
	mounted(){
		fadeBackground({ routeName: "IntroQuestion" });
		store.state.scene?.EmojisScene.start();
	},
	destroyed() {
		store.state.scene?.EmojisScene.destroy();
	},
});
</script>

<style lang="scss" scoped>
.container{
	p{
		font-size: 4rem;
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
