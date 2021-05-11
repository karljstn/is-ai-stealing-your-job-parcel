<template>
	<section>
		<p>Changed your mind ? Is AI going to replace <b>radiologists</b> ?</p>
		<div class="slider"><input type="range" /></div>
		<div class="form">
			<QuestionForm>
				<Button value="yes">Next</Button>
			</QuestionForm>
		</div>
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import Vue from 'vue';
import { fadeBackground } from '~util';

export default Vue.extend({
	components: {
		QuestionForm,
		Button,
	},
	mounted() {
		fadeBackground({ routeName: 'EndTwo' });
	},
});
</script>

<style lang="scss" scoped>
.form {
	width: 90px;
}
</style>
