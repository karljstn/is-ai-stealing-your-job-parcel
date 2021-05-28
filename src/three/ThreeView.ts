import { PerspectiveCamera, Scene } from "three";
import { MATERIALS } from "~constants/MATERIALS";
import { ViewInterface } from "~interfaces/Three";
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
  }

  getMesh = (MESH: VIEW_MESH) => {
    const { scene, viewport, rectElement, camera } = this;

    switch (MESH.TYPE) {
      case GLTF_TYPE.BASE:
        return new BasedGLTF({ scene, viewport, camera, MODEL: MESH.MODEL });

      case GLTF_TYPE.TWEENED:
        return new TweenedGLTF({ scene, viewport, camera, MODEL: MESH.MODEL });

      case GLTF_TYPE.MOUSED:
        return new MousedGLTF({
          scene,
          viewport,
          camera,
          MODEL: MESH.MODEL,
          rectElement,
          onRect: this.onRect,
        });

      default:
        return null;
    }
  };

  start = (rectElement?: HTMLElement, onRect?: onRect) => {
    const meshes: (BasedGLTF | TweenedGLTF | MousedGLTF)[] = [];

    for (const MESH of this.view.MESHES) {
      meshes.push(this.getMesh(MESH));
    }

    for (const mesh of meshes) {
      const forced = mesh as MousedGLTF; //TODO: Implement other meshes

      mesh
        .load(forced.MODEL.URL)
        .then(() =>
          mesh.initialize(
            rectElement,
            onRect,
            MATERIALS.GET_FRESNEL_BAKED(forced.MODEL)
          )
        );
    }
  };

  destroy = () => {};
}

export default ThreeView;
