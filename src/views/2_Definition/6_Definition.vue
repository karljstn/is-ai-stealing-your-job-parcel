<template>
	<section>
		<div class="lottie">
			<lottie-animation :animationData="lottieURL" :loop="false" />
		</div>
	</section>
</template>

<script>
import Vue from 'vue';
import { fadeBackground } from '~util';
import lottieURL from '~/assets/Lottie/9. BASICALLY.json';
import LottieAnimation from 'lottie-web-vue';

export default Vue.extend({
	data() {
		return {
			lottieURL,
		};
	},
	components: {
		LottieAnimation,
	},
	mounted() {
		fadeBackground({ routeName: 'DefinitionSix' });
	},
});
</script>

<style lang="scss" scoped>
.lottie {
	width: 560px;
}
</style>
