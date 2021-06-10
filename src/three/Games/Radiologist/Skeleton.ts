import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import LoadManager from "~/three/Singletons/LoadManager"
import raf from "~singletons/RAF"

import { RADIOLOGIST } from "~constants/RADIOLOGIST"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import gsap from "gsap"

import fragment from "~/shaders/radiologist/skeleton/fragment.glsl"
import vertex from "~/shaders/radiologist/skeleton/vertex.glsl"

class Skeleton {
    gltfLoader: GLTFLoader
    textureLoader: THREE.TextureLoader
    skeletonScene: THREE.Scene

    skeletons: THREE.Group[]
    textures: THREE.Texture[]

    material: THREE.ShaderMaterial

    progress: number
    loaded: boolean

    wrongAI2: THREE.Mesh | null
    wrongAI5: THREE.Mesh | null

    errorsNames: string[]
    skeletonsInfos: any
    currentSkeleton: any

    isAnimating: boolean

    uniforms: any

    errorMesh: THREE.Mesh | null
    heart: THREE.Mesh
    heartBaseScale: number

    constructor() {
        this.gltfLoader = new GLTFLoader(LoadManager.manager)
        this.textureLoader = new THREE.TextureLoader(LoadManager.manager)
        this.skeletonScene = new THREE.Scene()

        this.loaded = false
        this.isAnimating = false

        this.skeletons = []
        this.textures = []

        this.progress = 0

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                ...this.uniforms,
                uFresnelColor: { value: new THREE.Color("#fff") },
                uFresnelWidth: { value: 1 }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true
        })

        this.errorsNames = ["Simple_Pen_Cylinder007", "intestins", "CISEAUX", "vertebre_2", "Rib_L_3"]
        this.skeletonsInfos = [
            RADIOLOGIST.SKELETON1,
            RADIOLOGIST.SKELETON2,
            RADIOLOGIST.SKELETON3,
            RADIOLOGIST.SKELETON4,
            RADIOLOGIST.SKELETON5
        ]
        this.currentSkeleton = null

        this.uniforms = {
            uMap: {
                value: null
            },
            uAlpha: {
                value: 0
            }
        }

        this.errorMesh = null
        this.heart = new THREE.Mesh()
        this.heartBaseScale = 1
    }

    init(skeletonScene: THREE.Scene) {
        this.skeletonScene = skeletonScene
        this.loadModels(0)
    }

    loadModels(i: number) {
        this.gltfLoader.load(this.skeletonsInfos[i].URL, gltf => {
            this.skeletons[i] = gltf.scene
            this.skeletons[i].scale.set(
                this.skeletonsInfos[i].SCALE,
                this.skeletonsInfos[i].SCALE,
                this.skeletonsInfos[i].SCALE
            )

            if (i === 3) {
                this.skeletons[i].rotation.y = -Math.PI / 2
            }



            this.textureLoader.load(this.skeletonsInfos[i].BAKE, texture => {
                texture.flipY = false
                this.textures.push(texture)

                if (i < 4) {
                    this.loadModels(i + 1)
                } else {
                    this.loaded = true
                    console.log("SKELETON AND TEXTURES LOADED")
                    this.nextSkeleton(0)
                }
            })
        })
    }

    transitionIn(elem: THREE.Group) {
        elem.position.y = 20
        gsap.to(elem.position, {
            duration: 0.5,
            y: 0
        })

        gsap.to(this.uniforms.uAlpha, {
            duration: 0.5,
            value: 1
        })
    }

    transitionOut(progress: number, controls: OrbitControls) {
        this.isAnimating = true
        gsap.to(this.currentSkeleton.position, {
            duration: 0.5,
            y: -20,
            onComplete: () => {
                setTimeout(() => {

                    controls.reset()
                    this.nextSkeleton(progress)
                }, 1500)
            }
        })

        gsap.to(this.uniforms.uAlpha, {
            duration: 0.5,
            value: 0
        })
    }

    nextSkeleton(progress: number) {
        this.progress = progress

        if (this.progress !== 0) raf.unsubscribe("heartbeat")


        this.errorMesh = null
        this.skeletonScene.remove(this.currentSkeleton)

        this.currentSkeleton = this.skeletons[this.progress]
        this.uniforms.uMap.value = this.textures[this.progress]

        const group = this.skeletons[this.progress] as THREE.Group
        group.traverse(obj => {
            if (obj.type === "Mesh") {
                const mesh = obj as THREE.Mesh
                mesh.material = this.getShader()

                if (mesh.name === this.errorsNames[this.progress]) {
                    this.errorMesh = mesh
                }

                if (this.progress === 1 && mesh.name === 'colon') {
                    this.wrongAI2 = mesh

                }
                if (this.progress === 4 && mesh.name === 'vertebre_3') {
                    this.wrongAI5 = mesh
                }

                if (mesh.name === "<3") {
                    this.heart = mesh
                    this.heartBaseScale = mesh.scale.x

                    raf.subscribe("heartbeat", this.heartbeat)
                }
            }
        })

        this.isAnimating = false

        if (this.progress > 0) {
            this.skeletonScene.add(this.currentSkeleton)
            this.transitionIn(this.currentSkeleton)
            console.log("skeleton add")
        }
    }

    addFirstSkeleton() {
        this.skeletonScene.add(this.skeletons[0])
        this.transitionIn(this.skeletons[0])
    }

    getShader() {
        return new THREE.ShaderMaterial({
            uniforms: {
                ...this.uniforms,
                uFresnelColor: { value: new THREE.Color("#fff") },
                uFresnelWidth: { value: 1 }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true
        })
    }

    heartbeat = () => {
        this.heart.scale.set(
            this.heartBaseScale +
            (Math.sin(Date.now() / 200) + 1) / this.skeletonsInfos[this.progress].HEART_SCALE,
            this.heartBaseScale +
            (Math.sin(Date.now() / 200) + 1) / this.skeletonsInfos[this.progress].HEART_SCALE,
            this.heartBaseScale +
            (Math.sin(Date.now() / 200) + 1) / this.skeletonsInfos[this.progress].HEART_SCALE
        )
    }
}

const instance = new Skeleton()
export default instance
