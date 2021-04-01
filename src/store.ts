import Vue from "vue";
import Vuex from "vuex";
import CustomEase from "~/lib/CustomEase/src/CustomEase";
import { StoreState } from "~/interfaces/Vue";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    progression: 0,
    devMode: {
      enabled: true,
      benchmark: true,
      loader: true,
      tweakpane: false,
      goToProgression: 0, //9 for radiologist
      forceRadiologist: false, //forces start radiologist in mainscene for hot reloading
    },
    load: {
      isVueReady: false,
      isThreeReady: false,
      isLoaderReady: false,
      minLoaderDuration: 1500,
      pauseBeforeLoaderDuration: 500,
    },
    eases: new Map<string, typeof CustomEase>(),
    scene: null,
    rects: new Map<string, DOMRect>(),
    count: 0,
  } as StoreState,
  mutations: {
    incrementProgression(state) {
      ++state.progression;
      console.log(state.progression);
    },
    decrementProgression(state) {
      --state.progression;
    },
    toggleIsVueReady(state) {
      state.load.isVueReady = !state.load.isVueReady;
    },
    toggleIsThreeReady(state) {
      state.load.isThreeReady = !state.load.isThreeReady;
    },
    toggleIsLoaderReady(state) {
      state.load.isLoaderReady = !state.load.isLoaderReady;
    },
    setProgression(state, payload: number) {
      state.progression = payload;
    },
    setScene(state, payload) {
      state.scene = payload;
    },
    setEase(state, payload) {
      if (state.eases.get(payload.name)) console.warn("Name already taken");
      state.eases.set(payload.name, payload.ease);
    },
    setRect(state, payload) {
      if (state.rects.get(payload.name))
        return console.warn("Rect already set");
      state.rects.set(payload.name, payload.rect);
    },
    updateCount(state, payload) {
      state.count = payload;
    },
  },
  actions: {},
  modules: {},
  // TODO: computed() with isDev
});

export default store;
