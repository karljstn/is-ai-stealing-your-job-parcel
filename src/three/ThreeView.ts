import { Object3D, PerspectiveCamera, Raycaster, Scene } from "three";
import { ViewInterface } from "~interfaces/Three";
import WritingGLTF, {
  TweenedGLTF,
  MousedTweenedGLTF,
} from "~three/Meshes/GLTF";
import {
  GLTF_TYPE,
  ThreeViewConstructor,
  VIEW,
  Viewport,
  VIEW_GLTF,
} from "~types";

class ThreeView implements ViewInterface {
  viewport: Viewport;
  scene: Scene;
  camera: PerspectiveCamera;
  view: VIEW;
  rectElement: HTMLElement;
  gltfMeshes: (TweenedGLTF | MousedTweenedGLTF | WritingGLTF)[];
  objects: Object3D[];
  raycaster: Raycaster;

  constructor({
    viewport,
    scene,
    camera,
    VIEW,
    rectElement,
    raycaster,
  }: ThreeViewConstructor) {
    this.viewport = viewport;
    this.scene = scene;
    this.camera = camera;
    this.view = VIEW;
    this.rectElement = rectElement;
    this.raycaster = raycaster;
    this.gltfMeshes = [];
    this.objects = [];
  }

  generateGLTFMeshFromConstant = (GLTF: VIEW_GLTF) => {
    const { scene, viewport, camera, raycaster } = this;

    switch (GLTF.TYPE) {
      case GLTF_TYPE.TWEENED:
        return new TweenedGLTF({
          scene,
          viewport,
          camera,
          GLTF,
          raycaster,
        });

      case GLTF_TYPE.MOUSED:
        return new MousedTweenedGLTF({
          scene,
          viewport,
          camera,
          GLTF,
          raycaster,
        });

      case GLTF_TYPE.WRITING:
        return new WritingGLTF({ scene, viewport, camera, GLTF, raycaster });

      default:
        return null;
    }
  };

  start = (rectElement: HTMLElement = undefined) => {
    for (const VIEW_GLTF of this.view.GLTF_MESHES) {
      const gltfMesh = this.generateGLTFMeshFromConstant(VIEW_GLTF);
      this.gltfMeshes.push(gltfMesh);
    }

    for (const gltf of this.gltfMeshes) {
      if (rectElement)
        gltf
          .load(gltf.MODEL.URL)
          .then(() => gltf.initRect(rectElement))
          .then(() => gltf.initGLTF());
      else gltf.load(gltf.MODEL.URL).then(() => gltf.initGLTF());
    }

    if (!this.view.ON_START) return;
    this.view.ON_START(this);
  };

  destroy = () => {
    for (const gltf of this.gltfMeshes) {
      gltf.destroy();
    }
    this.gltfMeshes = [];

    if (!this.view.ON_DESTROY) return;
    this.view.ON_DESTROY(this);
  };
}

export default ThreeView;
