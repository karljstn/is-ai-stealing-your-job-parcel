<template>
	<div :class="show">
		<p>scroll</p>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.4 34.04">
			<g id="Calque_2" data-name="Calque 2">
				<g id="Calque_1-2" data-name="Calque 1">
					<line class="cls-1" x1="4.7" x2="4.7" y2="32.8" />
					<polygon class="cls-2" points="0 28.99 0.84 28.2 4.7 32.36 8.56 28.2 9.4 28.99 4.7 34.04 0 28.99" />
				</g>
			</g>
		</svg>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '~store';

export default Vue.extend({
	computed: {
		show() {
			const router: any = this.$router;
			const isLanding = router.history.current.name === 'LandingPage';
			return !isLanding || store.state.hideScrollDownArrow ? 'scroll hide' : 'scroll';
		},
	},
});
</script>

<style lang="scss" scoped>
@import '~/styles/_variables.scss';
.scroll {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: absolute;
	bottom: 8vh;
	width: 15px;
	left: 50%;
	transform: translate(-50%, 0);
	z-index: $menus;
	transition: opacity 0.3s ease-in;

	&.hide {
		opacity: 0;
	}

	p {
		font-weight: 100;
		font-size: 1.3rem;
		margin-bottom: 5px;
		font-style: italic;
		color: $white;
	}

	svg {
		.cls-1 {
			fill: none;
			stroke: $white;
			stroke-miterlimit: 10;
			stroke-width: 1.15px;
		}
		.cls-2 {
			fill: $white;
		}
	}
}
</style>
