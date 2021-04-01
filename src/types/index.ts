import { Vector3 } from "three"

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
        pos: Vector3,
        intensity: number
    }
}