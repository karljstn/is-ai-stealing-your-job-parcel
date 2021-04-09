import { PerspectiveCamera } from "three"
import { Viewport } from "~/types/"

/**
 * @returns Average of an array
 * @type {Number}
 */
export function getAverage(arr: Array<number>) {
  let sum = 0

  for (let index = 0; index < arr.length; index++) {
    sum = sum + arr[index]
  }

  const avg = sum / arr.length

  return avg !== Infinity ? avg : 0
}

/**
 * @returns A number in the range [min, max]
 * @type {Number}
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/**
 * @returns Max FPS tied to Screen refresh rate
 * getMaxFPS().then(fps => ...);
 */
export const getMaxFPS = () =>
  new Promise(resolve =>
    requestAnimationFrame(t1 => requestAnimationFrame(t2 => resolve(1000 / (t2 - t1)))),
  )

/**
* @returns 3D viewport
*/
export const getViewport = (camera: PerspectiveCamera) => {
  const fov = camera.fov * (Math.PI / 180)
  const height = 2 * Math.tan(fov / 2) * camera.position.z
  const width = height * camera.aspect

  return {
    height,
    width,
  }
}

export const rectToThree = (viewport: Viewport, rect: DOMRect) => {
  const x = -viewport.width / 2 + ((rect.left / window.innerWidth) * viewport.width)
  const y = viewport.height / 2 - ((rect.top / window.innerHeight) * viewport.height)

  return {
    x: x,
    y: y
  }
}

export function round(value: number, significantNumbers: number) {
  return Number.parseFloat(value.toFixed(significantNumbers))
}

/**
 * @returns Normalized value
 * @type {Number}
 */
export function normalize(val: number, max: number, min: number) {
  return (val - min) / (max - min)
}
