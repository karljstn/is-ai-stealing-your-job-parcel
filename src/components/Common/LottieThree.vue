<template>
	<div class="rect" ref="rect">
		<div ref="lottie" class="lottie">
			<lottie-animation :animationData="lottieURL" :loop="false" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { fadeBackground } from '~util';
import LottieAnimation from 'lottie-web-vue';
import SaveRect from '~components/Common/SaveRect.vue';
import store from '~store';
import { VIEWS } from '~constants/VIEWS';
import AudioController from '~/singletons/AudioController';

let voiceTimeout: NodeJS.Timeout;

export default Vue.extend({
	props: ['routeName', 'lottieURL', 'lottieScale', 'voiceID', 'voiceDelay'],
	components: {
		LottieAnimation,
		SaveRect,
	},
	mounted() {
		const threeView = store.state.sceneManager.threeViews.get(
			VIEWS.find(VIEW => VIEW.ROUTE_NAME === this.routeName)
		);
		const params = {
			width: this.lottieScale * 100,
		};
		this.$refs.lottie.style.width = params.width + 'vw';

		this.$nextTick(() => {
			const rectElement = this.$refs.rect;
			if (threeView) threeView.start(rectElement);

			fadeBackground({ routeName: this.routeName });

			if (this.voiceID) voiceTimeout = setTimeout(() => AudioController.play(this.voiceID), this.voiceDelay);

			// Hot reloading
			// if (!module.hot) return;
			// module.hot.dispose(() => {
			//   threeView.destroy();
			// });

			const input = store.state.tweakpane.addInput(params, 'width', { min: 0, max: 100 });
			input.on('change', e => {
				this.$refs.lottie.style.width = `${e.value}vw`;
			});
		});
	},
	destroyed() {
		const threeView = store.state.sceneManager.threeViews.get(
			VIEWS.find(VIEW => VIEW.ROUTE_NAME === this.routeName)
		);

		if (threeView) threeView.destroy();
		if (this.voiceID) {
			clearTimeout(voiceTimeout);
			AudioController.stop(this.voiceID);
		}
	},
});
</script>

<style lang="scss" scoped>
.lottie {
	// max-width: 600px;
	transition: all 0.3s ease-in-out;
	&.out-previous {
		transform: translate3d(0, 5%, 0);
		opacity: 0;
	}
	&.out-next {
		transform: translate3d(0, -5%, 0);
		opacity: 0;
	}
}
</style>
