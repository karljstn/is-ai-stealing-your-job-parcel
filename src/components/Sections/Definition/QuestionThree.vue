<template>
  <section>
    <p>
      Ai is the study of "intelligent agents" : devices that perceive their
      environment and take actions that maximize their chance of successfully
      achieving their goals.
    </p>
    <p>But you won't understand any of that</p>
    <p>
      In simpler words, ai is a machine that "mimic" the human mind , such as
      the capacity of "learning" and "problem solving"
    </p>
    <p>Do you get it now ??</p>

    <QuestionForm>
      <Button value="yes">MHHHH not really</Button>
      <Button value="no">I already knew it</Button>
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
