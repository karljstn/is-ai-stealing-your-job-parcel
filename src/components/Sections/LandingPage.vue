<template>
  <section>
    <p>
      Hello there I'm pretty sure you're a poor 20-something who just had a
      panic attack after falling into the rabbit hole of alarming headlines
      about AI, and your first move was to search on google if your field is
      going to be AI-ruled in 10yrs from now-on.
    </p>
    <p>Am i right?</p>
    <QuestionForm>
      <Button value="yes">Yes...</Button>
      <Button value="no">No, I'm just here to learn</Button>
    </QuestionForm>
  </section>
</template>

<script lang="ts">
import gsap from "gsap";

import Button from "~/components/UI/Button.vue";
import QuestionForm from "~/components/UI/QuestionForm.vue";
import Vue from "vue";

export default Vue.extend({
  name: "landing-page",
  components: {
    QuestionForm,
    Button,
  },
  methods: {
    // --------
    // ENTERING
    // --------
    enter(el: HTMLElement, done: Function) {
      gsap.to(el, {
        duration: 1.0,
        opacity: 1,
        onComplete: () => {
          done();
        },
      });
    },
    leave(el: HTMLElement, done: Function) {
      gsap.to(el, {
        duration: 1.0,
        opacity: 0,
        onComplete: () => {
          done();
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
