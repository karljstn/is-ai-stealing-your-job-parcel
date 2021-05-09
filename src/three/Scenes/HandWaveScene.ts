import { Viewport } from "~/types";
import { PerspectiveCamera, Scene, Vector3 } from "three";
import Hand from "../Meshes/GLTF/Hand";
import { MODELS } from "~constants/MODELS";

class HandWaveScene {
  viewport: Viewport
  scene: Scene
  Hand: Hand;

  constructor(viewport: Viewport, scene: Scene) {
    this.viewport = viewport
    this.scene = scene
  }

  start() {
    this.Hand = new Hand(this.scene, this.viewport);
    this.Hand.start(MODELS.HAND.URL, this.Hand.initialize)
  }

  destroy() {
    this.Hand.destroy()
    this.Hand = null
  }
}

export default HandWaveScene;
