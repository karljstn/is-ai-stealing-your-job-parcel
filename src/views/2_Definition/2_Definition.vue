<template>
	<section>
		<p>
			AI is the study of "intelligent agents" : devices that perceive their environment and take actions that
			maximize their chance of successfully achieving their goals.
		</p>
		<p>But you won't understand any of that</p>
		<p>
			In simpler words, ai is a machine that "mimic" the human mind , such as the capacity of "learning" and
			"problem solving"
		</p>
		<p>Do you get it now ??</p>
		<div class="form">
			<QuestionForm>
				<Button value="yes">MHHHH not really</Button>
				<Button value="no">I already knew it</Button>
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
		fadeBackground({ routeName: 'DefinitionTwo' });
	},
});
</script>

<style lang="scss" scoped>
section {
	align-items: flex-start;
	p {
		margin: 1rem 0;
	}
}
.form {
	margin-top: 45px;
	width: 600px;
}
</style>
