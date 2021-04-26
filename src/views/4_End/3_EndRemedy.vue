<template>
	<section>
		<div class="container">
			<p>in reality, the future is pretty uncertain</p>
			<p>
				we have no precedent on what’s coming, and even AI experts themselves have very divergent opinions on
				the subject
			</p>
			<p>
				Whether high level machine intelligence (also known as “strong” AI) will have a positive or negative
				impact,
			</p>
			<img src="~/assets/Charts/GRAPHIC1.png" alt="chart" />
			<p>
				when should this type of AI come to be, or wether it’ll ever happen at all,
			</p>
			<img src="~/assets/Charts/GRAPHIC2.png" alt="chart" />
			<p>on which tasks AI will outperform AI humans, and when</p>
			<img src="~/assets/Charts/GRAPHIC3.png" alt="chart" />
			<p>
				Our actions will have consequences and the way we’ll use AI will greatly influence our future
			</p>
			<p>
				what we know, is that nowadays AI’s excellent in very specific topics, but not that great at
				multitasking, and and definitely not at the level of general problem solving that humans can be.
			</p>
			<img src="~/assets/Charts/GRAPHIC3.png" alt="chart" />
			<p>
				In a perfect world, wealth created by the AI workforce could be redistributed equitably, so that people
				could live lives free of menial labor.
			</p>
			<p>That being said, try bringing this up to Jeff Bezos.</p>
			<p>What’s your take on this topic?</p>
			<!-- 
    <QuestionForm>
      <Button value="yes">Next</Button>
    </QuestionForm> -->
			<router-link to="/outro"><Button>End</Button></router-link>
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
		fadeBackground({ routeName: 'EndThree' });
		document.body.classList.add('white-nav');
	},
	destroyed() {
		document.body.classList.remove('white-nav');
	},
});
</script>

<style lang="scss" scoped>
section {
	height: auto;
	.container {
		width: 50vw;
		display: flex;
		flex-direction: column;
		p {
			color: white;
			font-size: 1.5rem;
		}
		img {
			align-self: center;
			width: 600px;
			margin: 100px 0;
		}
	}
}
</style>
