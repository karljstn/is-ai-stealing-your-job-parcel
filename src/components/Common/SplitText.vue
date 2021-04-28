<template>
	<div class="container" ref="container">
		<div v-bind:key="(index + 10) * 1000" v-for="(char, index) in splitted" class="char-container">
			<span class="placeholder">{{ char }}</span>
			<span class="char">{{ char }}</span>
		</div>
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
			const chars = this.$refs.container.querySelectorAll('.char'); //TS can't find it, so this will be JS

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
			const chars = this.$refs.container.querySelectorAll('.char');

			this.timeline
					.addLabel('wobble')

					.staggerTo( chars, this.timelineSettings.charsDuration, {
						// ease: 'Power3.easeInOut',
						y: '50%',
					}, this.timelineSettings.staggerValue,)

					.staggerTo( chars, this.timelineSettings.charsDuration, {
						// ease: 'Power3.easeInOut',
						y: '0%',
					}, this.timelineSettings.staggerValue,)

			this.timeline.seek('wobble')
			this.timeline.repeatDelay(2)
			this.timeline.repeat(-1)
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
.container,
.char-container {
	position: relative;
}
.container {
	display: inline-flex;
	opacity: 0;
}
span {
	&.placeholder {
		visibility: hidden;
	}
	&.char {
		position: absolute;
		transform: translate(0px, 0%);
		left: 0;
	}
}
</style>
