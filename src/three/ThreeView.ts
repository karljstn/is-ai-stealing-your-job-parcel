import { Material, PerspectiveCamera, Scene } from "three";
import { MATERIALS } from "~constants/MATERIALS";
import { InitGLTF, ViewInterface } from "~interfaces/Three";
import { BasedGLTF, TweenedGLTF, MousedTweenedGLTF } from "~three/Meshes/GLTF";
import { GLTF_TYPE, onRect, VIEW, Viewport, VIEW_GLTF } from "~types";

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
  gltfMeshes: (BasedGLTF | TweenedGLTF | MousedTweenedGLTF)[];

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
    this.gltfMeshes = [];
  }

  generateGLTFMeshFromConstant = (MESH: VIEW_GLTF) => {
    const { scene, viewport, rectElement, camera, onRect } = this;
    const { MODEL, MATERIAL } = MESH;

    switch (MESH.TYPE) {
      case GLTF_TYPE.BASE:
        return new BasedGLTF({ scene, viewport, camera, MODEL, MATERIAL });

      case GLTF_TYPE.TWEENED:
        return new TweenedGLTF({ scene, viewport, camera, MODEL, MATERIAL });

      case GLTF_TYPE.MOUSED:
        return new MousedTweenedGLTF({
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
    for (const MESH of this.view.GLTF_MESHES) {
      this.gltfMeshes.push(this.generateGLTFMeshFromConstant(MESH));
    }

    for (const gltf of this.gltfMeshes) {
      gltf.load(gltf.MODEL.URL).then(() =>
        gltf.initRectGLTF({
          rectElement,
          onRect,
        })
      );
    }
  };

  destroy = () => {};
}

export default ThreeView;
