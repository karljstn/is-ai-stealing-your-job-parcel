<template>
	<section>
		<SaveRect :rectName="helloRect">
			<p class="hello">
				you're here because you feel like your job is threatened
			</p>
		</SaveRect>
		<autoskip />
	</section>
</template>

<script>
import Button from '~/components/UI/Button';
import QuestionForm from '~/components/UI/QuestionForm';
import SaveRect from '~/components/Common/SaveRect.vue';
import { RECTS } from '~/constants/RECTS';
import Vue from 'vue';
import Autoskip from '~components/Common/Autoskip.vue';

export default Vue.extend({
	data() {
		return {
			helloRect: RECTS.INTRO.THREATHENED,
			progression: 0,
		};
	},
	components: {
		SaveRect,
		QuestionForm,
		Button,
		Autoskip,
	},
});
</script>

<style lang="scss" scoped>
p {
	font-size: 4rem;
}
</style>
