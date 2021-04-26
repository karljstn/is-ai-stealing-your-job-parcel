<template>
	<section>
		<p>Wow, you made it to the end, great job!</p>
		<p>Now, what do you want to do next?</p>
		<router-link to="/8">Try again</router-link>
		<router-link to="/outro/takeaction">Take action</router-link>
		<router-link to="/outro/share">Share</router-link>
		<router-link to="/outro/ressources">Learn more</router-link>
	</section>
</template>

<script>
import Vue from 'vue';
import { fadeBackground } from '~util';

export default Vue.extend({
	components: {},
	mounted() {
		fadeBackground({ routeName: 'EndOne' });
	},
});
</script>

<style lang="scss" scoped></style>
