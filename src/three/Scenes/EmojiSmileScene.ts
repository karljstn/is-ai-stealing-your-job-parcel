import store from "~/store";
import { Viewport } from "~/types";
import { rectToThree } from "~/util";
import { PerspectiveCamera, Scene, Vector2, Vector3 } from "three";
import { RECTS } from "~/constants/RECTS";
import EmojiSmile from "../Meshes/GLTF/EmojiSmile";
import Tweakpane from "tweakpane";

class EmojiScene {
  camera: PerspectiveCamera;
  Emoji: EmojiSmile;
  params: any;

  constructor(
    viewport: Viewport,
    scene: Scene,
    mouse: Vector3,
    camera: PerspectiveCamera
  ) {
    this.camera = camera;
    this.Emoji = new EmojiSmile(1, scene, mouse, viewport);
    this.params = {
      oldFov: camera.fov,
      fov: 20,
      oldPosition: new Vector3().copy(this.camera.position),
      position: new Vector3().copy(this.camera.position).setZ(4),
    };
  }

  start() {
    this.camera.fov = this.params.fov;
    this.camera.position.copy(this.params.position);
    this.camera.updateProjectionMatrix();

    this.Emoji.load();
    this.tweaks();
  }

  tweaks() { }

  update(dt: number) { }

  destroy() {
    this.camera.fov = this.params.oldFov;
    this.camera.position.copy(this.params.oldPosition);
    this.camera.updateProjectionMatrix();

    this.Emoji.destroy()
  }
}

export default EmojiScene;
