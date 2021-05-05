<template>
	<div>
		<slot />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '~/router';
import NormalizeWheel from 'normalize-wheel';
import VueRouter, { RouteRecordPublic } from 'vue-router';
import { debounce } from '~util/_index.js';

const wait = 500;

export default Vue.extend({
	props: ['time'],
	methods: {
		onWheel(event: Event) {
			const r = router as VueRouter & { history: any }; // bad type
			const routes = router.getRoutes();
			const currPath: number = parseFloat(r.history.current.path.substring(1));

			let target: RouteRecordPublic;

			const normalized = NormalizeWheel(event);
			const pixelSpeed = normalized.pixelY;
			if (pixelSpeed >= 1) {
				target = this.getNextRoute(routes, currPath);
			} else if (!currPath) return;
			else {
				target = this.getPreviousRoute(routes, currPath);
			}

			router.push(target);
		},
		getNextRoute(routes: RouteRecordPublic[], index: number) {
			if (!index) {
				return routes[1];
			} else {
				return routes[index + 1];
			}
		},
		getPreviousRoute(routes: RouteRecordPublic[], index: number) {
			if (index === 1) {
				return routes[0];
			} else {
				return routes[index - 1];
			}
		},
	},
	mounted() {
		const debounced = debounce(this.onWheel, wait, true);

		window.addEventListener('wheel', debounced);
		window.addEventListener('mousewheel', debounced);
	},
});
</script>
