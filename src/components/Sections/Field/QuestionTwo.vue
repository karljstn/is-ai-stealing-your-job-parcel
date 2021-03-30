<template>
  <section>
    <p>
      Poor soul... I can see why you're scared... Now I get the 12 Xanax boxes
      on your nightstand...
    </p>

    <p>
      I have a little something that could ease your troubles. Wanna try it ?
    </p>

    <QuestionForm>
      <Button value="yes">Well it's not like I have a choice</Button>
      <Button value="no">I already know about it</Button>
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
</style>
