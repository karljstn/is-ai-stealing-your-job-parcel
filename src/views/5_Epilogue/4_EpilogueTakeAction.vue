<template>
	<section>
		<p>take action ici</p>
		<router-link to="/outro"><Button>x</Button></router-link>
	</section>
</template>

<script>
import Vue from 'vue';
import Button from '~/components/UI/Button';

export default Vue.extend({
	components: { Button },
});
</script>

<style lang="scss" scoped></style>
