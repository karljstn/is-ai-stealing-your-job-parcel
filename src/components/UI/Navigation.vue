<template>
	<nav>
		<div class="left">
			<h3>is ai stealing your job.com</h3>
		</div>
		<div class="right">
			<button v-on:click="togglePane">debug</button>
			<span>menu</span>
		</div>
	</nav>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '~store';

export default Vue.extend({
	methods: {
		togglePane: function(event: MouseEvent) {
			if (!store.state.tweakpane) return;
			store.state.tweakpane.hidden = !store.state.tweakpane.hidden;
		},
	},
});
</script>

<style lang="scss" scoped>
@import '~/styles/_variables.scss';

.white-nav nav {
	h3,
	span,
	button {
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
	}
}
</style>
