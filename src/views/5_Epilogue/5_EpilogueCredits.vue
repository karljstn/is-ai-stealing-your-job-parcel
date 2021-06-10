<template>
  <section>
    <picture>
      <source srcset="~/assets/Images/credits/credits.webp" type="image/webp" />
      <source srcset="~/assets/Images/credits/credits.png" type="image/png" />
      <img src="~/assets/Images/credits/credits.png" alt="credits" />
    </picture>
    <a @click="$router.go(-1)"><Button>x</Button></a>
  </section>
</template>

<script>
import Vue from "vue";
import Button from "~/components/UI/Button";
import { PALETTE } from "~constants/PALETTE";
import { fadeBackground } from "~util";

export default Vue.extend({
  components: { Button },
  mounted() {
    fadeBackground({ color: PALETTE.LIGHTPINK });
  },
});
</script>

<style lang="scss" scoped>
// li {
// color: white;
// }
section {
  img {
    width: 100%;
  }
}
</style>
