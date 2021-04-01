<template>
	<div class="container">
		<div class="text">Learning...</div>
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
		color: $black;
		padding: 0 1rem;
		font-size: $title-size;
	}
}
</style>
