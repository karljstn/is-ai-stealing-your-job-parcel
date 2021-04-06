<template>
  <section>
    <SaveRect :rectName="helloRect">
      <p class="hello">Hello there</p>
    </SaveRect>
    <autoskip />
  </section>
</template>

<script>
import Button from "~/components/UI/Button";
import QuestionForm from "~/components/UI/QuestionForm";
import SaveRect from "~/components/Common/SaveRect.vue";
import Autoskip from "~/components/Common/Autoskip.vue";
import { RECTS } from "~/constants/RECTS";
import { TRANSITIONS } from "~constants/TRANSITIONS";
import NormalizeWheel from "normalize-wheel";
import gsap from "gsap";
import Vue from "vue";
import store from "~store";
import { PALETTE } from "~constants/PALETTE";
import { Color } from "three";

export default Vue.extend({
  data() {
    return {
      helloRect: RECTS.INTRO.HELLO,
      progression: 0,
    };
  },
  components: {
    SaveRect,
    QuestionForm,
    Button,
    Autoskip,
  },
  mounted() {
    store.state.scene.IntroHello.start();
  },
  destroyed() {
    const ease = store.state.eases.get("test");
    const uniforms =
      store.state.scene &&
      store.state.scene.Loader &&
      store.state.scene.Loader.fullScreenPlane.uniforms;
    uniforms &&
      gsap.to(uniforms.uMixFactor, { value: 1, ease: ease, duration: 0.5, onComplete: ()=>{
        // uniforms.uColorFinal.value = PALETTE.BLACK
        // uniforms.uColorFinal.value = new Color(PALETTE.BLACK)
      } });
    store.state.scene.IntroHello.emoji.destroy();
  },
});
</script>

<style lang="scss" scoped>
p {
  font-size: 4rem;
}
</style>
