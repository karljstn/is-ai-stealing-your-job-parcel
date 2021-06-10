<template>
	<section>
		<h2>What's your take on this topic?</h2>
		<div ref="ball" class="ball"></div>

		<!-- <p>click to shake the ball until you are happy<br />with the answer, and scroll to validate</p> -->
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import { fadeBackground } from '~util';
import store from '~store';
import { VIEWS } from '~constants/VIEWS';
import AudioController from '~/singletons/AudioController';

let voiceTimeout: NodeJS.Timeout;

export default Vue.extend({
	mounted() {
		document.body.classList.add('white-nav');

		fadeBackground({ routeName: 'EndSix' });

		const threeView = store.state.sceneManager.threeViews.get(VIEWS.find(VIEW => VIEW.ROUTE_NAME === 'EndSix'));

		if (threeView) threeView.start(this.$refs.ball);
		else console.error('view is ', threeView);

		voiceTimeout = setTimeout(() => AudioController.play('whatsyourtake'), 500);
	},
	destroyed() {
		document.body.classList.remove('white-nav');

		// Execute code for every single gltf
		for (const VIEW of VIEWS) {
			for (const gltf of store.state.sceneManager.threeViews.get(VIEW).gltfMeshes) {
				if (typeof gltf.out !== 'undefined') gltf.out();
				if (typeof gltf.killTimeouts !== 'undefined') gltf.killTimeouts();
				setTimeout(() => {
					gltf.destroy();
				}, 500);
			}
		}

		clearTimeout(voiceTimeout);
		AudioController.stop('whatsyourtake');
	},
});
</script>

<style lang="scss" scoped>
@import '~/styles/_variables.scss';

.form {
	width: 90px;
}

.ball {
	width: 600px;
	height: 600px;
}

h2,
p {
	color: $white;
	text-align: center;
}

h2 {
	font-weight: normal;
	font-size: 60px;
}

p {
	font-weight: 200;
	font-size: 14px;
}
</style>
