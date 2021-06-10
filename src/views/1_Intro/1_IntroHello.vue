<template>
	<section>
		<LottieThree
			routeName="IntroHello"
			:lottieURL="lottie"
			:lottieScale="0.33"
			voiceID="helloThere"
			:voiceDelay="1850"
		/>
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
