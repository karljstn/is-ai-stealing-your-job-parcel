<template>
  <section>
    <div class="container-1">
      <h1 class="in-reality">
        In reality, the future is <span>uncertain</span>.
      </h1>
      <p>
        As we have no precedent for something resembling the rise of AI, we
        can't reliably predict what's coming.
      </p>
      <router-link to="/outro"><Button>End</Button></router-link>
    </div>
  </section>
</template>

<script>
import Button from "~/components/UI/Button";
import QuestionForm from "~/components/UI/QuestionForm";
import Vue from "vue";
import { fadeBackground } from "~util";

export default Vue.extend({
  components: {
    QuestionForm,
    Button,
  },
  mounted() {
    fadeBackground({ routeName: "EndThree" });
    document.body.classList.add("white-nav");
  },
  destroyed() {
    document.body.classList.remove("white-nav");
  },
});
</script>

<style lang="scss" scoped>
section {
  padding: 0;
  height: initial;
  width: initial;
  display: initial;
  justify-content: initial;
  align-items: initial;
  flex-direction: initial;

  .container-1 {
    position: absolute;
    left: 45%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 1012px;

    .in-reality {
      margin-bottom: 40px;
      font-size: 4em;
      font-weight: normal;

      span {
        font-style: italic;
        font-size: inherit !important;
      }
    }
    p {
      width: 590px;
      font-size: 1.5em;
      margin: auto;
      position: relative;
      right: 65px;
    }
  }
}
</style>
