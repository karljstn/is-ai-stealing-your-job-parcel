<template>
  <section>
    <div>
      <span>Ok, now, is AI going to replace</span>
      <QuestionForm>
        <Button value="yes">Radiologists</Button>
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

<style lang="scss" scoped>
</style>
