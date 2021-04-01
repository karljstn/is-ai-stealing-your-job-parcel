import * as THREE from "three"
import Tweakpane from "tweakpane"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import raf from '~three/Singletons/RAF'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import store from '~/store'
import { ThreeGroup } from "~/interfaces/Three"

import { MODELS } from '~/constants/MODELS'
import LoadManager from '~/three/Singletons/LoadManager'

import { Bounce } from 'gsap'

// import { Text } from 'troika-three-text'

import fragment from "~/shaders/fresnel/fragment.glsl"
import vertex from "~/shaders/fresnel/vertex.glsl"

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

    raycaster: THREE.Raycaster
    mouse: THREE.Vector2
    camera: THREE.PerspectiveCamera
    controls: OrbitControls

    selectedObjects: THREE.Object3D[]
    mouseCoords: THREE.Vector2

    loader: GLTFLoader

    // text: Text

    errorMesh: null | THREE.Mesh

    skull: THREE.Group
    clipboard: THREE.Group

    currentIntersect: any
    boxGeometry: THREE.DodecahedronGeometry
    boxMeshes: THREE.Mesh[]
    mouseDown: boolean
    isDragging: boolean
    isReady: boolean

    progress: number

    constructor(camera: THREE.PerspectiveCamera, raycaster: THREE.Raycaster, mouse: THREE.Vector2, controls: OrbitControls, pane: Tweakpane | null) {
        this.group = new THREE.Group()
        this.meshesGroup = new THREE.Group()

        this.skull = new THREE.Group()
        this.clipboard = new THREE.Group()

        this.controls = controls

        this.raycaster = raycaster
        this.camera = camera
        this.mouse = mouse

        this.selectedObjects = []
        this.currentIntersect = null
        this.mouseCoords = new THREE.Vector2()

        this.boxGeometry = new THREE.DodecahedronGeometry(1, 1)
        this.boxMeshes = []

        this.errorMesh = null

        this.progress = 0
        this.isReady = false

        // this.text = new Text()
        // this.text.text = 'Hello world!'
        // this.text.fontSize = 0.2
        // this.text.position.z = -2
        // this.text.color = 0x9966FF

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



        this.loader = new GLTFLoader(LoadManager.manager)

        this.loader.load(MODELS.SKULL.URL, (gltf) => {
            this.skull = gltf.scene
            this.skull.scale.set(MODELS.SKULL.SCALE, MODELS.SKULL.SCALE, MODELS.SKULL.SCALE)
            this.group.add(this.skull)

            this.nextCase()
        })

        this.loader.load(MODELS.CLIPBOARD.URL, (gltf) => {

            this.clipboard = gltf.scene
            this.clipboard.scale.set(MODELS.CLIPBOARD.SCALE, MODELS.CLIPBOARD.SCALE, MODELS.CLIPBOARD.SCALE)
            this.clipboard.rotation.x = Math.PI / 2
            this.clipboard.position.x = 20

            this.group.add(gltf.scene)




        })

        // this.group.add(this.text)

    }

    patientFile(cond: Boolean) {

        if (cond) {
            gsap.to(this.skull.position, {
                duration: 0.5,
                x: -10,
                z: -10
            })
            gsap.to(this.meshesGroup.position, {
                duration: 0.5,
                x: -10,
                z: -10
            })
            gsap.to(this.clipboard.position, {
                duration: 0.5,
                x: 2.5,
            })
        } else {
            gsap.to(this.skull.position, {
                duration: 0.5,
                x: 0,
                z: 0

            })
            gsap.to(this.meshesGroup.position, {
                duration: 0.5,
                x: 0,
                z: 0

            })
            gsap.to(this.clipboard.position, {
                duration: 0.5,
                x: 20,
            })
        }

    }

    nextCase() {

        this.meshesGroup.clear()
        this.boxMeshes = []


        for (let i = 0; i < 30; i++) {
            const boxMaterial = new THREE.ShaderMaterial({
                vertexShader: vertex,
                fragmentShader: fragment,
                transparent: true,
                uniforms: {
                    baseColor: { value: new THREE.Vector3(1, 0, 0) },
                    outline: { value: 0.5 },
                    isError: { value: 0 }
                }
            })


            if (i === 0) {
                boxMaterial.uniforms.baseColor.value = new THREE.Vector3(0.3, 0, 0)
                boxMaterial.uniforms.isError.value = 1

            }

            const mesh = new THREE.Mesh(this.boxGeometry, boxMaterial)

            if (i === 0) {
                this.errorMesh = mesh
                console.log('error mesh set')

            }

            this.boxMeshes.push(mesh)


            this.boxMeshes[i].position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
            )


            this.meshesGroup.add(this.boxMeshes[i])
            this.isReady = true
        }
        this.group.add(this.meshesGroup)
    }

    click() {
        if (this.progress === 3) {
            this.endGame()
            return
        }

        console.log(this.currentIntersect.object.id)
        console.log(this.errorMesh?.id)

        if (this.currentIntersect && this.currentIntersect.object == this.errorMesh) {
            this.errorMesh = null
            this.currentIntersect = null

            this.progress++
            store.commit('updateCount', this.progress)

            this.nextCase()

        } else {
            console.log('non')

        }
    }

    useAI() {
        if (this.errorMesh) {
            gsap.to(this.errorMesh.material.uniforms.baseColor.value, {
                x: 1,
                y: 1,
                z: 1
            })
        }
    }

    endGame() {
        gsap.to(this.group.position, {
            y: -30,
            duration: 1,
            onComplete: () => {
                store.commit('incrementProgression')
                this.meshesGroup.clear()

                this.group.remove(this.skull)
                this.group.remove(this.clipboard)

                this.camera.position.z = 1
            }
        })



    }


    update = (dt = 0) => {
        if (!this.isDragging && this.isReady) {
            this.raycaster.setFromCamera(this.mouse, this.camera)
            const intersects = this.raycaster.intersectObjects(this.meshesGroup.children)


            if (intersects.length) {
                if (this.currentIntersect && this.currentIntersect.object !== intersects[0].object) {
                    this.currentIntersect.object.material.uniforms.outline.value = 0.5
                    this.currentIntersect = intersects[0]
                    this.currentIntersect.object.material.uniforms.outline.value = 1
                }

                // console.log(this.currentIntersect?.object.id)
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
