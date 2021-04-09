import store from "~/store";
import { Viewport } from "~/types";
import { rectToThree } from "~/util";
import { PerspectiveCamera, Scene, Vector2, Vector3 } from "three";
import { RECTS } from "~/constants/RECTS";
import Emoji from "../Meshes/Emoji";
import Tweakpane from "tweakpane";

class IntroHello {
  camera: PerspectiveCamera;
  emoji: Emoji;
  params: any;

  constructor(
    viewport: Viewport,
    scene: Scene,
    mouse: Vector2,
    camera: PerspectiveCamera
  ) {
    this.camera = camera;

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

    this.emoji = new Emoji(1, scene, mouse, viewport);
  }

  start() {
    this.emoji.load();
    this.tweaks();
  }

  tweaks() {
    const pane = store.state.tweakpane;

    const fov = pane?.addInput(this.params, "fov", { min: 1, max: 100 });
    const pos = pane?.addInput(this.params, "position");
    fov?.on("change", (e) => {
      this.camera.fov = e.value;
      this.camera.updateProjectionMatrix();
    });
    pos?.on("change", (e) => {
      this.camera.position.set(e.value.x, e.value.y, e.value.z);
    });
  }

  update(dt: number) {}
}

export default IntroHello;
