import * as THREE from "three"
import Tweakpane from "tweakpane"
import raf from '~three/Singletons/RAF'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import store from '~/store'
import { ThreeGroup } from "~/interfaces/Three"
// import radio from "~/assets/homer.jpg"

import fragment from "~/shaders/fresnel/fragment.glsl"
import vertex from "~/shaders/fresnel/vertex.glsl"

// import gsap from "gsap"

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

    selectedObjects: THREE.Object3D[]
    mouseCoords: THREE.Vector2

    currentIntersect: any
    boxGeometry: THREE.DodecahedronGeometry
    boxMeshes: THREE.Mesh[]
    mouseDown: boolean
    isDragging: boolean
    isReady: boolean

    progress: number

    constructor(camera: THREE.PerspectiveCamera, raycaster: THREE.Raycaster, mouse: THREE.Vector2, controls: OrbitControls, pane: Tweakpane | null) {
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

        this.update()
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
            this.progress++
            this.nextCase()
        }
    }

    endGame() {
        store.commit('incrementProgression')

        for (let i = 0; i < 30; i++) {
            this.group.remove(this.boxMeshes[i])
        }

        this.camera.position.z = 1
    }

    // clear() {
    //     console.log('here clear')

    //     raf.unsubscribe('radioUpdate')
    // }

    update = (dt = 0) => {
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

    }
}
