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
import router from "~router"

let coef = 0

const params = {
    //2 is 0.5 seconds
    fresnelSpeed: 4,

    fresnelIntensity: 0.3
}

export default class Radio implements ThreeGroup {
    group: THREE.Group

    raycaster: THREE.Raycaster
    mouse: THREE.Vector2
    camera: THREE.PerspectiveCamera
    controls: OrbitControls

    selectedObjects: THREE.Object3D[]

    renderTarget: THREE.WebGLRenderTarget

    selectedMesh: null | THREE.Mesh

    currentIntersect: any
    mouseDown: boolean
    isDragging: boolean

    skeletonScene: THREE.Scene
    renderer: any
    progress: number

    clock: THREE.Clock

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

        this.renderer = renderer
        this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight)

        // this.controls.enablePan = false

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





        this.controls.addEventListener("start", () => {
            this.mouseDown = true
        })

        this.controls.addEventListener("change", () => {
            if (this.mouseDown) {
                this.isDragging = true

                if (this.currentIntersect) {
                    console.log('allo')

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


        // this.init()
    }

    init() {
        // this.camera.position.set(0, 0, 20)
        raf.subscribe("radioUpdate", this.update)
        this.group.add(Background.mesh)
        Foreground.init(this.renderTarget, this.renderer.getPixelRatio())
        this.group.add(Foreground.mesh)
        Skeleton.load(this.skeletonScene, this.progress)
        // Clipboard.load(this.group, this.progress)
    }

    nextCase() {
        // this.camera.position.set(0, 0, 20)
        Skeleton.load(this.skeletonScene, this.progress)
        // Clipboard.load(this.group, this.progress)
    }

    onResize() {
        Foreground.onResize(this.renderer.getPixelRatio())
        this.renderTarget.setSize(window.innerWidth, window.innerHeight)
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
        if (res) {
            this.progress++
            store.commit("updateProgress", this.progress)

            if (this.progress === 5) {
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
        if (Skeleton.errorMesh) {
            const mat = Skeleton.errorMesh.material as THREE.ShaderMaterial
            mat.uniforms.uFresnelColor.value = new THREE.Color("#FF0000")

            gsap.to(mat.uniforms.uFresnelWidth, {
                value: params.fresnelIntensity,
                duration: 0.25
            })

        }
    }

    endGame() {
        gsap.to(Skeleton.mesh.position, {
            y: -30,
            duration: 1,
            onComplete: () => {
                // store.commit("incrementProgression")
                // this.meshesGroup.clear()

                // this.group.remove(this.skeleton)
                // this.group.remove(this.clipboard)

                router.push('10')
                this.camera.position.z = 1
            }
        })
    }

    updateRenderTarget() {
        this.renderer.setRenderTarget(this.renderTarget)
        this.renderer.render(this.skeletonScene, this.camera)
        this.renderer.setRenderTarget(null)
    }


    update = () => {

        this.updateRenderTarget()
        this.controls.update()

        const delta = this.clock.getDelta()

        if (!this.isDragging) {
            this.raycaster.setFromCamera(this.mouse, this.camera)


            const intersects = this.raycaster.intersectObjects(Skeleton.mesh.children, true)

            if (intersects.length) {


                if (this.currentIntersect && this.currentIntersect.object !== intersects[0].object) {

                    // ÉTAIT SUR UN MESH AVANT, VIENT DE CHANGER DE MESH
                    // DONC SI CHANGEMENT DE MESH, RESET LE VISUEL DE L'ANCIEN

                    coef = 0
                    gsap.to(this.currentIntersect.object.material.uniforms.uFresnelWidth, {
                        duration: 0.25,
                        value: 1,
                    })

                }


                // EST SUR UN MESH
                this.currentIntersect = intersects[0]
                if (coef < params.fresnelIntensity) {
                    coef += delta * params.fresnelSpeed
                    this.currentIntersect.object.material.uniforms.uFresnelWidth.value = 1 - coef
                }




            } else {
                if (this.currentIntersect) {
                    //FROM MESH TO NOTHING

                    gsap.to(this.currentIntersect.object.material.uniforms.uFresnelWidth, {
                        duration: 0.25,
                        value: 1,
                    })
                }

                coef = 0
                this.currentIntersect = null
            }
        }
    }
}
