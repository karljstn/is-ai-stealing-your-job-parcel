import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import LoadManager from "~/three/Singletons/LoadManager"

import raf from "~three/Singletons/RAF"

import { RADIOLOGIST } from "~constants/RADIOLOGIST"

import fragment from "~/shaders/radiologist/clipboard/fragment.glsl"
import vertex from "~/shaders/radiologist/clipboard/vertex.glsl"

class Clipboard {
    gltfLoader: GLTFLoader
    textureLoader: THREE.TextureLoader

    texturesArray: string[]

    mesh: THREE.Group
    material: THREE.ShaderMaterial

    constructor() {
        this.mesh = new THREE.Group()

        this.gltfLoader = new GLTFLoader(LoadManager.manager)
        this.textureLoader = new THREE.TextureLoader(LoadManager.manager)

        this.texturesArray = [
            RADIOLOGIST.CLIPBOARD.BAKE1,
            RADIOLOGIST.CLIPBOARD.BAKE2,
            RADIOLOGIST.CLIPBOARD.BAKE3,
            RADIOLOGIST.CLIPBOARD.BAKE4,
            RADIOLOGIST.CLIPBOARD.BAKE5,
        ]

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uSize: { value: new THREE.Vector2(1, 1) },
                uMap: { value: null },
                uAlpha: { value: 0 }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true
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

            this.mesh.rotation.y = Math.PI / 2

            this.mesh.position.set(10, -2, 0)

            this.nextTexture(progress)
            group.add(this.mesh)
        })
    }

    nextTexture(progress: number) {
        const texture = this.textureLoader.load(this.texturesArray[progress])
        texture.flipY = false

        this.material.uniforms.uMap.value = texture

        this.mesh.traverse(obj => {
            if (obj.type === "Mesh") {
                const mesh = obj as THREE.Mesh
                mesh.material = this.material
            }
        })
    }

}


const instance = new Clipboard()
export default instance