<template>
	<div ref="container">
		<span v-bind:key="index" v-for="(char, index) in splitted">{{ char }}</span>
	</div>
</template>

<script lang="js">
import Vue from 'vue';
import gsap from 'gsap';
export default Vue.extend({
	props: ['text'],
	data(){
		return {
			timelineSettings : {
			staggerValue: 0.014,
			charsDuration: 0.5,
		},
			timeline: gsap.timeline({ paused: true })
		}
	},
	methods:{
		fadeIn(){
			const chars = this.$refs.container.querySelectorAll('span'); //TS can't find it, so this will be JS

			this.timeline
					.addLabel('fadeIn')
					.staggerTo( chars, this.timelineSettings.charsDuration, {
					ease: 'Power3.easeIn',
					opacity: 1
			}, this.timelineSettings.staggerValue, 'start')

			this.timeline.seek('fadeIn')
			this.timeline.play()
		},
		wobble(){
			const chars = this.$refs.container.querySelectorAll('span');

			this.timeline
					.addLabel('wobble')
					.staggerTo( chars, this.timelineSettings.charsDuration, {
					ease: 'Power3.easeIn',
					y: '-100%',
					opacity: 1
			}, this.timelineSettings.staggerValue, 'start')

			this.timeline.seek('fadeIn')
			this.timeline.play()
		}
	},
	computed: {
		splitted() {
			return Array.from(this.text).map(char => char);
		},
	},
});
</script>

<style lang="scss" scoped>
span {
	opacity: 0;
}
</style>
