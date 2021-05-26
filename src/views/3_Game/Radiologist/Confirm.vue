<template>
	<div class="confirm">
		<p>Are you sure?</p>
		<div class="wrapper">
			<button class="yes" v-on:click="onClick(true)">Yes!</button>
			<button class="no" v-on:click="onClick(false)">Not really</button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '~/store';

export default Vue.extend({
	computed: {
		confirmCallback() {
			return store.state.radiologist.confirmCallback;
		},
	},
	methods: {
		onClick(result: boolean) {
			console.log('on click');
			if (this.confirmCallback) this.confirmCallback(result);
		},
	},
});
</script>

<style lang="scss" scoped>
.confirm {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	width: 248px;
	height: 113px;
	padding: 15px;
	border-radius: 15px;

	p {
		text-align: center;
		font-size: 1.5em;
		margin-bottom: 10px;
	}

	.wrapper {
		display: flex;
		width: 100%;
		justify-content: center;
		button {
			width: 90px;
			height: 30px;
			outline: none;
			border: none;
			background-color: #fce4ac;
			margin: 0 10px;
			cursor: pointer;
			transition: all 0.5s;

			&:hover {
				background-color: #f1b832;
			}
		}
	}
}
</style>
