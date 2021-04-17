<template>
	<form @submit="onSubmit">
		<slot />
	</form>
</template>

<script>
import Vue from 'vue';
import router from '~/router';
import store from '~/store';

export default Vue.extend({
	methods: {
		onSubmit: e => {
			e.preventDefault();

			if (!e.submitter) return;

			const currPathFloat = parseFloat(router.history.current.path.substring(1));
			console.log(router.history.current.path, currPathFloat);

			if (!currPathFloat) return;

			store.commit('setProgression', currPathFloat + 1);
			router.push(`/${currPathFloat + 1}`);
		},
	},
});
</script>

<style lang="scss" scoped>
form {
	width: 100%;
	display: flex;
	justify-content: space-between;
}
</style>
