<template>
	<div>
		<slot />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '~/store';
export default Vue.extend({
	props: ['time'],
	mounted() {
		setTimeout(() => {
			store.commit('incrementProgression');
		}, this.time);
	},
});
</script>
