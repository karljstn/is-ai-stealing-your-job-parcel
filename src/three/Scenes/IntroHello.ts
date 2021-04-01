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
    this.emoji = new Emoji(1, pane, scene);
    this.mouse = mouse;
  }

  start() {
    this.emoji.load();

    let rect = store.state.rects.get(RECTS.INTRO.HELLO);

    const intervalID = setInterval(() => {
      rect = store.state.rects.get(RECTS.INTRO.HELLO);
      if (rect && this.emoji.group) {
        clearInterval(intervalID);
        // Upper left
        let { x, y } = rectToThree(this.viewport, rect);

        // Bottom right
        x += (rect.width / window.innerWidth) * this.viewport.width;
        y -= (rect.height / 2 / window.innerWidth) * this.viewport.height;

        // Small offset
        x += 0.1;
        y -= rect.height / 4 / window.innerHeight;

        this.emoji.group.position.set(x, y, 0);
        this.scene.add(this.emoji.group);
        this.emoji.start();
      }
    }, 100);
  }

  update(dt: number) {}
}

export default IntroHello;
