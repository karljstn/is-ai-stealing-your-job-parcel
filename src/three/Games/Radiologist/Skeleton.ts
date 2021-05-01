import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import LoadManager from "~/three/Singletons/LoadManager"
import raf from "~three/Singletons/RAF"

import { ThreeGroup } from "~/interfaces/Three"

import { RADIOLOGIST } from "~constants/RADIOLOGIST"

import gsap from "gsap"
import { Tween } from "~lib/gsap-member/src/gsap-core"

import { MeshSurfaceSampler } from "three/examples/jsm/Math/MeshSurfaceSampler"

import fragment from "~/shaders/radiologist/skeleton/fragment.glsl"
import vertex from "~/shaders/radiologist/skeleton/vertex.glsl"

const amount = 5000

class Skeleton {
    gltfLoader: GLTFLoader
    textureLoader: THREE.TextureLoader

    mesh: THREE.Group
    material: THREE.ShaderMaterial

    errorsNames: string[]
    skeletons: any
    currentSkeleton: any
    time: any
    distortion: any

    uniforms: any

    errorMesh: THREE.Mesh | null
    heart: THREE.Mesh
    heartBaseScale: number

    constructor() {
        this.gltfLoader = new GLTFLoader(LoadManager.manager)
        this.textureLoader = new THREE.TextureLoader(LoadManager.manager)

        this.mesh = new THREE.Group()

        this.skeletons = [
            RADIOLOGIST.SKELETON1,
            RADIOLOGIST.SKELETON2,
            RADIOLOGIST.SKELETON3,
            RADIOLOGIST.SKELETON4,
            RADIOLOGIST.SKELETON5
        ]

        this.uniforms = {
            uTime: {
                value: 0
            },
            uDistortion: {
                value: 0
            },
            uMap: {
                value: null
            }
        }

        this.errorsNames = ["Simple_Pen_Cylinder007", "intestins", "CISEAUX", "vertèbre 2", "Rib_L_3"]

        this.errorMesh = null
        this.heart = new THREE.Mesh()
        this.heartBaseScale = 1

        this.currentSkeleton = null

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

    applyTexture(skeletonScene: THREE.Scene, progress: number) {
        const texture = this.textureLoader.load(this.currentSkeleton.BAKE)
        texture.flipY = false
        this.uniforms.uMap.value = texture
        console.log(texture)

        this.mesh.traverse(obj => {
            if (obj.type === "Mesh") {
                const mesh = obj as THREE.Mesh
                mesh.material = this.getShader()

                const uvAttr = mesh.geometry.getAttribute("uv")
                const fakeColor = new Float32Array(uvAttr.count * 3)

                for (let i = 0; i < uvAttr.count; i++) {
                    fakeColor[i * 3 + 0] = uvAttr.array[i * uvAttr.itemSize + 0]
                    fakeColor[i * 3 + 1] = uvAttr.array[i * uvAttr.itemSize + 1]
                    fakeColor[i * 3 + 2] = 0
                }
                mesh.geometry.setAttribute("color", new THREE.BufferAttribute(fakeColor, 3))

                const sampler = new MeshSurfaceSampler(mesh).build()
                const geo = new THREE.BufferGeometry()

                const pos = new Float32Array(amount * 3)
                const normal = new Float32Array(amount * 3)
                const color = new Float32Array(amount * 3)

                const positionTarget = new THREE.Vector3()
                const normalTarget = new THREE.Vector3()
                const colorTarget = new THREE.Color()

                for (let i = 0; i < amount; i++) {
                    sampler.sample(positionTarget, normalTarget, colorTarget)

                    pos[i * 3 + 0] = positionTarget.x
                    pos[i * 3 + 1] = positionTarget.y
                    pos[i * 3 + 2] = positionTarget.z

                    color[i * 3 + 0] = colorTarget.r
                    color[i * 3 + 1] = colorTarget.g
                    color[i * 3 + 2] = colorTarget.b

                    normal[i * 3 + 0] = normalTarget.x
                    normal[i * 3 + 1] = normalTarget.y
                    normal[i * 3 + 2] = normalTarget.z
                }

                // console.log(color)
                geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
                geo.setAttribute("color", new THREE.BufferAttribute(color, 3))
                geo.setAttribute("normal", new THREE.BufferAttribute(normal, 3))

                const particle = new THREE.Points(geo, this.getShader())

                skeletonScene.add(particle)

                if (mesh.name === this.errorsNames[progress]) {
                    this.errorMesh = mesh
                }

                if (mesh.name === "<3") {
                    this.heart = mesh
                    this.heartBaseScale = mesh.scale.x

                    raf.subscribe("heartbeat", this.heartbeat)
                }
            }

            // if (obj.type === 'Mesh') {
            //     const mesh = obj as THREE.Mesh
            //     mesh.material = this.getShader()

            //     const point = new THREE.Points(mesh.geometry, mesh.material)
            //     skeletonScene.add(point)
            // }
        })
        // skeletonScene.add(this.mesh)
    }

    tweaks() {}

    nextCase() {}

    heartbeat = () => {
        this.heart.scale.set(
            this.heartBaseScale + (Math.sin(Date.now() / 200) + 1) / this.currentSkeleton.HEART_SCALE,
            this.heartBaseScale + (Math.sin(Date.now() / 200) + 1) / this.currentSkeleton.HEART_SCALE,
            this.heartBaseScale + (Math.sin(Date.now() / 200) + 1) / this.currentSkeleton.HEART_SCALE
        )
    }

    update = () => {
        this.uniforms.uTime.value += 0.001
        // this.uniforms.uDistortion.value += 0.001
    }
}

const instance = new Skeleton()
export default instance
