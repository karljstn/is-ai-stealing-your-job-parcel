import { Viewport } from "~/types";
import { PerspectiveCamera, Scene, Vector3 } from "three";
import Hand from "../Meshes/GLTF/Hand";
import { MODELS } from "~constants/MODELS";

class HandWaveScene {
  Hand: Hand;

  constructor(
    scene: Scene,
    viewport: Viewport,
  ) {
    this.Hand = new Hand(scene, viewport);

    this.Hand.load(MODELS.HAND.URL);
  }

  start() {
    this.Hand.start(MODELS.HAND.URL, this.Hand.initialize)
  }

  out() {
    this.Hand.out()
  }

  destroy() {
    this.Hand.destroy()
  }
}

export default HandWaveScene;
