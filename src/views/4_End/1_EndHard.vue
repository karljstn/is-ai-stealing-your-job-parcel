<template>
	<section>
		<LottieThree
			routeName="EndOne"
			:lottieURL="lottie"
			lottieScale="0.41"
			voiceID="hardtobelieve"
			:voiceDelay="1050"
		/>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import LottieThree from '~components/Common/LottieThree.vue';
import Lottie from '~/assets/Lottie/12._HARD_TO_BELIEVE_HD.json';

export default Vue.extend({
	data() {
		return {
			lottie: Lottie,
		};
	},
	components: {
		LottieThree,
	},
});
</script>

<style lang="scss" scoped></style>
