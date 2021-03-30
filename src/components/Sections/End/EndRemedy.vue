<template>
  <section>
    <p>in reality, the future is pretty uncertain</p>
    <p>
      we have no precedent on what’s coming, and even ai experts themselves have
      very divergent opinions on the subject
    </p>
    <p>
      Wether high levelmachine intelligence (also konw as “strong” ai) will have
      a positive or negative impact,
    </p>
    <img src="~/assets/Charts/GRAPHIC1.png" alt="chart" />
    <p>
      when should this type of ai come to be, or wether it’ll ever happen at
      all,
    </p>
    <img src="~/assets/Charts/GRAPHIC2.png" alt="chart" />
    <p>on which tasks AI will outperform AI humans, and when</p>
    <img src="~/assets/Charts/GRAPHIC3.png" alt="chart" />
    <p>
      Our actions will have consequences and the way we’ll use ai will greatly
      influence our future
    </p>
    <p>
      what we know, is that nowadays AI’s excellent in very specific topics, but
      not that great at multitasking, and and definitely not at the level of
      general problem solving that humans can be.
    </p>
    <img src="~/assets/Charts/GRAPHIC3.png" alt="chart" />
    <p>
      In a perfect world, wealth created by the ai workforce could be
      redistributed equitably, so that people could live lives free of menial
      labor.
    </p>
    <p>That being said, try bringing this up to Jeff Bezos.</p>
    <p>What’s your take on this topic?</p>
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

<style lang="scss" scoped>
section {
  height: auto;
}
</style>
