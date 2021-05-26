import {
  PlaneBufferGeometry,
  ShaderMaterial,
  IUniform,
  Mesh,
  Color,
  Vector2,
  MeshBasicMaterial,
} from "three";
import { Viewport } from "~/types/";
import { ThreeMesh } from "~/interfaces/Three";
import fragment from "~/shaders/fullScreenPlane/fragment.glsl";
import vertex from "~/shaders/fullScreenPlane/vertex.glsl";
import Tweakpane from "tweakpane";
import { PALETTE } from "~/constants/PALETTE";

class RaycastPlane implements ThreeMesh {
  viewport: Viewport;
  pane: Tweakpane | null;

  timeSpeed: number;

  geometry: PlaneBufferGeometry;
  material: MeshBasicMaterial;
  object3d: Mesh;

  constructor(viewport: Viewport, pane: Tweakpane | null) {
    this.viewport = viewport;
    this.pane = pane;
    this.timeSpeed = 0.01;

    this.geometry = new PlaneBufferGeometry(1, 1, 1, 1);
    this.material = new MeshBasicMaterial({ color: "#fff" });
    this.material.depthWrite = false;
    this.object3d = new Mesh(this.geometry, this.material);

    this.start();
  }

  start() {
    this.object3d.position.setZ(0);
    this.resize();
    window.addEventListener("resize", this.resize);
  }

  resize = () => {
    const width = this.viewport.width * 2;
    const height = this.viewport.height * 2;
    this.object3d.scale.set(width, height, 0);
  };

  update = () => {};
}

export default RaycastPlane;
