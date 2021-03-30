import { clamp, getAverage, round } from "~/util/"
import { Scene, WebGLRenderer, WebGLRenderTarget } from "three"
import Tweakpane from "tweakpane"
import Cube from "./Meshes/Cube"
import { PARAMS } from "~/types/"

class Benchmark {
  pane: Tweakpane | null
  PARAMS: PARAMS
  count: number
  arrayLength: number
  cubes: Cube[]

  scene: Scene
  renderer: WebGLRenderer
  renderTarget: WebGLRenderTarget

  constructor({
    pane,
    PARAMS,
    scene,
    renderer,
  }: {
    pane: Tweakpane | null
    PARAMS: PARAMS
    scene: Scene
    renderer: WebGLRenderer
  }) {
    this.PARAMS = PARAMS
    this.pane = pane
    this.renderer = renderer
    this.count = 3000
    this.arrayLength = 50
    this.scene = scene
    this.cubes = []
    this.renderTarget = new WebGLRenderTarget(window.innerWidth, window.innerHeight)
  }

  start = () => {
    this.addCubes()
    this.addGUI()
  }

  addCubes = () => {
    const start = -this.PARAMS.viewport.width / 2
    const end = -this.PARAMS.viewport.height / 2
    const step = {
      width: this.PARAMS.viewport.width / this.count,
      height: this.PARAMS.viewport.height / this.count,
    }
    for (let index = 0; index < this.count; index++) {
      const cube = new Cube(10)
      cube.position.set(start + step.width * index, end + step.height * index, -1000)
      this.cubes.push(cube)
      this.scene.add(this.cubes[index])
    }
  }

  addGUI = () => {
    //https://cocopon.github.io/tweakpane/quick-tour.html

    if (this.pane)
      this.pane.addMonitor(this.PARAMS, "averageFPS", {
        view: "graph",
        interval: 200,
        min: 0,
        max: 62,
      })
  }

  checkFPS = (deltaTime: number) => {
    //from https://codesandbox.io/s/caixa-7b0iv?file=/sketch.js:4987-5086

    const fps = 1000 / deltaTime
    this.PARAMS.arrFPS.push(fps)

    if (this.PARAMS.arrFPS.length >= this.arrayLength) {
      this.PARAMS.averageFPS = getAverage(this.PARAMS.arrFPS)
      this.PARAMS.arrFPS = []

      if (!this.PARAMS.readyFPS && this.PARAMS.averageFPS) {
        this.PARAMS.readyFPS = true
        this.PARAMS.scoreFPS = round(clamp(this.PARAMS.averageFPS / this.PARAMS.maxFPS, 0, 1), 1)
        if (this.pane) this.pane.addInput(this.PARAMS, "scoreFPS", { min: 0, max: 1 })
      }
    }
  }

  renderCubes = () => {
    for (let index = 0; index < this.count; index++) {
      const cube: Cube = this.cubes[index]
      cube.update()
    }
  }

  clearCubes = () => {
    this.cubes.forEach(cube => {
      cube.destroy()
      this.scene.remove(cube)
    })
  }

  update = (dt: number) => {
    this.renderer.setRenderTarget(this.renderTarget)
    this.renderCubes()
    this.checkFPS(dt)

    if (this.PARAMS.readyFPS) {
      this.renderer.setRenderTarget(null)
      this.clearCubes()
    }
  }
}

export default Benchmark
