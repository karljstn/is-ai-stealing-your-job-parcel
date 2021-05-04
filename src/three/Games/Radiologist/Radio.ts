import * as THREE from "three"
import Tweakpane from "tweakpane"

import Skeleton from './Skeleton'
import Clipboard from './Clipboard'
import Foreground from './Foreground'
import Background from './Background'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import raf from "~three/Singletons/RAF"
import store from "~/store"

import { ThreeGroup } from "~/interfaces/Three"
import gsap from "gsap"

let coef = 0

const params = {
    //2 is 0.5 seconds
    fresnelSpeed: 4,

    fresnelIntensity: 0.3
}

let minPan = new THREE.Vector3(0, -5, 0)
let maxPan = new THREE.Vector3(0, 3.5, 0)
let _v = new THREE.Vector3()

export default class Radio implements ThreeGroup {
    group: THREE.Group

    raycaster: THREE.Raycaster
    mouse: THREE.Vector2
    camera: THREE.PerspectiveCamera
    controls: OrbitControls

    patientFileOpened: boolean

    selectedObjects: THREE.Object3D[]
    pane: Tweakpane | null
    renderTarget: THREE.WebGLRenderTarget

    selectedMesh: null | THREE.Mesh

    currentIntersect: any
    mouseDown: boolean
    isDragging: boolean

    gameEnded: boolean

    skeletonScene: THREE.Scene
    renderer: any
    progress: number

    clock: THREE.Clock

    gameRunning: boolean

    constructor(
        camera: THREE.PerspectiveCamera,
        raycaster: THREE.Raycaster,
        mouse: THREE.Vector2,
        controls: OrbitControls,
        pane: Tweakpane | null,
        renderer: THREE.Renderer,
        clock: THREE.Clock
    ) {
        this.group = new THREE.Group()

        this.controls = controls

        this.patientFileOpened = false

        this.renderer = renderer
        this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight)

        this.controls.minDistance = 5
        this.controls.maxDistance = 30
        this.controls.enabled = false
        // this.controls.enablePan = false
        this.controls.enableDamping = true

        this.pane = pane

        this.gameEnded = false

        this.raycaster = raycaster
        this.camera = camera
        this.mouse = mouse

        this.clock = clock

        this.skeletonScene = new THREE.Scene()
        this.selectedObjects = []
        this.currentIntersect = null

        this.selectedMesh = null

        this.progress = 0

        this.mouseDown = false
        this.isDragging = false


        this.gameRunning = false


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

            // console.log('dragging')

            // if (!Skeleton.isAnimating) {

            _v.copy(this.controls.target)
            this.controls.target.clamp(minPan, maxPan)
            _v.sub(this.controls.target)
            this.camera.position.sub(_v)
            // }
        })

        this.controls.addEventListener("end", () => {
            this.mouseDown = false
            this.isDragging = false
        })
    }


    init() {
        raf.subscribe("radioUpdate", this.update)
        this.camera.position.set(0, 0, 30)
        this.controls.saveState()

        Skeleton.init(this.skeletonScene)

        this.group.add(Background.mesh)

        Foreground.init(this.renderTarget, this.renderer.getPixelRatio())
        this.group.add(Foreground.mesh)

        Clipboard.load(this.group, this.progress)
    }

    nextCase() {
        Skeleton.transitionOut(this.progress, this.controls)
        Clipboard.nextTexture(this.progress)
    }

    onResize() {
        Foreground.onResize(this.renderer.getPixelRatio())
        this.renderTarget.setSize(window.innerWidth, window.innerHeight)
    }

    patientFile(cond: boolean) {
        this.patientFileOpened = cond

        if (cond) {
            this.controls.reset()
            this.controls.enabled = false
            gsap.to(Skeleton.skeletons[this.progress].position, {
                duration: 0.5,
                x: -5
            })

            gsap.to(Clipboard.material.uniforms.uAlpha, {
                duration: 0.5,
                value: 1,
            })

            gsap.to(Clipboard.mesh.position, {
                duration: 0.5,
                x: 5
            })
        } else {
            gsap.to(Skeleton.skeletons[this.progress].position, {
                duration: 0.5,
                x: 0
            })
            gsap.to(Clipboard.material.uniforms.uAlpha, {
                duration: 0.5,
                value: 0,
                onComplete: () => {
                    this.controls.enabled = true
                }
            })

            gsap.to(Clipboard.mesh.position, {
                duration: 0.5,
                x: 10
            })

        }
    }

    gameState(state: string, cond: boolean) {
        switch (state) {
            case 'timerCanStart':
                this.gameRunning = true
                this.controls.enabled = true
                break
            case 'timerPause':
                this.controls.enabled = !cond
                this.gameRunning = !cond
                break
            default:
                break
        }

    }

    confirm = (res: boolean) => {
        if (res) {
            this.progress++
            store.commit("updateProgress", this.progress)

            if (this.progress === 5) {
                this.gameEnded = true
                store.commit("setConfirmPopup", false)

                this.endGame()
                return
            }

            if (this.selectedMesh === Skeleton.errorMesh) {
                Skeleton.errorMesh = null
                this.selectedMesh = null
                // this.currentIntersect = null

                this.nextCase()

                console.log("RADIOLOGIST GAME : GOOD ANSWER")
            } else {
                console.log("RADIOLOGIST GAME: WRONG ANSWER")

                store.state.radiologist.penalty()
                this.nextCase()
                // console.log(this.currentIntersect.object)
            }
        }

        gsap.to(this.currentIntersect.object.material.uniforms.uFresnelWidth, {
            duration: 0.2,
            value: 1
        })

        this.currentIntersect = null
        this.gameRunning = true
        store.commit("setConfirmPopup", false)
    }

    onClick() {
        if (!this.gameEnded && this.currentIntersect && !store.state.radiologist.confirm) {
            //clicked on something, show popup
            store.commit("setConfirmPopup", true)
            store.commit("setConfirmCallback", this.confirm)
            this.gameRunning = false
            this.selectedMesh = this.currentIntersect.object
        }
    }

    useAI() {
        if (Skeleton.errorMesh) {
            const mat = Skeleton.errorMesh.material as THREE.ShaderMaterial
            mat.uniforms.uFresnelColor.value = new THREE.Color("#FF0000")

            gsap.to(mat.uniforms.uFresnelWidth, {
                value: params.fresnelIntensity,
                duration: 1,
                yoyo: true,
                repeat: -1
            })

        }
    }

    endGame() {

        Skeleton.isAnimating = true
        gsap.to(Skeleton.currentSkeleton.position, {
            y: -20,
            duration: 0.5,
            onComplete: () => {
                store.commit("setGameEnded", true)
                // store.commit("incrementProgression")
                Skeleton.isAnimating = false

                this.group.remove(Clipboard.mesh)
                this.skeletonScene.remove(Skeleton.currentSkeleton)

                this.camera.position.z = 1

                this.controls.dispose()
            }
        })

        gsap.to(Skeleton.uniforms.uAlpha, {
            duration: 0.5,
            value: 0
        })
    }

    updateRenderTarget() {
        this.renderer.setRenderTarget(this.renderTarget)
        this.renderer.render(this.skeletonScene, this.camera)
        this.renderer.setRenderTarget(null)
    }

    fromMeshToMesh() {
        // ÉTAIT SUR UN MESH AVANT, VIENT DE CHANGER DE MESH
        // DONC SI CHANGEMENT DE MESH, RESET LE VISUEL DE L'ANCIEN

        coef = 0
        gsap.to(this.currentIntersect.object.material.uniforms.uFresnelWidth, {
            duration: 0.25,
            value: 1,
        })
    }

    onMesh(delta: number, intersects: THREE.Intersection) {
        // EST SUR UN MESH
        this.currentIntersect = intersects
        if (coef < params.fresnelIntensity) {
            coef += delta * params.fresnelSpeed
            this.currentIntersect.object.material.uniforms.uFresnelWidth.value = 1 - coef
        }

    }

    fromMeshToBlank() {
        //FROM MESH TO NOTHING

        gsap.to(this.currentIntersect.object.material.uniforms.uFresnelWidth, {
            duration: 0.25,
            value: 1,
        })
    }

    update = () => {
        this.updateRenderTarget()
        const delta = this.clock.getDelta()

        if (Skeleton.loaded) {
            if (this.gameRunning) {
                if (!this.isDragging && !Skeleton.isAnimating && !this.patientFileOpened) {
                    this.raycaster.setFromCamera(this.mouse, this.camera)
                    const intersects = this.raycaster.intersectObjects(Skeleton.skeletons[this.progress].children, true)

                    if (intersects.length) {
                        if (this.currentIntersect && this.currentIntersect.object !== intersects[0].object) this.fromMeshToMesh()
                        this.onMesh(delta, intersects[0])
                    } else {
                        if (this.currentIntersect) this.fromMeshToBlank()
                        coef = 0
                        this.currentIntersect = null
                    }
                }
            }
        }

    }
}
