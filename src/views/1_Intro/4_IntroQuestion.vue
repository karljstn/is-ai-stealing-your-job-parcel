<template>
	<section>
		<div class="container">
			<p class="hello">
				Am I right?
			</p>
			<div class="answers">
				<div>
					<div class="placeholder" id="no"></div>
					<p>Not at all!</p>
				</div>
				<div>
					<div class="placeholder" id="yes"></div>
					<p>Yes...</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import Button from '~/components/UI/ButtonEmoji.vue';
import QuestionForm from '~/components/UI/QuestionForm.vue';
import SaveRect from '~/components/Common/SaveRect.vue';
import Vue from 'vue';
import { fadeBackground } from '~util';
import store from '~/store';
import { VIEWS } from '~constants/VIEWS';
import AudioController from '~/singletons/AudioController';

let voiceTimeout: NodeJS.Timeout;

export default Vue.extend({
	components: {
		SaveRect,
		QuestionForm,
		Button,
	},
	mounted() {
		fadeBackground({ routeName: 'IntroQuestion' });
		const threeView = store.state.sceneManager.threeViews.get(
			VIEWS.find(VIEW => VIEW.ROUTE_NAME === 'IntroQuestion')
		);
		threeView.start();
		voiceTimeout = setTimeout(() => AudioController.play('amirite'), 1000);
	},
	destroyed() {
		const threeView = store.state.sceneManager.threeViews.get(
			VIEWS.find(VIEW => VIEW.ROUTE_NAME === 'IntroQuestion')
		);
		threeView.destroy();
		clearTimeout(voiceTimeout);
		AudioController.stop('amirite');
	},
});
</script>

<style lang="scss" scoped>
.container {
	width: 50vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 7%;

	.hello {
		font-size: 5.2rem;
		margin-bottom: 9%;
	}

	.answers {
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 0 5.3%;
		p {
			font-size: 2rem;
			width: 155px;
			text-align: center;
		}
	}
}

.placeholder {
	height: 400px;
	width: 100%;
}
</style>
