<template>
	<section>
		<p>In your opinion, is AI going to replace...</p>

		<QuestionForm>
			<Button value="yes">MHHHH not really</Button>
			<Button value="no">I already knew it</Button>
		</QuestionForm>
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import Vue from 'vue';

export default Vue.extend({
	components: {
		QuestionForm,
		Button,
	},
});
</script>

<style lang="scss" scoped></style>
