<template>
	<section>
		<div class="container">
			<p>Which job will AI replace ?</p>
			<div class="form">
				<QuestionForm>
					<Button value="yes">Radiologist</Button>
				</QuestionForm>
			</div>
		</div>
	</section>
</template>

<script>
import Vue from 'vue';
import Button from '~/components/UI/Button.vue';
import QuestionForm from '~/components/UI/QuestionForm.vue';
import store from '~store';
import { fadeBackground } from '~util';

export default Vue.extend({
	components: {
		Button,
		QuestionForm,
	},
	mounted() {
		fadeBackground({ routeName: 'GameOne' });
		store.state.scene.SlotMachineScene.start();
	},
});
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	min-height: 330px;
	display: flex;
	align-items: center;
	.form {
		width: 330px;
		height: 100%;
		margin-left: 50px;
		opacity: 0;
		form,
		button {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
