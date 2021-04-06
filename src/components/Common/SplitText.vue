<template>
	<div ref="container">
		<span v-bind:key="index" v-for="(char, index) in splitted">{{ char }}</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import gsap from 'gsap';
export default Vue.extend({
	props: ['text'],
	mounted() {
		const timelineSettings = {
			staggerValue: 0.014,
			charsDuration: 0.5,
		};
		const timeline = gsap.timeline({ paused: true });
		timeline.addLabel('start');
	},
	computed: {
		splitted() {
			return Array.from(this.text).map(char => char);
		},
	},
});
</script>

<style lang="scss" scoped></style>
