import { Vector3 } from "three"
import MainScene from "~/three/MainScene"
import { CustomEase } from "gsap/all"
import Tweakpane from "tweakpane"

export type Viewport = {
  height: number
  width: number
}

export type MainSceneParams = {
  maxFPS: number
  readyFPS: boolean
  averageFPS: number
  arrFPS: number[]
  scoreFPS: number
  viewport: Viewport
  light: {
    pos: Vector3
    intensity: number
    target: Vector3
  }
  camera: {
    fov: number,
    position: Vector3
  }
}

export type StoreState = {
  progression: number
  devMode: {
    enabled: boolean
    benchmark: boolean
    loader: boolean
    tweakpane: boolean
    forceRadiologist: boolean
  }
  load: {
    isVueReady: boolean
    isThreeReady: boolean
    isLoaderReady: boolean
    minLoaderDuration: number
    pauseBeforeLoaderDuration: number
  }
  eases: Map<string, typeof CustomEase>
  scene: MainScene | null
  rects: Map<string, DOMRect>
  tweakpane: Tweakpane | null,
  radiologist: {
    progress: number,
    confirm: boolean,
    confirmCallback: Function | null,
    penalty: Function,
    removeFolder: Function,
    addFolder: Function,
    gameEnded: boolean,
    results: {
      AIused: number,
      processedFiles: number,
      goodAnswers: number
    }
  }
  hideScrollDownArrow: boolean
  darkenScrollDownArrow: boolean
  isPencilWriting: boolean
  isPencilFinished: boolean
  scrollNavigationDelay: number
  hideLanding: boolean
}
