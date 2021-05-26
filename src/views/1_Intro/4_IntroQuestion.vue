<template>
	<section>
		<div class="container">
			<p class="hello">
				Am I right ?
			</p>

			<div class="form">
				<QuestionForm>
					<SaveRect rectName="IntroQuestionFourLeft">
						<Button size="20.1" value="yes"><span class="emoji-text mr">Yeah... </span></Button>
					</SaveRect>
					<SaveRect rectName="IntroQuestionFourRight">
						<Button size="20.1" value="no"><span class="emoji-text ml">Not really!</span></Button>
					</SaveRect>
				</QuestionForm>
			</div>
		<div>
	</section>
</template>

<script>
import Button from "~/components/UI/ButtonEmoji";
import QuestionForm from "~/components/UI/QuestionForm";
import SaveRect from "~/components/Common/SaveRect.vue";
import Vue from "vue";
import { fadeBackground } from "~util";
import store from "~store";

export default Vue.extend({
  components: {
    SaveRect,
    QuestionForm,
    Button,
  },
  mounted() {
    fadeBackground({ routeName: "IntroQuestion" });
    store.state.sceneManager.EmojisScene.start();
  },
  destroyed() {
    store.state.sceneManager.EmojisScene.destroy();
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

    padding-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .form {
      width: 100%;
      margin-top: 1rem;

      .emoji-text{
        font-size: 1.5rem;
        position: absolute;
        bottom: -25%;
        left: 50%;
        transform: translate(-50%, 0);
        width: 100%;

        &.mr{
          left: 37.5%;
        }

        &.ml{
          left: 62.5%;
        }
      }
    }
  }
}

</style>
