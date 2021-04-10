import * as THREE from "three"
import Tweakpane from "tweakpane"

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import raf from '~three/Singletons/RAF'
import store from '~/store'

import { ThreeGroup } from "~/interfaces/Three"

import { normalize } from '~/util'

import { MODELS } from '~/constants/MODELS'
import LoadManager from '~/three/Singletons/LoadManager'
import { Bounce } from 'gsap'

// import { Text } from 'troika-three-text'

import fragment from "~/shaders/fresnel/fragment.glsl"
import vertex from "~/shaders/fresnel/vertex.glsl"

import fragmentForeground from '~/shaders/radiologist/foreground/fragment.glsl'
import vertexForeground from '~/shaders/radiologist/foreground/vertex.glsl'

import fragmentBackground from '~/shaders/radiologist/background/fragment.glsl'
import vertexBackground from '~/shaders/radiologist/background/vertex.glsl'

import fragmentClipboard from '~/shaders/radiologist/clipboard/fragment.glsl'
import vertexClipboard from '~/shaders/radiologist/clipboard/vertex.glsl'
import gsap from "gsap"

export default class Radio implements ThreeGroup {
    group: THREE.Group

    // params: {widthForeground: number, }

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

    skeleton: THREE.Group
    clipboard: THREE.Group
    background: THREE.Mesh
    foreground: THREE.Mesh

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

        this.skeleton = new THREE.Group()
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
                // console.log('USER DRAGGED');
            }

            this.mouseDown = false
            this.isDragging = false
        })

        raf.subscribe('radioUpdate', this.update)

        this.update()



        this.loader = new GLTFLoader(LoadManager.manager)

        this.loader.load(MODELS.SKELETON.URL, (gltf) => {
            this.skeleton = gltf.scene
            this.skeleton.scale.set(MODELS.SKELETON.SCALE, MODELS.SKELETON.SCALE, MODELS.SKELETON.SCALE)
            this.group.add(this.skeleton)


            console.log('SKELETON LOADED')
            console.log(this.skeleton)

            this.nextCase()
        })

        this.loader.load(MODELS.CLIPBOARD.URL, (gltf) => {

            this.clipboard = gltf.scene
            // this.clipboard.scale.set(MODELS.CLIPBOARD.SCALE, MODELS.CLIPBOARD.SCALE, MODELS.CLIPBOARD.SCALE)
            // this.clipboard.rotation.x = Math.PI / 2
            // this.clipboard.position.x = 50

            // console.log('CLIPBOARD LOADED')

            //BILLBOARD

            // this.clipboard.traverse((object3d) => {
            //     const mesh = object3d as THREE.Mesh
            //     if (!mesh.material) return
            //     // const mat = mesh.material as THREE.ShaderMaterial

            //     // mesh.geometry.rotateX(Math.PI/2)
            //     mesh.rotation.x = Math.PI / 2
            //     mesh.updateMatrixWorld()
            //     mesh.geometry.applyMatrix4(mesh.matrix)

            //     mesh.material = new THREE.ShaderMaterial({
            //         fragmentShader: fragmentClipboard,
            //         vertexShader: vertexClipboard,
            //     })
            // })

            // this.group.add(gltf.scene)
        })

        // const test = Math.round(normalize(window.innerWidth * 0.1, window.innerWidth, 0) * 100) / 100

        const geoForeground = new THREE.PlaneBufferGeometry(2, 1.9)
        const matForeground = new THREE.ShaderMaterial({
            uniforms: {
                size: { value: new THREE.Vector2(0.9, 0.9) }
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
            depthTest: false,
            // depthWrite: false
        })

        this.background = new THREE.Mesh(geoBackground, matBackground)
        this.background.renderOrder = -2
        this.foreground = new THREE.Mesh(geoForeground, matForeground)
        this.foreground.renderOrder = -1


        this.group.add(this.foreground)
        this.group.add(this.background)

        // this.tweaks()



    }

    tweaks() {
        if (!store.state.tweakpane) return
        const folder = store.state.tweakpane.addFolder({ title: 'Radio', expanded: true })
        console.log('a')

        // const sizeInput = folder.addInput(this.params, "size", {
        //     label: "Emoji size",
        //     min: this.size * MODELS.EMOJI.SCALE * 0.33,
        //     max: this.size * MODELS.EMOJI.SCALE * 3,
        // })

    }

    patientFile(cond: Boolean) {
        if (cond) {
            gsap.to(this.skeleton.position, {
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
            gsap.to(this.skeleton.position, {
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
                x: 50,
            })
        }

    }

    nextCase() {
        for (let i = 0; i < this.skeleton.children.length; i++) {
            const mesh = this.skeleton.children[i] as THREE.Mesh

            mesh.material = new THREE.ShaderMaterial({
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
                const mat = mesh.material as THREE.ShaderMaterial
                mat.uniforms.baseColor.value = new THREE.Vector3(0.3, 1, 0)
                mat.uniforms.isError.value = 1

                this.errorMesh = mesh
            }
            this.isReady = true

        }
    }

    click() {
        if (this.progress === 3) {
            this.endGame()
            return
        }

        if (this.currentIntersect && this.currentIntersect.object == this.errorMesh) {
            this.errorMesh = null
            this.currentIntersect = null

            this.progress++
            store.commit('updateCount', this.progress)

            this.nextCase()

            console.log('RADIOLOGIST GAME : GOOD ANSWER')


        } else {
            console.log('RADIOLOGIST GAME: WRONG ANSWER')

        }
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
        this.progress++
        store.commit('updateCount', this.progress)

        gsap.to(this.group.position, {
            y: -30,
            duration: 1,
            onComplete: () => {
                store.commit('incrementProgression')
                this.meshesGroup.clear()

                this.group.remove(this.skeleton)
                this.group.remove(this.clipboard)

                this.camera.position.z = 1
            }
        })

    }

    update = () => {
        if (!this.isDragging && this.isReady) {
            this.raycaster.setFromCamera(this.mouse, this.camera)
            const intersects = this.raycaster.intersectObjects(this.skeleton.children)


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
