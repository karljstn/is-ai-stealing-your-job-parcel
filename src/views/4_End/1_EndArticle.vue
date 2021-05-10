<template>
	<section>
		<p>Here's an article on this exact topic.</p>

		<div class="article">
			<a href="https://pubmed.ncbi.nlm.nih.gov/29324970/">https://pubmed.ncbi.nlm.nih.gov/29324970/</a>
			<div class="article__frame">
				<picture>
					<source srcset="~/assets/Images/article/container.webp" type="image/webp" />
					<source srcset="~/assets/Images/article/container.png" type="image/png" />
					<img src="~/assets/Images/article/container.png" alt="container" />
				</picture>
			</div>
			<div class="article__content">
				<picture>
					<source srcset="~/assets/Images/article/pubmed.webp" type="image/webp" />
					<source srcset="~/assets/Images/article/pubmed.png" type="image/png" />
					<img src="~/assets/Images/article/pubmed.png" alt="container" />
				</picture>
			</div>
		</div>

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
	width: 70vw;
	max-width: 800px;
	position: relative;

	a {
		position: absolute;
		top: 10%;
		left: 50%;
		transform: translate(-50%, 0);
		font-size: 0.8rem;
		z-index: 1;
	}

	.article__frame {
		position: relative;
		z-index: 1;
		pointer-events: none;
		img {
			width: 100%;
			box-shadow: 0px 10px 16px 3px rgba(0, 0, 0, 0.2);
			border-radius: 50px;
			margin-top: 15px;
		}
	}

	.article__content {
		position: absolute;
		top: 20%;
		width: 100%;
		height: 75.3%;
		overflow: scroll;
		z-index: 0;
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */

		img {
			width: 95.7%;
			position: absolute;
			overflow: scroll;
			left: 2.3%;
		}
	}

	/* Hide scrollbar for Chrome, Safari and Opera */
	.article__content::-webkit-scrollbar {
		display: none;
	}
}
</style>
