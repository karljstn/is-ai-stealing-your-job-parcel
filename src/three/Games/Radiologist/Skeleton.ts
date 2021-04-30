import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import LoadManager from "~/three/Singletons/LoadManager"
import raf from "~three/Singletons/RAF"

import { ThreeGroup } from "~/interfaces/Three"

import { RADIOLOGIST } from "~constants/RADIOLOGIST"

import gsap from 'gsap'
import { Tween } from "~lib/gsap-member/src/gsap-core"


import fragment from "~/shaders/radiologist/skeleton/fragment.glsl"
import vertex from "~/shaders/radiologist/skeleton/vertex.glsl"

class Skeleton {
    gltfLoader: GLTFLoader
    textureLoader: THREE.TextureLoader

    mesh: THREE.Group
    material: THREE.ShaderMaterial

    errorsNames: string[]
    skeletons: any
    currentSkeleton: any

    // test: any

    // tweenMap: WeakMap<THREE.Mesh, ReturnType<typeof gsap.to>>

    errorMesh: THREE.Mesh | null
    heart: THREE.Mesh
    heartBaseScale: number

    constructor() {
        this.gltfLoader = new GLTFLoader(LoadManager.manager)
        this.textureLoader = new THREE.TextureLoader(LoadManager.manager)

        this.mesh = new THREE.Group()

        // this.test = []

        this.skeletons = [
            RADIOLOGIST.SKELETON1,
            RADIOLOGIST.SKELETON2,
            RADIOLOGIST.SKELETON3,
            RADIOLOGIST.SKELETON4,
            RADIOLOGIST.SKELETON5,
        ]

        this.errorsNames = [
            'Simple_Pen_Cylinder007',
            'intestins',
            'CISEAUX',
            'vertèbre 2',
            'Rib_L_3'
        ]

        // this.tweenMap = new WeakMap()

        this.errorMesh = null
        this.heart = new THREE.Mesh()
        this.heartBaseScale = 1


        this.currentSkeleton = null

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uFresnelColor: { value: new THREE.Color("#FFFFFF") },
                uFresnelWidth: { value: 1 },
                uMap: { value: null },
                uDistortion: { value: 0 },
                uTime: { value: 0 }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
        })

        raf.subscribe("skeletonUpdate", this.update)
    }


    load(skeletonScene: THREE.Scene, progress: number) {
        raf.unsubscribe("heartbeat")
        skeletonScene.remove(this.mesh)
        this.errorMesh = null

        this.currentSkeleton = this.skeletons[progress]

        this.gltfLoader.load(this.currentSkeleton.URL, gltf => {

            this.mesh = gltf.scene
            this.mesh.scale.set(
                this.currentSkeleton.SCALE,
                this.currentSkeleton.SCALE,
                this.currentSkeleton.SCALE
            )

            this.applyTexture(skeletonScene, progress)
        })
    }

    applyTexture(skeletonScene: THREE.Scene, progress: number) {
        const texture = this.textureLoader.load(this.currentSkeleton.BAKE)
        texture.flipY = false

        this.material.uniforms.uMap.value = texture

        this.mesh.traverse(obj => {
            if (obj.type === "Mesh") {

                // const mesh = obj as THREE.Mesh
                // mesh.material = this.material.clone()

                // const material = mesh.material as THREE.ShaderMaterial
                // material.uniforms = {
                //     uFresnelColor: { value: new THREE.Color("#fff"), },
                //     uFresnelWidth: { value: 1 },
                //     uMap: { value: texture },
                //     uDistortion: { value: 0 },
                //     uTime: { value: 0 }
                // }

                // if (mesh.name === this.errorsNames[progress]) {
                //     this.errorMesh = mesh
                // }

                // if (mesh.name === '<3') {
                //     this.heart = mesh
                //     this.heartBaseScale = mesh.scale.x

                //     raf.subscribe("heartbeat", this.heartbeat)
                // }

                // this.test.push(mesh)


            }


            if (obj.type === 'Mesh') {
                const mesh = obj as THREE.Mesh
                mesh.material = this.material.clone()

                const material = mesh.material as THREE.ShaderMaterial
                material.uniforms = {
                    uFresnelColor: { value: new THREE.Color("#fff"), },
                    uFresnelWidth: { value: 1 },
                    uMap: { value: texture },
                    uDistortion: { value: 0 },
                    uTime: { value: 0 }
                }

                const point = new THREE.Points(mesh.geometry, material)

                skeletonScene.add(point)
            }

        })
        skeletonScene.add(this.mesh)
    }

    tweaks() {

    }

    nextCase() {

    }


    heartbeat = () => {
        this.heart.scale.set(
            this.heartBaseScale + (Math.sin(Date.now() / 200) + 1) / this.currentSkeleton.HEART_SCALE,
            this.heartBaseScale + (Math.sin(Date.now() / 200) + 1) / this.currentSkeleton.HEART_SCALE,
            this.heartBaseScale + (Math.sin(Date.now() / 200) + 1) / this.currentSkeleton.HEART_SCALE
        )
    }


    update = () => {
        // for (let i = 0; i < this.test.length; i++) {
        //     // this.test[i].material.uniforms.uDistortion.value += 0.001
        //     this.test[i].material.uniforms.uTime.value += 0.001

        // }
        // this.material.uniforms.uDistortion.value += 0.001
        // this.material.uniforms.uTime.value += 0.01
    }
}


const instance = new Skeleton()
export default instance