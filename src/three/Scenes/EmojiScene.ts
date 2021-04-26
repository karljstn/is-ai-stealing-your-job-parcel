import store from "~/store";
import { Viewport } from "~/types";
import { rectToThree } from "~/util";
import { PerspectiveCamera, Scene, Vector2, Vector3 } from "three";
import { RECTS } from "~/constants/RECTS";
import Emoji from "../Meshes/GLTF/Emoji";
import Tweakpane from "tweakpane";

class EmojiScene {
  camera: PerspectiveCamera;
  Emoji: Emoji;
  params: any;

  constructor(
    viewport: Viewport,
    scene: Scene,
    mouse: Vector2,
    camera: PerspectiveCamera
  ) {
    this.camera = camera;
    this.Emoji = new Emoji(1, scene, mouse, viewport);
  }

  start() {
    this.params = {
      fov: 20,
      position: new Vector3().copy(this.camera.position).setZ(4),
    };
    this.camera.fov = this.params.fov;
    this.camera.position.set(
      this.params.position.x,
      this.params.position.y,
      this.params.position.z
    );
    this.camera.updateProjectionMatrix();

    this.Emoji.load();
    this.tweaks();
  }

  tweaks() {

  }

  update(dt: number) { }

  destroy() {
    this.Emoji.destroy()
  }
}

export default EmojiScene;
