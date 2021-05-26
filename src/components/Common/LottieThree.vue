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
import ThreeView from '~three/ThreeView';

export default Vue.extend({
	props: ['routeName', 'lottieURL', 'lottieScale', 'onMount', 'onDestroy', 'onRect'],
	data() {
		return {
			viewData: VIEWS.find(VIEW => VIEW.ROUTE_NAME === this.routeName),
		};
	},
	components: {
		LottieAnimation,
		SaveRect,
	},
	mounted() {
		this.$refs.lottie.style.maxWidth = this.lottieScale * 600 + 'px';

		this.$nextTick(() => {
			const manager = store.state.sceneManager;
			const { viewport, scene, camera } = manager;
			const { viewData, onRect } = this;
			const View = new ThreeView({
				viewport,
				scene,
				camera,
				viewData,
				rect: this.$refs.rect,
				onRect,
			});
			manager.views.set(this.viewData, View);
			manager.views.get(this.viewData).start();
			fadeBackground({ routeName: this.routeName });

			if (typeof this.onMount === 'function') this.onMount();

			// Hot reloading
			if (!module.hot) return;
			module.hot.dispose(() => {
				manager.views.get(this.viewData).destroy();
				if (typeof this.onDestroy === 'function') this.onDestroy();
			});
		});
	},
	destroyed() {
		const manager = store.state.sceneManager;
		manager.views.get(this.viewData).destroy();

		if (typeof this.onDestroy === 'function') this.onDestroy();
	},
});
</script>

<style lang="scss" scoped>
.lottie {
	max-width: 600px;
}
</style>
