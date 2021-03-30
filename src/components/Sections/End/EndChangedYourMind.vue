<template>
  <section>
    <p>Changed your mind ? Is AI going to replace <b>radiologists</b> ?</p>
    <div class="slider"><input type="range" /></div>
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

<style lang="scss" scoped></style>
