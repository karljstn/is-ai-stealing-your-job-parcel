import * as THREE from "three"

export default class Cube extends THREE.Mesh {
  constructor(size: number) {
    super()

    this.geometry = new THREE.BoxBufferGeometry(size, size, size)
    this.material = new THREE.MeshNormalMaterial()
    this.userData.name = "Cube"
  }

  destroy() {
    this.geometry.dispose()
  }

  update() {
    this.rotation.x += 0.01
    this.rotation.z += 0.01
  }
}
