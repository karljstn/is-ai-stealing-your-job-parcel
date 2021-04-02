<template>
  <section>
    <div class="container">
      <p>Ok, now, is AI going to replace</p>
      <div class="form">
        <QuestionForm>
          <Button value="yes">Radiologists</Button>
        </QuestionForm>
      </div>
      <p>?</p>
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
.container{
  display: flex;
  .form{
    width: 230px;
    margin-left: 50px;
  }
}
</style>
