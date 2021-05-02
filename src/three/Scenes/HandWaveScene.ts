import store from "~/store";
import { Viewport } from "~/types";
import { rectToThree } from "~/util";
import { PerspectiveCamera, Scene, Vector2, Vector3 } from "three";
import { RECTS } from "~/constants/RECTS";
import Hand from "../Meshes/GLTF/Hand";
import Tweakpane from "tweakpane";

class HandWaveScene {
  camera: PerspectiveCamera;
  Hand: Hand;
  params: any;

  constructor(
    scene: Scene,
    camera: PerspectiveCamera,
    viewport: Viewport,
    mouse: Vector3
  ) {
    this.camera = camera;
    this.Hand = new Hand(scene, viewport, mouse);
  }

  start() {
    this.Hand.load();
  }

  tweaks() { }

  update(dt: number) {
    this.Hand.update(dt)
  }

  out() {
    this.Hand.out()
  }

  destroy() {
    this.Hand.destroy()
  }
}

export default HandWaveScene;
