<template>
  <section>
    <div class="container">
      <p class="hello">
        Am I right ?
      </p>
      <div class="answers">
        <p>Not at all !</p>
        <p>Yes...</p>
      </div>
    </div>
  </section>
</template>

<script>
import Button from "~/components/UI/ButtonEmoji";
import QuestionForm from "~/components/UI/QuestionForm";
import SaveRect from "~/components/Common/SaveRect.vue";
import Vue from "vue";
import { fadeBackground } from "~util";
import store from "~/store";
import { VIEWS } from "~constants/VIEWS";

export default Vue.extend({
  components: {
    SaveRect,
    QuestionForm,
    Button,
  },
  mounted() {
    fadeBackground({ routeName: "IntroQuestion" });
    const threeView = store.state.sceneManager.threeViews.get(
      VIEWS.find((VIEW) => VIEW.ROUTE_NAME === "IntroQuestion")
    );
    threeView.start();
  },
  destroyed() {
    const threeView = store.state.sceneManager.threeViews.get(
      VIEWS.find((VIEW) => VIEW.ROUTE_NAME === "IntroQuestion")
    );
    threeView.destroy();
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7%;

  .hello {
    font-size: 3.6rem;
    margin-bottom: 59%;
  }

  .answers {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 5.3%;
    p {
      font-size: 2rem;
    }
  }
}
</style>
