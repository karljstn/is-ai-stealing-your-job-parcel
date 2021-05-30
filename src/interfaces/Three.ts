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

export interface InitGLTF {
  rectElement?: HTMLElement;
  onRect?: onRect;
}

export interface ThreeGLTF {
  initRectGLTF({ rectElement, onRect }: InitGLTF): void;
  update(dt: number): void;
  destroy(): void;
}

export interface ViewInterface {
  start({ rectElement, onRect }: InitGLTF): void;
  destroy(): void;
}
