<template>
  <section>
    <p>
      This is a simple example, but it may be closer to the truth than you
      think.
    </p>
    <p>Here's an article on this exact topic.</p>
    <a href="#"><div class="article" /></a>
    <QuestionForm>
      <Button value="yes">Next</Button>
    </QuestionForm>
  </section>
</template>

<script>
import Button from "~/components/UI/Button";
import QuestionForm from "~/components/UI/QuestionForm";
import Vue from "vue";

export default Vue.extend({
  components: {
    QuestionForm,
    Button,
  },
});
</script>

<style lang="scss" scoped>
.article {
  width: 40vw;
  height: 300px;
  background: grey;
}
</style>
