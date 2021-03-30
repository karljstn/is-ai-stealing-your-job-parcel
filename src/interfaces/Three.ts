export interface ThreeObject {
  object3d: THREE.Object3D
  update(dt: number): void
}

export interface ThreeMesh extends ThreeObject {
  geometry: THREE.BufferGeometry
  material: THREE.Material
  object3d: THREE.Object3D
  update(dt: number): void
}

export interface ThreeGroup {
  group: THREE.Group
  update(dt: number): void
}