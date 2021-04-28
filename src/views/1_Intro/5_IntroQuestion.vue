<template>
	<section>
		<div class="container">
			<p class="hello">
				Am I right ?
			</p>

			<div class="form">
				<QuestionForm>
					<SaveRect :rectName="sadEmoji">
						<Button size="20.1" value="yes"><span class="emoji-text mr">Yeah... </span></Button>
					</SaveRect>
					<SaveRect :rectName="glassesEmoji">
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
import { RECTS } from "~/constants/RECTS";
import Vue from "vue";
import { fadeBackground } from "~util";
import store from "~store";

export default Vue.extend({
  data() {
    return {
      glassesEmoji: RECTS.INTRO.AMIRITE.RIGHT,
      sadEmoji: RECTS.INTRO.AMIRITE.LEFT,
    };
  },
  components: {
    SaveRect,
    QuestionForm,
    Button,
  },
  mounted() {
    fadeBackground({ routeName: "IntroQuestion" });
    store.state.scene.EmojisScene.start();
  },
  destroyed() {
    store.state.scene.EmojisScene.destroy();
  },
});
</script>

<style lang="scss" scoped>
.container {
  p {
    font-size: 4rem;
  }
  width: 700px;
  height: 100%;
  padding-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .form {
    width: 100%;
    margin-top: 1rem;
    // opacity: 0;
    .emoji-text{
      font-size: 1.5rem;
      position: absolute;
      bottom: -10%;
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
</style>
