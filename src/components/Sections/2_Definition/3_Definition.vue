<template>
	<section>
		<p>In your opinion, is AI going to replace...</p>

		<autoskip />
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import Vue from 'vue';
import Autoskip from '~components/Common/Autoskip.vue';

export default Vue.extend({
	components: {
		QuestionForm,
		Button,
		Autoskip,
	},
});
</script>

<style lang="scss" scoped></style>
