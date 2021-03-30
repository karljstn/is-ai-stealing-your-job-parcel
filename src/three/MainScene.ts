import * as THREE from "three"
import { raf } from "rafz"
import Tweakpane from "tweakpane"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

import Cube from "./Meshes/Cube"
// import MorphingMesh from "./Meshes/MorphingMesh"
import Radio from "./Games/Radiologist/Radio"

import Benchmark from "./Benchmark"
import { clamp, getViewport } from "~/util/"
import { Mesh } from "three"
import { ThreeGroup } from "~/interfaces/Three"
import { PARAMS } from "~/types/"
import Loader from "./Loader"
import store from '~/store'
import FresnelTorus from "./Meshes/FresnelTorus"

export default class Scene {
    // Data
    PARAMS: PARAMS
    w: number
    h: number

    pane: Tweakpane | null

    camera: THREE.PerspectiveCamera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer

    // renderPass: RenderPass
    // composer: EffectComposer


    controls: OrbitControls
    raycaster: THREE.Raycaster
    mouse: THREE.Vector2
    clock: THREE.Clock
    meshes: THREE.Mesh[]
    radio: ThreeGroup

    Benchmark: Benchmark | null
    Loader: Loader | null

    constructor(canvas: HTMLCanvasElement, maxFPS: number) {
        this.PARAMS = {
            maxFPS: maxFPS,
            readyFPS: false,
            averageFPS: 0,
            arrFPS: [],
            scoreFPS: 0,
            testValue: 0,
            viewport: {
                height: 0,
                width: 0,
            },
        }
        this.w = window.innerWidth
        this.h = window.innerHeight

        if (!store.state.devMode.enabled || store.state.devMode.enabled && store.state.devMode.tweakpane)
            this.pane = new Tweakpane()
        else
            this.pane = null

        this.camera = new THREE.PerspectiveCamera(75, this.w / this.h, 0.1, 5000)
        this.camera.position.z = 1 //z has to be different than 0 for getViewport to work
        this.scene = new THREE.Scene()

        this.renderer = new THREE.WebGLRenderer({ canvas })
        this.renderer.setSize(this.w, this.h)
        this.renderer.setPixelRatio(clamp(window.devicePixelRatio, 1, 2)) //limiter à 2

        // this.composer = new EffectComposer(this.renderer)
        // this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        // this.composer.setSize(this.w, this.h)

        // this.renderPass = new RenderPass(this.scene, this.camera)
        // this.composer.addPass(this.renderPass)

        // this.outlinePass = new OutlinePass(new THREE.Vector2(this.w, this.h), this.scene, this.camera)
        // this.composer.addPass(this.outlinePass)

        this.mouse = new THREE.Vector2(-1, -1)
        this.raycaster = new THREE.Raycaster()

        this.controls = new OrbitControls(this.camera, canvas)

        this.clock = new THREE.Clock(true)
        this.meshes = []

        // this.morphingMesh = new MorphingMesh()
        this.radio = new Radio(this.camera, this.raycaster, this.mouse, this.controls)

        this.resize() //has to be done before Benchmark

        if (!store.state.devMode.enabled || store.state.devMode.enabled && store.state.devMode.benchmark)
            this.Benchmark = new Benchmark({
                pane: this.pane,
                PARAMS: this.PARAMS,
                scene: this.scene,
                renderer: this.renderer,
            })

        else {
            this.Benchmark = null
        }

        // this.Loader = new Loader(this.PARAMS.viewport, this.scene, this.camera)
        this.Loader = null

        const fresnel = new FresnelTorus(0.5)
        this.meshes.push(fresnel)
        this.scene.add(fresnel)
    }

    start() {
        this.setEvents()

        if (!store.state.devMode.enabled || store.state.devMode.enabled && store.state.devMode.benchmark)
            this.Benchmark && this.Benchmark.start()

        this.render()


        store.commit('toggleIsThreeReady')
    }

    startRadiologist() {
        console.log('start radiologist game')
        this.camera.position.z = 15
        this.scene.add(this.radio.group)
    }

    destroyRadiologist() {
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


        this.PARAMS.viewport = getViewport(this.camera)
        if (this.Loader) this.Loader.fullScreenPlane.uniforms.uAspectHorizontal.value = window.innerWidth / window.innerHeight
    }

    mousemove(e: MouseEvent) {
        const normalized = { x: e.pageX / window.innerWidth, y: 1 - e.pageY / window.innerHeight }
        this.Loader && this.Loader.fullScreenPlane.uniforms.uMousePos.value.set(normalized.x, normalized.y)
        this.mouse.x = e.clientX / this.w * 2 - 1
        this.mouse.y = - (e.clientY / this.h) * 2 + 1
    }

    render(dt = 0) {
        if (!this.PARAMS.readyFPS && (!store.state.devMode.enabled || store.state.devMode.enabled && store.state.devMode.benchmark)) {
            this.Benchmark && this.Benchmark.update(dt)
        } else {
            this.controls.update()
            this.Benchmark && this.Benchmark.checkFPS(dt)
        }
        this.renderer.render(this.scene, this.camera)
        // this.composer.render()

        this.Loader && this.Loader.update(dt)

        this.renderer.render(this.scene, this.camera)

        for (let index = 0; index < this.meshes.length; index++) {
            const element = this.meshes[index] as FresnelTorus
            element.update()
        }

        raf((dt: number) => this.render(dt))
    }
}
