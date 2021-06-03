<template>
	<section>
		<div class="container">
			<p class="hello">
				Am I right ?
			</p>

		<div>
	</section>
</template>

<script>
import Button from "~/components/UI/ButtonEmoji";
import QuestionForm from "~/components/UI/QuestionForm";
import SaveRect from "~/components/Common/SaveRect.vue";
import Vue from "vue";
import { fadeBackground } from "~util";
import store from '~/store';
import { VIEWS } from "~constants/VIEWS";

export default Vue.extend({
  components: {
    SaveRect,
    QuestionForm,
    Button,
  },
  mounted() {
    fadeBackground({ routeName: "IntroQuestion" });
    const threeView = store.state.sceneManager.threeViews.get(VIEWS.find((VIEW) => VIEW.ROUTE_NAME === 'IntroQuestion'))
    threeView.start()
  },
  destroyed() {
    const threeView = store.state.sceneManager.threeViews.get(VIEWS.find((VIEW) => VIEW.ROUTE_NAME === 'IntroQuestion'))
    threeView.destroyed()
  },
});
</script>

<style lang="scss" scoped>
section{
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    p {
      font-size: 4rem;
    }
    width: 700px;

    margin-top: -20%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }
}

</style>
