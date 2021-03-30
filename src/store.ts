import Vue from 'vue'
import Vuex from 'vuex'
import CustomEase from "~/lib/CustomEase/src/CustomEase"
import { StoreState } from "~/interfaces/Vue"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        progression: 0,
        devMode: {
            enabled: true,
            benchmark: false,
            loader: false,
            tweakpane: true,
            goToProgression: 8
        },
        load: {
            isVueReady: false,
            isThreeReady: false,
            isLoaderReady: false,
            minLoaderDuration: 4000,
            pauseBeforeLoaderDuration: 500
        },
        eases: new Map<string, typeof CustomEase>(),
        scene: null
    } as StoreState,
    mutations: {
        incrementProgression(state) {
            ++state.progression
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
            state.scene = payload
        },
        setEase(state, payload) {
            if (state.eases.get(payload.name)) console.warn('Name already taken')
            state.eases.set(payload.name, payload.ease)
        }
    },
    actions: {},
    modules: {},
})

export default store