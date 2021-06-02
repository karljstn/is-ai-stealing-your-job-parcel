<template>
  <section>
    <p>Here's an article on this topic.</p>

    <div class="article">
      <a href="https://pubmed.ncbi.nlm.nih.gov/29126825/"
        >https://pubmed.ncbi.nlm.nih.gov/29126825/</a
      >
      <div class="article__frame">
        <picture>
          <source
            srcset="~/assets/Images/article/container.webp"
            type="image/webp"
          />
          <source
            srcset="~/assets/Images/article/container.png"
            type="image/png"
          />
          <img src="~/assets/Images/article/container.png" alt="container" />
        </picture>
      </div>
      <a
        href="https://pubmed.ncbi.nlm.nih.gov/29126825/"
        class="article__content"
      >
        <picture>
          <source
            srcset="~/assets/Images/article/pubmed.webp"
            type="image/webp"
          />
          <source
            srcset="~/assets/Images/article/pubmed.png"
            type="image/png"
          />
          <img src="~/assets/Images/article/pubmed.png" alt="container" />
        </picture>
      </a>
    </div>
    <div class="form">
      <QuestionForm>
        <Button value="yes">Next</Button>
      </QuestionForm>
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
    fadeBackground({ routeName: "EndOne" });
  },
});
</script>

<style lang="scss" scoped>
.article {
  width: 85vw;
  position: relative;

  a {
    position: absolute;
    top: 12%;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 0.8rem;
    z-index: 2;
  }

  .article__frame {
    position: relative;
    z-index: 1;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      border-radius: 50px;
      margin-top: 15px;
    }
  }

  .article__content {
    position: absolute;
    top: 17.5%;
    width: 87%;
    height: 67.3%;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 0 0 12% 12%;
    overflow: scroll;
    z-index: 0;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    img {
      width: 97%;
      position: absolute;
      overflow: scroll;
      left: 2.3%;
    }
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .article__content::-webkit-scrollbar {
    display: none;
  }
}

blockquote {
  padding: 15px;
  background: #eee;
  border-radius: 5px;
  margin: 15px 0;
}
</style>
