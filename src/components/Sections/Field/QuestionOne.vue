<template>
  <section>
    <p>Now, what's this field you're so worried about ?</p>

    <QuestionForm>
      <Button value="yes">Management, Business, Finances</Button>
      <Button value="no">Science, Engineering</Button>
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
