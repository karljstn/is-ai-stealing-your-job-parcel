<template>
	<section>
		<LottieThree
			routeName="IntroThreatened"
			:lottieURL="lottie"
			lottieScale="0.6"
			voiceID="youreHere"
			:voiceDelay="1450"
		/>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import LottieThree from '~components/Common/LottieThree.vue';
import Lottie from '~/assets/Lottie/3. YOURE HERE BECAUSE.json';

export default Vue.extend({
	data() {
		return {
			lottie: Lottie,
		};
	},
	components: {
		LottieThree,
	},
	mounted() {
		document.body.classList.add('white-nav');
	},
	destroyed() {
		document.body.classList.remove('white-nav');
	},
});
</script>

<style lang="scss" scoped></style>
