<template>
	<section>
		<LottieThree
			routeName="DefinitionSeven"
			:lottieURL="lottie"
			lottieScale="0.63"
			voiceID="itcanlearn"
			:voiceDelay="1250"
		/>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import LottieThree from '~components/Common/LottieThree.vue';
import Lottie from '~/assets/Lottie/10. IT CAN LEARN.json';

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
