import * as THREE from "three"
import raf from '~/util/raf'
// import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import store from '~/store'
// import { raf } from "rafz"
import { ThreeGroup } from "~/interfaces/Three"
// import radio from "~/assets/homer.jpg"

import fragment from "~/shaders/fresnel/fragment.glsl"
import vertex from "~/shaders/fresnel/vertex.glsl"

import gsap from "gsap"




export default class Radio implements ThreeGroup {
    group: THREE.Group
    // radioGeometry: THREE.PlaneBufferGeometry
    // radioMaterial: THREE.MeshBasicMaterial
    // radioMesh: THREE.Mesh
    // zoomGeometry: THREE.PlaneBufferGeometry
    // zoomMaterial: THREE.ShaderMaterial
    // zoomMesh: THREE.Mesh

    raycaster: THREE.Raycaster
    mouse: THREE.Vector2
    camera: THREE.PerspectiveCamera
    controls: OrbitControls

    // test: Function

    selectedObjects: THREE.Object3D[]
    mouseCoords: THREE.Vector2

    currentIntersect: any
    boxGeometry: THREE.DodecahedronGeometry
    boxMeshes: THREE.Mesh[]
    mouseDown: boolean
    isDragging: boolean
    isReady: boolean

    progress: number

    constructor(camera: THREE.PerspectiveCamera, raycaster: THREE.Raycaster, mouse: THREE.Vector2, controls: OrbitControls) {
        this.group = new THREE.Group()


        this.controls = controls

        this.raycaster = raycaster
        this.camera = camera
        this.mouse = mouse

        this.selectedObjects = []
        this.currentIntersect = null
        this.mouseCoords = new THREE.Vector2()

        this.boxGeometry = new THREE.DodecahedronGeometry(1, 1)
        this.boxMeshes = []

        this.progress = 0
        this.isReady = false

        this.nextCase()

        this.mouseDown = false
        this.isDragging = false

        this.controls.addEventListener('start', () => {
            this.mouseDown = true
        })

        this.controls.addEventListener('change', () => {
            if (this.mouseDown) {
                this.isDragging = true

                if (this.currentIntersect) {
                    this.currentIntersect.object.material.uniforms.outline.value = 0.5
                }
            }
        })

        this.controls.addEventListener('end', () => {
            if (!this.isDragging) {
                this.click()
            } else {
                console.log('dragged')
            }

            this.mouseDown = false
            this.isDragging = false
        })


        raf.subscribe('radioUpdate', this.update)

        this.update = this.update.bind(this)
        this.update()
        console.log('HERE TEST')

        // this.test = this.update


        // setInterval(() => {
        //     console.log(this.currentIntersect)
        // }, 1000)


        // if (module.hot) {
        //     module.hot.dispose(() => {
        //         // module is about to be replaced
        //         console.log('dispose')
        //         raf.cancel(this.update)
        //     })

        //     module.hot.accept(() => {
        //         console.log('accept')

        //         this.update()
        //         // module or one of its dependencies was just updated
        //     })
        // }

    }



    nextCase() {
        for (let i = 0; i < this.group.children.length; i++) {
            this.group.remove(this.boxMeshes[i])
        }

        for (let i = 0; i < 30; i++) {
            const boxMaterial = new THREE.ShaderMaterial({
                vertexShader: vertex,
                fragmentShader: fragment,
                transparent: true,
                uniforms: {
                    outline: { value: 0.5 }
                }
            })

            this.boxMeshes.push(
                new THREE.Mesh(this.boxGeometry, boxMaterial)
            )

            this.boxMeshes[i].position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
            )

            // this.boxMeshes[i].scale.set(
            //     (Math.random() - 0.5) * 10,
            //     (Math.random() - 0.5) * 10,
            //     (Math.random() - 0.5) * 10,
            // )

            this.group.add(this.boxMeshes[i])
            this.isReady = true
        }
    }

    click() {
        if (this.progress === 3) {
            this.endGame()
            return
        }

        if (this.currentIntersect) {
            console.log(this.currentIntersect)

            this.progress++
            this.nextCase()
        }
    }

    endGame() {
        store.commit('incrementProgression')

        for (let i = 0; i < 30; i++) {
            this.group.remove(this.boxMeshes[i])
        }
    }

    clear() {
        console.log('CLEAR THIS MF RAF')

        // raf.cancel(this.test)
    }



    update(dt = 0) {
        // console.log('haaaeaazedazeaere')
        // console.log(this)

        if (!this.isDragging && this.isReady) {



            this.raycaster.setFromCamera(this.mouse, this.camera)
            const intersects = this.raycaster.intersectObjects(this.group.children)

            if (intersects.length) {

                if (this.currentIntersect && this.currentIntersect.object !== intersects[0].object) {
                    this.currentIntersect.object.material.uniforms.outline.value = 0.5
                    this.currentIntersect = intersects[0]
                    this.currentIntersect.object.material.uniforms.outline.value = 1
                }

                this.currentIntersect = intersects[0]
                this.currentIntersect.object.material.uniforms.outline.value = 1

            } else {
                if (this.currentIntersect) {
                    this.currentIntersect.object.material.uniforms.outline.value = 0.5
                }

                this.currentIntersect = null
            }
        }

        // console.log('ab')


        // raf((dt: number) => this.update(dt))
    }


}

