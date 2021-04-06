import store from "~/store";
import { Viewport } from "~/types";
import { rectToThree } from "~/util";
import { Scene, Vector2, Vector3 } from "three";
import { RECTS } from "~/constants/RECTS";
import Emoji from "../Meshes/Emoji";
import Tweakpane from "tweakpane";

class IntroHello {
  viewport: Viewport;
  scene: Scene;
  emoji: Emoji;
  mouse: Vector2;

  constructor(
    viewport: Viewport,
    scene: Scene,
    mouse: Vector2,
    pane: Tweakpane | null
  ) {
    this.viewport = viewport;
    this.scene = scene;
    this.mouse = mouse;
    this.emoji = new Emoji(1, pane, scene, this.mouse, this.viewport);
  }

  start() {
    this.emoji.load();
  }

  update(dt: number) {}
}

export default IntroHello;
