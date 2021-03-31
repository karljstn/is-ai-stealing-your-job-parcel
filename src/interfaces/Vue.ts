
import MainScene from '~/three/MainScene'
import { CustomEase } from 'gsap/all';

export interface StoreState {
    progression: number,
    devMode: {
        enabled: boolean,
        benchmark: boolean,
        loader: boolean,
        tweakpane: boolean,
        goToProgression: number
    },
    load: {
        isVueReady: boolean,
        isThreeReady: boolean,
        isLoaderReady: boolean,
        minLoaderDuration: number,
        pauseBeforeLoaderDuration: number
    },
    eases: Map<string, typeof CustomEase>,
    scene: MainScene | null,
    rects: Map<string, DOMRect>
}