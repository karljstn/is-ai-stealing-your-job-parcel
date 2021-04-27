<template>
	<section>
		<img :src="ressourcesURL" alt="Ressources" />
		<a @click="$router.go(-1)"><Button>x</Button></a>
	</section>
</template>

<script>
import Vue from 'vue';
import Button from '~/components/UI/Button';
import ressourcesImg from '~/assets/Misc/ressources.jpeg';
import { fadeBackground } from '~util';
export default Vue.extend({
	data() {
		return {
			ressourcesURL: ressourcesImg,
		};
	},
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
img {
	width: 80%;
}
</style>
