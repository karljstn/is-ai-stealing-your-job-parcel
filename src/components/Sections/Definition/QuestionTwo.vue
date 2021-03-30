<template>
  <section>
    <p>You sure ? Because i'm 99% sure you don't !</p>

    <p>Let me explain</p>

    <QuestionForm>
      <Button value="yes">Okay you got me</Button>
      <Button value="no">FFS leave me alone</Button>
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
