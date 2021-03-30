import * as THREE from "three"

// import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import store from '~/store'
import { raf } from "rafz"
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

        this.update()



        // setInterval(() => {
        //     console.log(this.currentIntersect)
        // }, 1000)
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
    }



    update(dt = 0) {
        if (!this.isDragging && this.isReady) {
            this.raycaster.setFromCamera(this.mouse, this.camera)
            const intersects = this.raycaster.intersectObjects(this.group.children)



            if (intersects.length) {
                //the mouse is hovering some 3d element
                //can be multiple elements


                if (this.currentIntersect && this.currentIntersect.object !== intersects[0].object) {
                    // intersects[0].object

                    this.currentIntersect.object.material.uniforms.outline.value = 0.5
                    this.currentIntersect = intersects[0]
                    this.currentIntersect.object.material.uniforms.outline.value = 1
                    console.log('changed')


                }

                this.currentIntersect = intersects[0]
                this.currentIntersect.object.material.uniforms.outline.value = 1


            } else {
                if (this.currentIntersect) {
                    this.currentIntersect.object.material.uniforms.outline.value = 0.5
                }
            }

            //     if (this.currentIntersect) {
            //         // console.log('heree')

            //         // gsap.to(this.currentIntersect.object.material.uniforms.outline, {
            //         //     value: 1,
            //         //     duration: 0.5
            //         // })


            //         console.log('setting uniforms to 0.2')
            //         this.currentIntersect.object.material.uniforms.outline.value = 0.2
            //     }


            //     this.currentIntersect = intersects[0]
            //     this.currentIntersect.object.material.uniforms.outline.value = 1
            //     console.log('setting uniforms to 1')



            // } else {
            //     if (this.currentIntersect) {
            //         console.log('out')

            //         console.log('setting uniforms to 0.2')
            //         this.currentIntersect.object.material.uniforms.outline.value = 0.2
            //     }
            //     this.currentIntersect = null

            // }
        }


        raf((dt: number) => this.update(dt))
    }
}



        //mouseover
        // for (const intersect of intersects) {
        //     const mesh: THREE.Mesh = intersect.object as THREE.Mesh
        //     const material: THREE.MeshBasicMaterial = mesh.material as THREE.MeshBasicMaterial

        //     material.color.set('#0000ff')
        //     console.log(intersects[0])
        // }

        // for (const object of this.group.children) {

        //     const mesh: THREE.Mesh = object as THREE.Mesh
        //     const material: THREE.MeshBasicMaterial = mesh.material as THREE.MeshBasicMaterial

        //     if (!intersects.find(intersect => intersect.object === object)) {
        //         material.color.set('#ff0000')
        //     }
        // }

        // console.log(intersects.length)