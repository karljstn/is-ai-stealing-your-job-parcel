import Vue from "vue"
import Vuex from "vuex"
import CustomEase from "~/lib/CustomEase/src/CustomEase"
import { StoreState } from "~types"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    progression: 0,
    devMode: {
      enabled: true,
      benchmark: true,
      loader: false,
      tweakpane: true,
      forceRadiologist: false, //forces start radiologist in mainscene for hot reloading
    },
    load: {
      isVueReady: false,
      isThreeReady: false,
      isLoaderReady: false,
      minLoaderDuration: 3000,
      pauseBeforeLoaderDuration: 500,
    },
    eases: new Map<string, typeof CustomEase>(),
    sceneManager: null,
    rects: new Map<string, DOMRect>(),
    count: 0,
    tweakpane: null,
    radiologist: {
      progress: 0,
      confirm: false,
      confirmCallback: null,
      penalty: () => { },
      removeFolder: () => { },
      addFolder: () => { },
      updateCursor: () => { },
      canvasClass: () => { },
      addNotification: () => { },
      stopChrono: () => { },
      gameEnded: false,
      results: {
        AIused: 0,
        processedFiles: 0,
        goodAnswers: 0
      }
    },
    hideScrollDownArrow: false,
    darkenScrollDownArrow: false,
    isPencilWriting: false,
    isPencilFinished: false,
    scrollNavigationDelay: 1000,
    hideLanding: false
  } as StoreState,
  mutations: {
    incrementProgression(state) {
      ++state.progression
      // console.log(state.progression)
    },
    decrementProgression(state) {
      --state.progression
    },
    toggleIsVueReady(state) {
      state.load.isVueReady = !state.load.isVueReady
    },
    toggleIsThreeReady(state) {
      state.load.isThreeReady = !state.load.isThreeReady
    },
    toggleIsLoaderReady(state) {
      state.load.isLoaderReady = !state.load.isLoaderReady
    },
    setProgression(state, payload: number) {
      state.progression = payload
    },
    setScene(state, payload) {
      state.sceneManager = payload
    },
    setEase(state, payload) {
      if (state.eases.get(payload.name)) console.warn("Name already taken")
      state.eases.set(payload.name, payload.ease)
    },
    setRect(state, payload) {
      if (state.rects.get(payload.name))
        return console.warn("Rect already set")
      state.rects.set(payload.name, payload.rect)
    },
    updateProgress(state, payload) {
      state.radiologist.progress = payload
    },
    setConfirmPopup(state, payload) {
      state.radiologist.confirm = payload
    },
    setConfirmCallback(state, payload) {
      state.radiologist.confirmCallback = payload
    },
    setPenalty(state, payload) {
      state.radiologist.penalty = payload
    },
    setRemoveFolder(state, payload) {
      state.radiologist.removeFolder = payload
    },
    setAddFolder(state, payload) {
      state.radiologist.addFolder = payload
    },
    setUpdateCursor(state, payload) {
      state.radiologist.updateCursor = payload
    },
    setGameEnded(state, payload) {
      state.radiologist.gameEnded = payload
    },
    setClassCanvas(state, payload) {
      state.radiologist.canvasClass = payload
    },
    setAddNotification(state, payload) {
      state.radiologist.addNotification = payload
    },
    setStopChrono(state, payload) {
      state.radiologist.stopChrono = payload
    },
    setResults(state, payload) {
      state.radiologist.results = payload
    },
    setPane(state, payload) {
      state.tweakpane = payload
    },
    toggleHideScrollDownArrow(state) {
      state.hideScrollDownArrow = !state.hideScrollDownArrow
    },
    setHideScrollDownArrow(state, payload) {
      state.hideScrollDownArrow = payload
    },
    setPencilWriting(state, payload) {
      state.isPencilWriting = payload
    },
    setPencilFinished(state, payload) {
      state.isPencilFinished = payload
    },
    setScrollNavigationDelay(state, payload) {
      state.scrollNavigationDelay = payload
    },
    setHideLanding(state, payload) {
      state.hideLanding = payload
    },
    setDarkenScrollDownArrow(state, payload) {
      state.darkenScrollDownArrow = payload
    }
  },
  actions: {},
  modules: {},
  // TODO: computed() with isDev
})

export default store
