import { Material, PerspectiveCamera, Scene } from "three";
import { MATERIALS } from "~constants/MATERIALS";
import { InitGLTF, ViewInterface } from "~interfaces/Three";
import { BasedGLTF, TweenedGLTF, MousedGLTF } from "~three/Meshes/GLTF";
import { GLTF_TYPE, onRect, VIEW, Viewport, VIEW_MESH } from "~types";

type ThreeViewConstructor = {
  viewport: Viewport;
  scene: Scene;
  camera: PerspectiveCamera;
  viewData: VIEW;
  rectElement?: HTMLElement;
  onRect?: onRect;
};

class ThreeView implements ViewInterface {
  viewport: Viewport;
  scene: Scene;
  camera: PerspectiveCamera;
  view: VIEW;
  rectElement: HTMLElement;
  onRect: onRect;
  meshes: (BasedGLTF | TweenedGLTF | MousedGLTF)[]

  constructor({
    viewport,
    scene,
    camera,
    viewData,
    rectElement,
    onRect,
  }: ThreeViewConstructor) {
    this.viewport = viewport;
    this.scene = scene;
    this.camera = camera;
    this.view = viewData;
    this.rectElement = rectElement;
    this.onRect = onRect;
    this.meshes = []
  }

  generateMeshFromConstant = (MESH: VIEW_MESH) => {
    const { scene, viewport, rectElement, camera, onRect } = this;
    const { MODEL, MATERIAL } = MESH

    switch (MESH.TYPE) {
      case GLTF_TYPE.BASE:
        return new BasedGLTF({ scene, viewport, camera, MODEL, MATERIAL });

      case GLTF_TYPE.TWEENED:
        return new TweenedGLTF({ scene, viewport, camera, MODEL, MATERIAL });

      case GLTF_TYPE.MOUSED:
        return new MousedGLTF({
          scene,
          viewport,
          camera,
          MODEL,
          MATERIAL,
          rectElement,
          onRect,
        });

      default:
        return null;
    }
  };

  start = ({ rectElement, onRect }: InitGLTF) => {
    for (const MESH of this.view.MESHES) {
      this.meshes.push(this.generateMeshFromConstant(MESH));
    }

    for (const mesh of this.meshes) {
      const forced = mesh as MousedGLTF; //TODO: Implement other meshes

      mesh
        .load(forced.MODEL.URL)
        .then(() =>
          mesh.initialize({
            rectElement,
            onRect,
          })
        );
    }
  };

  destroy = () => { };
}

export default ThreeView;
