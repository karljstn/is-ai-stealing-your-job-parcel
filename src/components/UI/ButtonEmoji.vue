<template>
	<button :value="value"><slot /></button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: ['value'],
});
</script>

<style lang="scss" scoped>
@import '~/styles/_variables.scss';

button {
	position: relative;
	font-size: $text-size;
	width: 300px;
	height: 300px;
	cursor: pointer;
	background: none;
	border: none;
}
</style>
