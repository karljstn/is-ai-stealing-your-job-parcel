import * as THREE from "three"
import Tweakpane from "tweakpane"

import Skeleton from './Skeleton'
import Clipboard from './Clipboard'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import raf from "~three/Singletons/RAF"
import store from "~/store"

import { ThreeGroup } from "~/interfaces/Three"

// import { normalize } from '~/util'
import { RADIOLOGIST } from "~constants/RADIOLOGIST"
import LoadManager from "~/three/Singletons/LoadManager"
// import { Bounce } from 'gsap'

import fragmentForeground from "~/shaders/radiologist/foreground/fragment.glsl"
import vertexForeground from "~/shaders/radiologist/foreground/vertex.glsl"

import fragmentBackground from "~/shaders/radiologist/background/fragment.glsl"
import vertexBackground from "~/shaders/radiologist/background/vertex.glsl"


import gsap from "gsap"

export default class Radio implements ThreeGroup {
    group: THREE.Group


    meshesGroup: THREE.Group
    // radioGeometry: THREE.PlaneBufferGeometry
    // radioMaterial: THREE.MeshBasicMaterial
    // radioMesh: THREE.Mesh
    // zoomGeometry: THREE.PlaneBufferGeometry
    // zoomMaterial: THREE.ShaderMaterial
    // zoomMesh: THREE.Mesh

    ratio: number

    raycaster: THREE.Raycaster
    mouse: THREE.Vector2
    camera: THREE.PerspectiveCamera
    controls: OrbitControls

    selectedObjects: THREE.Object3D[]
    mouseCoords: THREE.Vector2

    renderTarget: THREE.WebGLRenderTarget

    selectedMesh: null | THREE.Mesh
    errorMesh: null | THREE.Mesh

    skeleton: THREE.Group
    heart: THREE.Mesh | null
    heartBaseScale: number | null

    clipboard: THREE.Group
    background: THREE.Mesh
    foreground: THREE.Mesh

    currentIntersect: any
    mouseDown: boolean
    isDragging: boolean

    skeletonScene: THREE.Scene
    renderer: any
    progress: number

    constructor(
        camera: THREE.PerspectiveCamera,
        raycaster: THREE.Raycaster,
        mouse: THREE.Vector2,
        controls: OrbitControls,
        pane: Tweakpane | null,
        renderer: THREE.Renderer
    ) {
        this.group = new THREE.Group()
        this.meshesGroup = new THREE.Group()

        this.skeleton = new THREE.Group()
        this.clipboard = new THREE.Group()

        this.heart = null
        this.heartBaseScale = null

        this.controls = controls

        this.renderer = renderer
        this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight)

        // this.controls.enablePan = false

        this.raycaster = raycaster
        this.camera = camera
        this.mouse = mouse

        this.skeletonScene = new THREE.Scene()


        this.selectedObjects = []
        this.currentIntersect = null
        this.mouseCoords = new THREE.Vector2()

        this.errorMesh = null
        this.selectedMesh = null

        this.progress = 0

        this.mouseDown = false
        this.isDragging = false

        setTimeout(() => {
            this.camera.position.z = 25
        }, 100)

        this.controls.addEventListener("start", () => {
            this.mouseDown = true
        })

        this.controls.addEventListener("change", () => {
            if (this.mouseDown) {
                this.isDragging = true

                if (this.currentIntersect) {
                    this.currentIntersect.object.material.uniforms.uFresnelWidth.value = 0.5
                }
            }
        })

        this.controls.addEventListener("end", () => {
            if (!this.isDragging) {
                this.click()
            } else {
                // console.log('USER DRAGGED');
            }

            this.mouseDown = false
            this.isDragging = false
        })

        raf.subscribe("radioUpdate", this.update)

        this.ratio = (window.innerWidth * 0.82) / (window.innerHeight * 0.71)






        const geoForeground = new THREE.PlaneBufferGeometry(2, 2)


        const matForeground = new THREE.ShaderMaterial({
            uniforms: {
                size: { value: new THREE.Vector2(0.82, 0.78) },
                ratio: { value: this.ratio },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                pi: { value: Math.PI },
                renderTarget: { value: this.renderTarget.texture }
            },
            fragmentShader: fragmentForeground,
            vertexShader: vertexForeground,
            // transparent: true,
            depthTest: false,

            // depthWrite: false
        })

        const geoBackground = new THREE.PlaneBufferGeometry(2, 2)
        const matBackground = new THREE.ShaderMaterial({
            uniforms: {
                size: { value: new THREE.Vector2(1, 1) }
            },
            fragmentShader: fragmentBackground,
            vertexShader: vertexBackground,
            // transparent: true,
            depthTest: false
            // depthWrite: false
        })

        this.background = new THREE.Mesh(geoBackground, matBackground)
        this.background.renderOrder = -2
        this.background.frustumCulled = false

        this.foreground = new THREE.Mesh(geoForeground, matForeground)
        this.foreground.renderOrder = -1
        this.foreground.frustumCulled = false

        this.group.add(this.foreground)
        this.group.add(this.background)

        // this.tweaks()


        this.nextCase()
    }

    nextCase() {
        Skeleton.load(this.skeletonScene, this.progress)
        // Clipboard.load(this.group, this.progress)
    }

    onResize() {

        this.renderTarget.setSize(window.innerWidth, window.innerHeight)

        this.ratio = (window.innerWidth * 0.82) / (window.innerHeight * 0.71)
        const mat = this.foreground.material as THREE.ShaderMaterial

        mat.uniforms.ratio.value = this.ratio
        mat.uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
    }

    tweaks() {
        if (!store.state.tweakpane) return
        const folder = store.state.tweakpane.addFolder({ title: "Radio", expanded: true })
        console.log("a")

        // const sizeInput = folder.addInput(this.params, "size", {
        //     label: "Emoji size",
        //     min: this.size * MODELS.EMOJI.SCALE * 0.33,
        //     max: this.size * MODELS.EMOJI.SCALE * 3,
        // })
    }

    patientFile(cond: Boolean) {
        // if (cond) {
        //     gsap.to(this.skeleton.position, {
        //         duration: 0.5,
        //         x: -10,
        //         z: -10
        //     })
        //     gsap.to(this.meshesGroup.position, {
        //         duration: 0.5,
        //         x: -10,
        //         z: -10
        //     })
        //     gsap.to(this.clipboard.position, {
        //         duration: 0.5,
        //         x: 2.5
        //     })
        // } else {
        //     gsap.to(this.skeleton.position, {
        //         duration: 0.5,
        //         x: 0,
        //         z: 0
        //     })
        //     gsap.to(this.meshesGroup.position, {
        //         duration: 0.5,
        //         x: 0,
        //         z: 0
        //     })
        //     gsap.to(this.clipboard.position, {
        //         duration: 0.5,
        //         x: 50
        //     })
        // }
    }



    confirm = (res: boolean) => {
        console.log("confirm?", res)

        console.log(this.selectedMesh)
        console.log(this.errorMesh)

        //confirm the mesh
        if (res) {
            this.progress++
            store.commit("updateProgress", this.progress)

            if (this.progress === 5) {
                store.commit("setConfirmPopup", false)
                this.endGame()
                return
            }

            console.log('this progress', this.progress)

            if (this.selectedMesh === this.errorMesh) {
                this.errorMesh = null
                this.selectedMesh = null
                // this.currentIntersect = null

                this.nextCase()

                console.log("RADIOLOGIST GAME : GOOD ANSWER")
            } else {
                console.log("RADIOLOGIST GAME: WRONG ANSWER")

                this.nextCase()
                // console.log(this.currentIntersect.object)
            }
        }


        store.commit("setConfirmPopup", false)
    }

    click() {
        if (this.currentIntersect && !store.state.radiologist.confirm) {


            //clicked on something, show popup
            store.commit("setConfirmPopup", true)
            store.commit("setConfirmCallback", this.confirm)

            this.selectedMesh = this.currentIntersect.object
            // console.log(this.selectedMesh.name)
        }

        //success
    }

    useAI() {
        if (this.errorMesh) {
            const mat = this.errorMesh.material as THREE.ShaderMaterial

            gsap.to(mat.uniforms.baseColor.value, {
                x: 1,
                y: 1,
                z: 1
            })
        }
    }

    endGame() {

        gsap.to(Skeleton.mesh.position, {
            y: -30,
            duration: 1,
            onComplete: () => {
                store.commit("incrementProgression")
                // this.meshesGroup.clear()

                // this.group.remove(this.skeleton)
                // this.group.remove(this.clipboard)

                this.camera.position.z = 1
            }
        })
    }


    update = () => {

        this.renderer.setRenderTarget(this.renderTarget)
        this.renderer.render(this.skeletonScene, this.camera)

        this.renderer.setRenderTarget(null)

        if (!this.isDragging) {
            this.raycaster.setFromCamera(this.mouse, this.camera)

            const intersects = this.raycaster.intersectObjects(Skeleton.mesh.children, true)

            if (intersects.length) {

                // console.log(intersects)


                if (this.currentIntersect && this.currentIntersect.object !== intersects[0].object) {

                    const tween = Skeleton.tweenMap.get(this.currentIntersect.object)

                    if (!tween) {
                        const newTween = gsap.to(this.currentIntersect.object.material.uniforms.uFresnelWidth, {
                            duration: 1,
                            value: 1
                        })

                        Skeleton.tweenMap.set(this.currentIntersect.object, newTween)
                    } else {
                        // tween.reverse
                    }

                    // this.currentIntersect.object.material.uniforms.uFresnelWidth.value = 1
                }

                this.currentIntersect = intersects[0]
                this.currentIntersect.object.material.uniforms.uFresnelWidth.value = 0.5

            } else {


                if (this.currentIntersect) {
                    this.currentIntersect.object.material.uniforms.uFresnelWidth.value = 1
                }

                this.currentIntersect = null
            }
        }
    }
}
