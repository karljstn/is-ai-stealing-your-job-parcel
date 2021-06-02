<template>
	<section>
		<LottieThree routeName="IntroHello" :lottieURL="lottie" lottieScale="1" />
	</section>
</template>

<script lang="ts">
import LottieThree from '~components/Common/LottieThree.vue';
import lottie from '~/assets/Lottie/1. HELLO THERE.json';
import Vue from 'vue';

export default Vue.extend({
	data() {
		return {
			lottie,
		};
	},
	components: {
		LottieThree,
	},
});
</script>

<style lang="scss" scoped>
div {
	width: 380px;
}
</style>
