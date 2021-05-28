import { Material } from "three";
import { onRect } from "~types";

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
  initialize(
    rectElement?: HTMLElement,
    onRect?: onRect,
    material?: Material
  ): void;
  update(dt: number): void;
  destroy(): void;
}

export interface ViewInterface {
  start(rectElement?: HTMLElement, onRect?: onRect): void;
  destroy(): void;
}
