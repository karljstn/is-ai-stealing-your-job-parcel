import * as THREE from "three"
import Tweakpane from "tweakpane"

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import raf from '~three/Singletons/RAF'
import store from '~/store'

import { ThreeGroup } from "~/interfaces/Three"

// import { normalize } from '~/util'
import { SKELETONS } from '~/constants/SKELETONS'
import { MODELS } from '~/constants/MODELS'
import LoadManager from '~/three/Singletons/LoadManager'
// import { Bounce } from 'gsap'

// import { Text } from 'troika-three-text'

import fragment from "~/shaders/radiologist/skeleton/fragment.glsl"
import vertex from "~/shaders/radiologist/skeleton/vertex.glsl"

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

    ratio: number

    raycaster: THREE.Raycaster
    mouse: THREE.Vector2
    camera: THREE.PerspectiveCamera
    controls: OrbitControls

    selectedObjects: THREE.Object3D[]
    mouseCoords: THREE.Vector2

    loader: GLTFLoader
    textureLoader: THREE.TextureLoader
    bakedTexture: THREE.Texture

    bakedMaterial: THREE.MeshBasicMaterial

    // text: Text

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
    isReady: boolean

    progress: number

    constructor(camera: THREE.PerspectiveCamera, raycaster: THREE.Raycaster, mouse: THREE.Vector2, controls: OrbitControls, pane: Tweakpane | null) {
        this.group = new THREE.Group()
        this.meshesGroup = new THREE.Group()

        this.skeleton = new THREE.Group()
        this.clipboard = new THREE.Group()

        this.heart = null
        this.heartBaseScale = null

        this.controls = controls

        this.controls.enablePan = false

        this.raycaster = raycaster
        this.camera = camera
        this.mouse = mouse

        this.selectedObjects = []
        this.currentIntersect = null
        this.mouseCoords = new THREE.Vector2()


        this.errorMesh = null
        this.selectedMesh = null

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

        this.ratio = (window.innerWidth * 0.82) / (window.innerHeight * 0.71)

        this.loader = new GLTFLoader(LoadManager.manager)

        this.textureLoader = new THREE.TextureLoader(LoadManager.manager)
        this.bakedTexture = this.textureLoader.load(SKELETONS.SKELETON2.BAKE)
        this.bakedTexture.flipY = false
        // this.bakedTexture.encoding = THREE.sRGBEncoding



        // console.log(this.bakedTexture)


        // this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture })

        this.loader.load(SKELETONS.SKELETON2.URL, (gltf) => {
            this.skeleton = gltf.scene
            this.skeleton.scale.set(SKELETONS.SKELETON2.SCALE, SKELETONS.SKELETON2.SCALE, SKELETONS.SKELETON2.SCALE)
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



        const geoForeground = new THREE.PlaneBufferGeometry(2, 2)
        const matForeground = new THREE.ShaderMaterial({
            uniforms: {
                size: { value: new THREE.Vector2(0.82, 0.78) },
                ratio: { value: this.ratio },
                pi: { value: Math.PI }
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

    onResize() {
        console.log('here')

        this.ratio = (window.innerWidth * 0.82) / (window.innerHeight * 0.71)
        const mat = this.foreground.material as THREE.ShaderMaterial

        mat.uniforms.ratio.value = this.ratio
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
        console.log('next case')

        this.skeleton.traverse(obj => {

            if (obj.type === 'Mesh') {
                const mesh = obj as THREE.Mesh
                // mesh.material = this.bakedMaterial
                mesh.material = new THREE.ShaderMaterial({
                    vertexShader: vertex,
                    fragmentShader: fragment,
                    transparent: true,

                    uniforms: {
                        baseColor: { value: new THREE.Vector3(1, 0, 0) },
                        outline: { value: 0.5 },
                        isError: { value: 0 },
                        baseTex: { value: this.bakedTexture }
                    }
                })


                if (mesh.name === "<3") {
                    this.heart = mesh
                    this.heartBaseScale = mesh.scale.x

                    // const mat = mesh.material as THREE.ShaderMaterial

                    // mat.uniforms.baseColor.value = new THREE.Vector3(0.3, 0, 1)
                    // mat.uniforms.isError.value = 1

                    this.errorMesh = mesh
                    console.log('ERROR MESH SET')
                }

            }
            this.isReady = true
        })
    }

    confirm = (res: boolean) => {

        console.log('confirm?', res)

        console.log(this.selectedMesh)
        console.log(this.errorMesh)



        //confirm the mesh
        if (res) {
            if (this.selectedMesh === this.errorMesh) {
                this.errorMesh = null
                this.selectedMesh = null
                // this.currentIntersect = null

                this.nextCase()

                console.log('RADIOLOGIST GAME : GOOD ANSWER')
            } else {
                //wrong
                console.log('RADIOLOGIST GAME: WRONG ANSWER')
                // console.log(this.currentIntersect.object)


            }

            if (this.progress === 3) {
                this.endGame()
                return
            }

            this.progress++
            store.commit('updateProgress', this.progress)


        } else {
            //get back to the selection

        }


        store.commit('setConfirmPopup', false)

    }

    click() {
        if (this.currentIntersect && !store.state.radiologist.confirm) {

            //clicked on something, show popup
            store.commit('setConfirmPopup', true)
            store.commit('setConfirmCallback', this.confirm)

            this.selectedMesh = this.currentIntersect.object


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
        this.progress++
        store.commit('updateProgress', this.progress)

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

    heartbeat() {
        if (this.heart && this.heartBaseScale) {
            this.heart.scale.set(
                this.heartBaseScale + (Math.sin(Date.now() / 200) + 1) / 22,
                this.heartBaseScale + (Math.sin(Date.now() / 200) + 1) / 22,
                this.heartBaseScale + (Math.sin(Date.now() / 200) + 1) / 22,
            )
        }
    }

    update = () => {
        if (!this.isDragging && this.isReady) {
            this.raycaster.setFromCamera(this.mouse, this.camera)


            const intersects = this.raycaster.intersectObjects(this.skeleton.children, true)


            if (intersects.length) {
                if (this.currentIntersect && this.currentIntersect.object !== intersects[0].object) {

                    // this.currentIntersect.object.material.uniforms.outline.value = 0.5
                    // this.currentIntersect = intersects[0]
                    // this.currentIntersect.object.material.uniforms.outline.value = 1
                }

                this.currentIntersect = intersects[0]
                // this.currentIntersect.object.material.uniforms.outline.value = 1

            } else {
                if (this.currentIntersect) {
                    // this.currentIntersect.object.material.uniforms.outline.value = 0.5
                }

                this.currentIntersect = null
            }


        }

        this.heartbeat()

    }
}
