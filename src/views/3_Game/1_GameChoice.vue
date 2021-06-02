<template>
  <div class="container">
    <h2>In your opinion,<br />is AI going to <i>replace...</i></h2>

    <div class="choices">
      <a href="#" class="choice">
        <div class="decagon-container"><div class="decagon"></div></div>
        <span>
          radiologists
        </span>
      </a>
      <div class="choice">
        <div class="lock">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 21">
            <title>Fichier 1</title>
            <g id="Calque_2" data-name="Calque 2">
              <g id="Calque_1-2" data-name="Calque 1">
                <path
                  d="M14,7H13V5A5,5,0,0,0,3,5V7H2A2,2,0,0,0,0,9V19a2,2,0,0,0,2,2H14a2,2,0,0,0,2-2V9A2,2,0,0,0,14,7ZM5,5a3,3,0,0,1,6,0V7H5Zm9,14H2V9H14Z"
                />
                <rect x="1.6" y="8.71" width="12.82" height="10.79" />
              </g>
            </g>
          </svg>
        </div>
        <span class="inactive">
          warehouse workers
        </span>
      </div>
      <div class="choice">
        <div class="lock">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 21">
            <title>Fichier 1</title>
            <g id="Calque_2" data-name="Calque 2">
              <g id="Calque_1-2" data-name="Calque 1">
                <path
                  d="M14,7H13V5A5,5,0,0,0,3,5V7H2A2,2,0,0,0,0,9V19a2,2,0,0,0,2,2H14a2,2,0,0,0,2-2V9A2,2,0,0,0,14,7ZM5,5a3,3,0,0,1,6,0V7H5Zm9,14H2V9H14Z"
                />
                <rect x="1.6" y="8.71" width="12.82" height="10.79" />
              </g>
            </g>
          </svg>
        </div>
        <span class="inactive">
          truck drivers
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Button from "~/components/UI/Button.vue";
import QuestionForm from "~/components/UI/QuestionForm.vue";
import { VIEWS } from "~constants/VIEWS";
import store from "~store";
import { fadeBackground } from "~util";

export default Vue.extend({
  components: {
    Button,
    QuestionForm,
  },
  mounted() {
    fadeBackground({ routeName: "GameOne" });
    const threeView = store.state.sceneManager.threeViews.get(
      VIEWS.find((VIEW) => VIEW.ROUTE_NAME === "GameOne")
    );
    threeView.start();
  },
  destroyed() {
    const threeView = store.state.sceneManager.threeViews.get(
      VIEWS.find((VIEW) => VIEW.ROUTE_NAME === "GameOne")
    );
    threeView.destroy();
  },
});
</script>

<style lang="scss" scoped>
@import "~/styles/_variables.scss";

.container {
  min-height: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 15vh;

  h2 {
    text-align: center;
    font-weight: normal;
    font-size: 44px;
    margin-bottom: 20px;
  }

  p {
    text-align: center;
  }

  .choices {
    display: flex;
    justify-content: center;

    .choice {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 30px;

      .decagon-container {
        clip-path: polygon(
          50% 0%,
          80% 10%,
          100% 35%,
          100% 70%,
          80% 90%,
          50% 100%,
          20% 90%,
          0% 70%,
          0% 35%,
          20% 10%
        );
        background: $black;
        width: 15px;
        height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        margin-top: 2px;

        .decagon {
          clip-path: polygon(
            50% 0%,
            80% 10%,
            100% 35%,
            100% 70%,
            80% 90%,
            50% 100%,
            20% 90%,
            0% 70%,
            0% 35%,
            20% 10%
          );
          background: $lightpink;
          width: 9px;
          height: 9px;
        }
      }

      .lock {
        width: 15px;
        margin-right: 15px;
        display: flex;
        align-items: center;

        path,
        rect {
          fill: $lightgrey;
        }
      }

      span {
        font-size: 24px;
        &.inactive {
          color: $lightgrey;
        }
      }
    }
  }

  .form {
    width: 330px;
    height: 100%;
    margin-left: 50px;
    opacity: 0;
    form,
    button {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
