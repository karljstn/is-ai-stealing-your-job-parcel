import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import LoadManager from '~/three/Singletons/LoadManager'
import { MODELS } from '~/constants/MODELS'
import { Mesh, MeshBasicMaterial, Scene, TextureLoader } from "three"
import { ThreeGLTF } from "~interfaces/Three"

class TrashcanBake {
  params: { animSpeed: number, size: number }
  size: number
  scene: Scene
  group: THREE.Group | null
  loader: GLTFLoader

  constructor(size: number, scene: Scene) {
    this.params = {
      animSpeed: 0.005,
      size: size * MODELS.BAKED_TRASHCAN.SCALE
    }
    this.size = size
    this.scene = scene
    this.group = null
    this.loader = new GLTFLoader(LoadManager.manager)
  }

  load = () => {
    this.loader.load(MODELS.BAKED_TRASHCAN.URL, (gltf) => {
      this.group = gltf.scene
      this.group.traverse((obj) => {
        const mesh = obj as Mesh;
        const texture = new TextureLoader().load(MODELS.BAKED_TRASHCAN.TEXTURE ? MODELS.BAKED_TRASHCAN.TEXTURE : "")
        texture.flipY = false
        mesh.material = new MeshBasicMaterial({ map: texture })

      })
      this.group.scale.set(this.params.size, this.params.size, this.params.size)
    })
  }

  start = () => { }

  update = (dt: number) => { }

  destroy = () => {
    this.group && this.scene.remove(this.group)
  }
}

export default TrashcanBake

