<template>
	<section>
		<p>Made by :</p>
		<ul>
			<li>Michael de Laborde</li>
			<li>Karl Justiniano</li>
			<li>Daria Duvernois</li>
			<li>Sarah Manzaro</li>
		</ul>
		<a @click="$router.go(-1)"><Button>x</Button></a>
	</section>
</template>

<script>
import Vue from 'vue';
import Button from '~/components/UI/Button';

export default Vue.extend({
	components: { Button },
});
</script>

<style lang="scss" scoped>
li {
	// color: white;
}
</style>
