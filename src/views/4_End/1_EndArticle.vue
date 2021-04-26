<template>
	<section>
		<p>
			This is a simple example, but it may be closer to the truth than you think.
		</p>
		<p>Here's an article on this exact topic.</p>
		<a href="#"
			><div class="article"><img src="~/assets/Misc/article.jpg" alt="article" /></div
		></a>
		<a href="#"
			><div class="article"><img src="~/assets/Misc/text.jpg" alt="article" /></div
		></a>
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
		fadeBackground({ routeName: 'EndOne' });
	},
});
</script>

<style lang="scss" scoped>
.article {
	width: 20vw;

	img {
		width: 100%;
	}

	.form {
		width: 300px;
	}
}
</style>
