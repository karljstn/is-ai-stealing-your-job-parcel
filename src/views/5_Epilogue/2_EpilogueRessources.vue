<template>
	<section>
		<p>ressources ici</p>
		<router-link to="/outro"><Button>x</Button></router-link>
	</section>
</template>

<script>
import Vue from 'vue';
import Button from '~/components/UI/Button';
import { fadeBackground } from '~util';
export default Vue.extend({
	components: { Button },
	mounted() {
		fadeBackground({ routeName: 'EndThree' });
		document.body.classList.add('white-nav');
	},
	destroyed() {
		document.body.classList.remove('white-nav');
	},
});
</script>

<style lang="scss" scoped>
p {
	color: white;
}
</style>
