<template>
	<section>
		<p>Here's an article on this topic.</p>

		<div class="article">
			<a href="https://pubmed.ncbi.nlm.nih.gov/29126825/">https://pubmed.ncbi.nlm.nih.gov/29126825/</a>
			<div class="article__frame">
				<picture>
					<source srcset="~/assets/Images/article/container.webp" type="image/webp" />
					<source srcset="~/assets/Images/article/container.png" type="image/png" />
					<img src="~/assets/Images/article/container.png" alt="container" />
				</picture>
			</div>
			<a href="https://pubmed.ncbi.nlm.nih.gov/29126825/" class="article__content">
				<picture>
					<source srcset="~/assets/Images/article/pubmed.webp" type="image/webp" />
					<source srcset="~/assets/Images/article/pubmed.png" type="image/png" />
					<img src="~/assets/Images/article/pubmed.png" alt="container" />
				</picture>
			</a>
		</div>
		<div class="form">
			<QuestionForm>
				<button>
					<svg width="131" height="52" viewBox="0 0 131 52" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M129.475 28.4749C130.842 27.108 130.842 24.892 129.475 23.5251L107.201 1.25126C105.834 -0.115572 103.618 -0.115572 102.251 1.25126C100.884 2.6181 100.884 4.83418 102.251 6.20101L122.05 26L102.251 45.799C100.884 47.1658 100.884 49.3819 102.251 50.7487C103.618 52.1156 105.834 52.1156 107.201 50.7487L129.475 28.4749ZM0 29.5H127V22.5H0V29.5Z"
							fill="#EFEFEF"
						/>
					</svg>
				</button>
			</QuestionForm>
		</div>
	</section>
</template>

<script lang="ts">
import Button from '~/components/UI/Button.vue';
import QuestionForm from '~/components/UI/QuestionForm.vue';
import Vue from 'vue';
import { fadeBackground } from '~util';
import AudioController from '~/singletons/AudioController';

let voiceTimeout: NodeJS.Timeout;

export default Vue.extend({
	components: {
		QuestionForm,
		Button,
	},
	mounted() {
		fadeBackground({ routeName: 'EndOne' });
		voiceTimeout = setTimeout(() => AudioController.play('heresanarticle'), 500);
	},
	destroyed() {
		clearTimeout(voiceTimeout);
		AudioController.stop('heresanarticle');
	},
});
</script>

<style lang="scss" scoped>
@import '~/styles/_variables.scss';

.article {
	max-width: 1200px;
	width: 85vw;
	position: relative;

	a {
		position: absolute;
		top: 6%;
		left: 50%;
		transform: translate(-50%, 0);
		font-size: 0.8rem;
		z-index: 2;
	}

	.article__frame {
		position: relative;
		z-index: 1;
		pointer-events: none;
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: 100%;
			border-radius: 50px;
			margin-top: 15px;
		}
	}

	.article__content {
		position: absolute;
		top: 11.7%;
		width: 92%;
		height: 77.3%;
		left: 49.2%;
		transform: translate(-50%, 0);
		border-radius: 0 0 12% 12%;
		overflow: scroll;
		z-index: 0;
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */

		img {
			width: 97%;
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

button {
	cursor: pointer;
	background: none;
	border: none;

	svg {
		cursor: pointer;
	}
}

svg path {
	fill: $black;
}

blockquote {
	padding: 15px;
	background: #eee;
	border-radius: 5px;
	margin: 15px 0;
}

/*@at-root

/* src.77de5100.css | http://localhost:1234/src.77de5100.css */

// section p, section span {
//   /* font-size: 2rem; */
//   font-size: 4.3rem;
// }

// .article[data-v-c55207] {
//   /* max-width: 1200px; */
//   max-width: 1420px;
// }

// /* Element | http://localhost:1234/#/13 */

// .container > div:nth-child(5) > section:nth-child(1) > p:nth-child(1) {
//   margin-top: 78px;
// }

// /* Element | http://localhost:1234/#/13 */

// .form {
//   margin-top: -35px;
// }

// /* Element | http://localhost:1234/#/13 */

// .form > form:nth-child(1) > button:nth-child(1) > svg:nth-child(1) {
//   width: 90%;
// }
</style>
