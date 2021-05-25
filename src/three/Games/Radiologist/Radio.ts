import * as THREE from "three"
import Tweakpane from "tweakpane"

import Skeleton from "./Skeleton"
import Clipboard from "./Clipboard"
import Foreground from "./Foreground"
import Background from "./Background"

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import raf from "~singletons/RAF"
import store from "~/store"

import { ThreeGroup } from "~/interfaces/Three"
import gsap from "gsap"
import router from "~router"

let coef = 0

const params = {
    //2 is 0.5 seconds
    fresnelSpeed: 4,

    fresnelIntensity: 0.3
}

let minPan = new THREE.Vector3(0, -5, 0)
let maxPan = new THREE.Vector3(0, 3.5, 0)
let _v = new THREE.Vector3()

let dragForce = 0

const AI_CAMERA_VALUES = [3.5, 0.5, 0.5, 0, 3]

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

    aiUsed: number
    goodAnswers: number

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

        this.aiUsed = 0
        this.goodAnswers = 0

        this.patientFileOpened = false

        this.renderer = renderer
        this.renderTarget = new THREE.WebGLMultisampleRenderTarget(window.innerWidth, window.innerHeight)

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

        const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial())
        // this.group.add(mesh)

        // mesh.position.y = 3.5

        this.controls.addEventListener("start", () => {
            this.mouseDown = true
            dragForce = 0
        })

        this.controls.addEventListener("change", () => {
            dragForce += 1
            if (this.mouseDown && dragForce > 15) {
                this.isDragging = true

                // if (this.currentIntersect) {

                //     this.currentIntersect.object.material.uniforms.uFresnelWidth.value = 0.5
                //     // this.currentIntersect = null
                //     // coef
                // }
            }

            //doesn't work in the update
            if (this.controls.enabled) {
                _v.copy(this.controls.target)
                this.controls.target.clamp(minPan, maxPan)
                _v.sub(this.controls.target)
                this.camera.position.sub(_v)
            }
        })

        this.controls.addEventListener("end", () => {
            // this.mouseDown = false
            dragForce = 0
            this.isDragging = false
        })

        window.addEventListener("pointerup", this.mouseup)
    }

    mouseup = () => {
        dragForce = 0
        this.mouseDown = false
        this.isDragging = false
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
        if (!this.gameEnded) {
            Skeleton.transitionOut(this.progress, this.controls)
            Clipboard.nextTexture(this.progress)
        }
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
                value: 1
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

    log() {
        console.log(this.camera.position.x, this.camera.position.y, this.camera.position.z)
    }

    gameState(state: string, cond: boolean) {
        switch (state) {
            case "timerCanStart":
                this.gameRunning = true
                this.controls.enabled = true
                break
            case "timerPause":
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
                this.goodAnswers++

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
        console.log("ai used")
        console.log(Skeleton.errorMesh)

        if (Skeleton.errorMesh) {
            const mat = Skeleton.errorMesh.material as THREE.ShaderMaterial
            mat.uniforms.uFresnelColor.value = new THREE.Color("#FF0000")

            gsap.to(mat.uniforms.uFresnelWidth, {
                value: params.fresnelIntensity,
                duration: 1,
                yoyo: true,
                repeat: -1
            })

            this.aiUsed++
            this.controls.enableDamping = false
            this.controls.enabled = false
            this.controls.autoRotate = true

            console.log("AI USED")

            gsap.to(this.controls.target, {
                duration: 1.5,
                y: AI_CAMERA_VALUES[this.progress],
                onComplete: () => {
                    this.controls.enabled = true
                    this.controls.autoRotate = false
                    this.controls.enableDamping = true
                }
            })

            gsap.to(this.camera.position, {
                duration: 1.5,
                y: AI_CAMERA_VALUES[this.progress],
                z: 4
            })
        }
    }

    endGame() {
        this.gameEnded = true

        console.log("END OF THE GAME")
        console.log("AI was used", this.aiUsed, "times")
        console.log("You processed", this.progress, "files")
        console.log("Your diagnosis was right", this.goodAnswers, "times")

        const results = {
            AIused: this.aiUsed,
            processedFiles: this.progress,
            goodAnswers: this.goodAnswers
        }

        store.commit("setResults", results)

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
                console.log("skeleton remove")
                raf.unsubscribe("radioUpdate")
                router.push('10')
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
            value: 1
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
            value: 1
        })
    }

    update = () => {
        this.updateRenderTarget()
        const delta = this.clock.getDelta()

        this.controls.update()

        if (Skeleton.loaded) {
            if (this.gameRunning) {
                if (!Skeleton.isAnimating && !this.patientFileOpened) {
                    if (!this.isDragging) {
                        this.raycaster.setFromCamera(this.mouse, this.camera)
                        const intersects = this.raycaster.intersectObjects(
                            Skeleton.skeletons[this.progress].children,
                            true
                        )

                        if (intersects.length) {
                            if (
                                this.currentIntersect &&
                                this.currentIntersect.object !== intersects[0].object
                            )
                                this.fromMeshToMesh()
                            this.onMesh(delta, intersects[0])
                        } else {
                            if (this.currentIntersect) this.fromMeshToBlank()
                            this.currentIntersect = null
                            coef = 0
                        }
                    } else {
                        if (this.currentIntersect) {
                            //on drag, if current intersect is defined, make it unselect and put it to null
                            this.currentIntersect.object.material.uniforms.uFresnelWidth.value = 1
                            this.currentIntersect = null
                        }
                    }
                }
            }
        }
    }
}
