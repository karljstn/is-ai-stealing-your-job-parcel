<template>
	<div>
		<slot />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '~/store';
import { TRANSITIONS } from '~constants/TRANSITIONS';
export default Vue.extend({
	mounted() {
		setTimeout(() => {
			store.commit('incrementProgression');
		}, TRANSITIONS.DURATION.AUTOSKIP * 1000);
	},
});
</script>
