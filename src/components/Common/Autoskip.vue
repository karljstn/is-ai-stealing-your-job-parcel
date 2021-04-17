<template>
	<div>
		<slot />
	</div>
</template>

<script>
import Vue from 'vue';
import router from '~/router';
import store from '~/store';

export default Vue.extend({
	props: ['time'],
	mounted() {
		if (this.$router.history.current.query.noskip === 'true') return;

		setTimeout(() => {
			const currPathFloat = parseFloat(router.history.current.path.substring(1));
			console.log('autoskip', currPathFloat);

			if (!currPathFloat) {
				router.push('/2');
				store.commit('setProgression', 2);
			} else {
				store.commit('setProgression', currPathFloat + 1);
				router.push(`/${currPathFloat + 1}`);
			}
		}, this.time);
	},
});
</script>
