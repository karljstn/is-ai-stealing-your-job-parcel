import { Viewport } from "~/types";
import { Scene } from "three";
import HandWave from "../GLTF/GLTF/HandWave";
import { MODELS } from "~constants/MODELS";
import { ThreeScene } from "~interfaces/Three";

class HandWaveScene implements ThreeScene {
  viewport: Viewport
  scene: Scene
  Hand: HandWave;

  constructor(viewport: Viewport, scene: Scene) {
    this.viewport = viewport
    this.scene = scene
  }

  start() {
    this.Hand = new HandWave(this.scene, this.viewport);
    this.Hand.start(MODELS.HAND_WAVE.URL, this.Hand.initialize)
  }

  destroy() {
    this.Hand.destroy()
    this.Hand = null
  }
}

export default HandWaveScene;
