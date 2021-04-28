import * as THREE from "three"
import raf from "~three/Singletons/RAF"
import Tweakpane from "tweakpane"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

import Radio from "./Games/Radiologist/Radio"

import Benchmark from "./Benchmark"
import { clamp, getViewport } from "~/util/"
import { MainSceneParams } from "~/types/"
import Loader from "./Loader"
import store from "~/store"
import EmojiScene from "./Scenes/EmojiSmileScene"
import { RAFS } from "~constants/RAFS"
import TrashcanScene from "./Scenes/TrashcanScene"
import { Vector3 } from "three"
import { TpChangeEvent } from "tweakpane/dist/types/api/tp-event"
import CrystalBallScene from "./Scenes/CrystalBallScene"
import PencilScene from "./Scenes/PencilScene"
import EmojisScene from "./Scenes/EmojisScene"

export default class Scene {
  // Data
  params: MainSceneParams
  w: number
  h: number

  pane: Tweakpane | null

  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  light: THREE.DirectionalLight

  // renderPass: RenderPass
  // composer: EffectComposer

  controls: OrbitControls
  raycaster: THREE.Raycaster
  mouse: THREE.Vector2
  mouseVec3: THREE.Vector3
  clock: THREE.Clock
  meshes: THREE.Mesh[]
  radio: Radio

  Benchmark: Benchmark | null
  Loader: Loader | null
  TrashcanScene: TrashcanScene
  EmojiScene: EmojiScene
  CrystalBallScene: CrystalBallScene
  PencilScene: PencilScene
  EmojisScene: EmojisScene

  constructor(canvas: HTMLCanvasElement, maxFPS: number) {
    this.params = {
      maxFPS: maxFPS,
      readyFPS: false,
      averageFPS: 0,
      arrFPS: [],
      scoreFPS: 0,
      viewport: {
        height: 0,
        width: 0,
      },
      light: {
        pos: new Vector3(4.1, 0.86, 5.2),
        intensity: 0.51,
        target: new Vector3(),
      },
      camera: {
        fov: 45,
        position: new Vector3(0, 0, 2)
      }
    }

    this.w = window.innerWidth
    this.h = window.innerHeight
    const paneEl = document.querySelector(".tp-dfwv")

    if (
      !paneEl &&
      (!store.state.devMode.enabled ||
        (store.state.devMode.enabled && store.state.devMode.tweakpane))
    ) {
      store.commit("setPane", new Tweakpane())
      this.pane = store.state.tweakpane
      if (store.state.tweakpane) store.state.tweakpane.hidden = true
    } else this.pane = null

    this.camera = new THREE.PerspectiveCamera(75, this.w / this.h, 0.1, 5000)
    this.camera.fov = this.params.camera.fov
    this.camera.position.copy(this.params.camera.position) //z has to be different than 0 for getViewport to work

    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    this.renderer.setSize(this.w, this.h)
    this.renderer.setPixelRatio(clamp(window.devicePixelRatio, 1, 2)) //limiter à 2

    // this.composer = new EffectComposer(this.renderer)
    // this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // this.composer.setSize(this.w, this.h)

    // this.renderPass = new RenderPass(this.scene, this.camera)
    // this.composer.addPass(this.renderPass)

    // this.outlinePass = new OutlinePass(new THREE.Vector2(this.w, this.h), this.scene, this.camera)
    // this.composer.addPass(this.outlinePass)

    const ambientLight = new THREE.AmbientLight("#fff", 0.75)
    this.scene.add(ambientLight)

    this.light = new THREE.DirectionalLight("#fff", 0.5)
    this.light.position.set(
      this.params.light.pos.x,
      this.params.light.pos.y,
      this.params.light.pos.z
    )
    this.light.target.position.set(
      this.params.light.target.x,
      this.params.light.target.y,
      this.params.light.target.z
    )
    this.light.intensity = this.params.light.intensity
    this.scene.add(this.light)
    this.scene.add(this.light.target)

    this.mouse = new THREE.Vector2()
    this.mouseVec3 = new THREE.Vector3()
    this.raycaster = new THREE.Raycaster()

    this.controls = new OrbitControls(this.camera, canvas)

    this.clock = new THREE.Clock(true)
    this.meshes = []

    this.radio = new Radio(
      this.camera,
      this.raycaster,
      this.mouse,
      this.controls,
      this.pane,
      this.renderer,
      this.clock
    )

    this.resize() //has to be done before Benchmark

    if (
      !store.state.devMode.enabled ||
      (store.state.devMode.enabled && store.state.devMode.benchmark)
    )
      this.Benchmark = new Benchmark({
        pane: this.pane,
        PARAMS: this.params,
        scene: this.scene,
        renderer: this.renderer,
      })
    else {
      this.Benchmark = null
    }

    if (
      !store.state.devMode.enabled ||
      (store.state.devMode.enabled && store.state.devMode.loader)
    ) {
      this.Loader = new Loader(
        this.params.viewport,
        this.scene,
        this.camera,
        this.pane
      )
    } else {
      this.Loader = null
    }

    this.EmojiScene = new EmojiScene(
      this.params.viewport,
      this.scene,
      this.mouse,
      this.camera
    )
    this.TrashcanScene = new TrashcanScene(
      this.params.viewport,
      this.scene,
      this.mouse,
      this.pane
    )
    this.CrystalBallScene = new CrystalBallScene(this.params.viewport, this.scene)
    this.PencilScene = new PencilScene(this.params.viewport, this.scene, this.mouse)
    this.EmojisScene = new EmojisScene(
      this.params.viewport,
      this.scene,
      this.mouse,
      this.camera
    )
    this.tweaks()
  }

  tweaks() {
    if (!this.pane) return

    const lightFolder = this.pane.addFolder({ title: "Light", expanded: false })
    const lightPosInput = lightFolder.addInput(this.params.light, "pos", {
      label: "Directional light position",
      min: -this.params.viewport.height / 2,
      max: this.params.viewport.height / 2,
    })
    const lightIntensityInput = lightFolder.addInput(
      this.params.light,
      "intensity",
      {
        label: "Directional light intensity",
        min: 0,
        max: this.params.light.intensity * 2,
      }
    )

    lightPosInput.on("change", (e: TpChangeEvent<Vector3>) => {
      this.light.position.set(e.value.x, e.value.y, e.value.z)
    })
    lightIntensityInput.on("change", (e: TpChangeEvent<number>) => {
      this.light.intensity = e.value
    })

    const cameraFolder = this.pane.addFolder({ title: "Camera", expanded: false })
    const fov = cameraFolder.addInput(this.params.camera, "fov", { min: 1, max: 100 })
    const pos = cameraFolder.addInput(this.params.camera, "position")
    fov.on("change", (e: any) => {
      this.camera.fov = e.value
      this.camera.updateProjectionMatrix()
    })
    pos.on("change", (e: any) => {
      this.camera.position.copy(e.value)
    })
  }

  start() {
    this.setEvents()

    if (
      !store.state.devMode.enabled ||
      (store.state.devMode.enabled && store.state.devMode.benchmark)
    )
      this.Benchmark?.tweaks()

    raf.subscribe(RAFS.MAIN, this.render)

    store.commit("toggleIsThreeReady")
  }

  startRadiologist() {
    console.log("start radiologist game")
    this.camera.position.set(0, 0, 20)
    this.scene.add(this.radio.group)
  }

  destroyRadiologist() {
    this.camera.position.copy(this.params.camera.position)
    this.scene.remove(this.radio.group)
  }

  setEvents() {
    window.addEventListener("resize", this.resize.bind(this))
    window.addEventListener("mousemove", this.mousemove.bind(this))
  }

  resize() {
    this.w = window.innerWidth
    this.h = window.innerHeight

    this.camera.aspect = this.w / this.h
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.w, this.h)
    this.renderer.setPixelRatio(clamp(window.devicePixelRatio, 1, 2))

    // this.composer.setSize(this.w, this.h)

    this.radio.onResize()

    this.params.viewport = getViewport(this.camera)
    if (this.Loader)
      this.Loader.fullScreenPlane.uniforms.uAspectHorizontal.value =
        window.innerWidth / window.innerHeight
  }

  mousemove(e: MouseEvent) {
    const normalized = {
      x: e.pageX / window.innerWidth,
      y: 1 - e.pageY / window.innerHeight,
    }
    this.Loader &&
      this.Loader.fullScreenPlane.uniforms.uMousePos.value.set(
        normalized.x,
        normalized.y
      )
    this.mouse.x = (e.clientX / this.w) * 2 - 1
    this.mouse.y = -(e.clientY / this.h) * 2 + 1

    this.mouseVec3.set(this.mouse.x, this.mouse.y, 0)
  }

  render = (dt = 0) => {
    this.Benchmark?.checkFPS(dt)
    this.renderer.render(this.scene, this.camera)

    this.Loader && this.Loader.update(dt)

    this.renderer.render(this.scene, this.camera)

    this.pane && this.pane.refresh()

    this.controls.update()

    this.EmojiScene?.update(dt) //TODO: switch based on progress
    this.PencilScene.update(dt)
  };
}

//TODO: on accept, check if class already instanced
