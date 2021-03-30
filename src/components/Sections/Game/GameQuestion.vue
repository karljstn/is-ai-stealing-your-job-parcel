<template>
  <section>
    <div>
      <span>What is your opinion on the matter ?</span>
      <QuestionForm>
        <input type="range" />
        <Button :value="yes">Confirm</Button>
      </QuestionForm>
      <span>?</span>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import Button from "~/components/UI/Button.vue";
import QuestionForm from "~/components/UI/QuestionForm.vue";

export default Vue.extend({
  components: {
    Button,
    QuestionForm,
  },
});
</script>

<style lang="scss" scoped></style>
