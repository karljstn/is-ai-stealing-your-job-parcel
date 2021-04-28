<template>
	<section>
		<a target="_blank" href="https://www.theglobalaisummit.com/">Global AI Summit</a>
		<a target="_blank" href="https://futureadvocacy.com/ai-think-tank/">AI Think Tank</a>
		<a target="_blank" href="https://www.impact-ai.fr/">Impact AI</a>
		<a target="_blank" href="https://futureoflife.org/artificial-intelligence/">Future of life institute</a>
		<a target="_blank" href="https://www.ibm.com/training/">IBM Training</a>
		<a target="_blank" href="https://ethics.fast.ai/">Practical Data Ethics - Fast.AI</a>

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

<style lang="scss" scoped></style>
