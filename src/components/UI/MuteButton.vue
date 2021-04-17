<template>
	<div class="bottom">
		<span ref="mute" v-bind:class="{ active: isMute }" v-on:click="this.mute">{{
			isMute ? 'unmute' : 'mute'
		}}</span>
	</div>
</template>

<script lang="ts">
export default {
	data(): { isMute: Boolean; volume: number } {
		return {
			isMute: false,
			volume: 1,
		};
	},
	methods: {
		mute() {
			this.isMute = !this.isMute;
			//   gsap.ticker.add(this.fadeGlobalVolume);
		},
		fadeGlobalVolume() {
			//   Howler.volume(this.volume);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '~/styles/_variables.scss';
.bottom {
	position: fixed;
	bottom: 0;
	padding: $menu-padding;

	span {
		font-weight: 200;
		cursor: pointer;
		position: relative;

		&:hover {
			&:after {
				width: 43px;
			}
		}

		&:after {
			content: '';
			width: 0px;
			height: 1px;
			background-color: black;
			position: absolute;
			top: 13px;
			//   top: 20px;
			left: -2px;
			transition: all 0.3s;
		}
	}

	.active {
		&:after {
			top: 20px;
			width: 43px;
		}
	}
}
</style>
