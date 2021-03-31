<template>
	<div class="container">
		<!-- <div class="bar" /> -->
		<div class="text">L E A R N I N G</div>
		<!-- <div class="bar" /> -->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.text {
		color: white;
		padding: 0 1rem;
		font-size: $title-size;
	}

	// .bar {
	//   width: 0.4rem;
	//   background: white;
	//   height: $title-size - 0.5;
	//   margin: 0 0 0.3rem 0;
	// }
}
</style>
