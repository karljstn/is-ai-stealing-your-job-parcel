<template>
	<section>
		<a href="#">Facebook</a>
		<a href="#">Twitter</a>
		<a href="#">Instagram</a>
		<a href="#">LinkedIn</a>
		<a href="#">Reddit</a>
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
a {
	&:hover {
		text-decoration: underline;
	}
}
</style>
