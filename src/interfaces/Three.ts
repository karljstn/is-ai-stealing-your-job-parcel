import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export interface ThreeObject {
  object3d: THREE.Object3D;
  update(dt: number): void;
}

export interface ThreeMesh extends ThreeObject {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  object3d: THREE.Object3D;
  update(dt: number): void;
}

export interface ThreeGroup {
  group: THREE.Group;
  update(dt: number): void;
}

export interface ThreeGLTF {
  group: THREE.Group | null
  loader: GLTFLoader
  load(): void
  start(): void
  update(dt: number): void
  destroy(): void
}

export interface ThreeScene {
  start(): void
  tweaks(): void
  update(dt: number): void
}