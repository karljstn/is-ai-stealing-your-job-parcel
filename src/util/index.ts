import { PerspectiveCamera } from "three"
import { Component } from "vue"
import { RouteConfig } from "vue-router"
import router from "~router"

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

export const getViewport = (camera: PerspectiveCamera) => {
  const fov = camera.fov * (Math.PI / 180)
  const height = 2 * Math.tan(fov / 2) * camera.position.z
  const width = height * camera.aspect

  return {
    height,
    width,
  }
}

export const rectToThree = (viewport: { width: number, height: number }, rect: DOMRect) => ({
  x: -viewport.width / 2 + ((rect.left / window.innerWidth) * viewport.width),
  y: viewport.height / 2 - ((rect.top / window.innerHeight) * viewport.height),
  w: viewport.width * (rect.width / window.innerWidth),
  h: viewport.height * (rect.height / window.innerHeight)
})

export function round(value: number, significantNumbers: number) {
  return Number.parseFloat(value.toFixed(significantNumbers))
}

export function fadeBackground({ color, routeName }: { color?: string, routeName?: string }) {
  if (color) {
    document.body.style.backgroundColor = color
  } else {
    const route: any = router.options.routes?.find((route) => route.name === routeName)
    document.body.style.backgroundColor = route.color
  }
}
/**
 * @returns Normalized value
 * @type {Number}
 */
export function normalize(val: number, max: number, min: number) {
  return (val - min) / (max - min)
}
