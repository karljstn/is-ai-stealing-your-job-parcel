<template>
	<nav>
		<div class="left">
			<router-link to="/">
				<h3>is ai stealing your job.com</h3>
			</router-link>
		</div>
		<div ref="middle" class="middle">
			<router-link to="/credits">
				credits
			</router-link>
			<router-link to="/outro/ressources">
				learn more
			</router-link>
			<router-link to="/outro/takeaction">
				take action
			</router-link>
			<router-link to="/outro/share">
				share
			</router-link>
		</div>
		<div class="right">
			<button v-on:click="togglePane">debug</button>
			<button v-on:click="toggleMenu"><span>menu</span></button>
		</div>
	</nav>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '~store';
import gsap from 'gsap';

export default Vue.extend({
	data() {
		return {
			isMenu: false,
		};
	},
	methods: {
		togglePane: function(event: MouseEvent) {
			if (!store.state.tweakpane) return;
			store.state.tweakpane.hidden = !store.state.tweakpane.hidden;
		},
		toggleMenu: function() {
			this.isMenu = !this.isMenu;
			if (this.isMenu) gsap.to(this.$refs.middle, { opacity: 1, duration: 0.4 });
			else gsap.to(this.$refs.middle, { opacity: 0, duration: 0.4 });
		},
	},
});
</script>

<style lang="scss" scoped>
@import '~/styles/_variables.scss';
.white-nav nav {
	h3,
	span,
	button,
	a {
		color: $white;
	}
}
nav {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	padding: $menu-padding;
	display: flex;
	justify-content: space-between;
	z-index: $menus;

	.middle {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		opacity: 0;

		a {
			transition: color 0.5s ease-in-out;
			font-weight: 300;
			margin: 0 15px;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	h3,
	span,
	button {
		transition: color 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19);
	}
	h3 {
		width: 150px;
		transform: rotate(-15deg);
	}
	h3,
	span {
		font-weight: 200;
	}
	button {
		border: none;
		margin-right: 30px;
		background: none;
		cursor: pointer;
		outline: none;
		font-size: 1rem;
		&:hover {
			text-decoration: underline;
		}
	}
}
</style>
