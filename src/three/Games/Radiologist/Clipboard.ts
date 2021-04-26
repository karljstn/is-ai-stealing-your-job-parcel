import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import LoadManager from "~/three/Singletons/LoadManager"

import { RADIOLOGIST } from "~constants/RADIOLOGIST"

import fragment from "~/shaders/radiologist/clipboard/fragment.glsl"
import vertex from "~/shaders/radiologist/clipboard/vertex.glsl"

class Clipboard {
    gltfLoader: GLTFLoader
    textureLoader: THREE.TextureLoader

    mesh: THREE.Group
    material: THREE.ShaderMaterial

    constructor() {
        this.mesh = new THREE.Group()

        this.gltfLoader = new GLTFLoader(LoadManager.manager)
        this.textureLoader = new THREE.TextureLoader(LoadManager.manager)

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                size: { value: new THREE.Vector2(1, 1) },
                baseTex: { value: null }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
        })

    }

    load(group: THREE.Group, progress: number) {
        this.gltfLoader.load(RADIOLOGIST.CLIPBOARD.URL, gltf => {

            this.mesh = gltf.scene
            this.mesh.scale.set(
                RADIOLOGIST.CLIPBOARD.SCALE,
                RADIOLOGIST.CLIPBOARD.SCALE,
                RADIOLOGIST.CLIPBOARD.SCALE
            )

            this.applyTexture(group, progress)
        })
    }

    applyTexture(group: THREE.Group, progress: number) {
        const texture = this.textureLoader.load(RADIOLOGIST.CLIPBOARD.BAKE)
        texture.flipY = false

        this.material.uniforms.baseTex.value = texture
        const uniforms = this.material.uniforms

        this.mesh.traverse(obj => {
            if (obj.type === "Mesh") {
                const mesh = obj as THREE.Mesh
                mesh.material = this.material.clone()

                const material = mesh.material as THREE.ShaderMaterial
                material.uniforms = uniforms
            }
        })

        group.add(this.mesh)
    }

    nextCase() {

    }

    update() {

    }
}


const instance = new Clipboard()
export default instance