<template>
	<div class="toolbar">
		<div class="tool-1" v-on:click="updateTool('file')">file</div>
		<div class="tool-2" v-on:click="updateTool('ai')">ai</div>
		<div class="tool-3" v-on:click="updateTool('zoom')">zoom</div>
		<div class="tool-4" v-on:click="updateTool('pen')">pen</div>
		<div class="tool-5" v-on:click="updateTool('eraser')">eraser</div>
		<div class="tool-6" v-on:click="nextCase()">valid</div>
		<div class="tool-7"></div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: ['nextCase', 'updateTool'],
	methods: {
		test: function(event: Event) {
			console.log(event);
		},
	},
});
</script>

<style lang="scss" scoped>
@import '../../../../styles/variables.scss';

.toolbar {
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 50%;
	height: 70px;
	background-color: white;
	position: fixed;
	bottom: 0;
	right: 0;
	z-index: $menus;

	div {
		width: 50px;
		height: 50px;
		background-color: black;
		cursor: pointer;
		color: white;
	}
}
</style>
