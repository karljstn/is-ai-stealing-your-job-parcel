import store from "~/store";
import { Viewport } from "~/types";
import { rectToThree } from "~/util";
import { PerspectiveCamera, Scene, Vector2, Vector3 } from "three";
import { RECTS } from "~/constants/RECTS";
import EmojiGlasses from "../Meshes/GLTF/EmojiGlasses";
import Tweakpane from "tweakpane";
import EmojiSad from "~three/Meshes/GLTF/EmojiSad";
import { MODELS } from "~constants/MODELS";

class EmojisScene {
  camera: PerspectiveCamera;
  EmojiGlasses: EmojiGlasses;
  EmojiSad: EmojiSad;
  params: any;

  constructor(
    viewport: Viewport,
    scene: Scene,
    mouse: Vector3,
    camera: PerspectiveCamera
  ) {
    this.camera = camera;
    this.EmojiGlasses = new EmojiGlasses(1, scene, mouse, viewport);
    this.EmojiSad = new EmojiSad(1, scene, mouse, viewport)
    this.EmojiGlasses.load(MODELS.EMOJI_GLASSES.URL);
    this.EmojiSad.load(MODELS.EMOJI_SAD.URL);
  }

  start() {
    // this.params = {
    //   fov: 20,
    //   position: new Vector3().copy(this.camera.position).setZ(4),
    // };
    // this.camera.fov = this.params.fov;
    // this.camera.position.set(
    //   this.params.position.x,
    //   this.params.position.y,
    //   this.params.position.z
    // );
    // this.camera.updateProjectionMatrix();

    this.EmojiGlasses.start(MODELS.EMOJI_GLASSES.URL, this.EmojiGlasses.initialize)
    this.EmojiSad.start(MODELS.EMOJI_SAD.URL, this.EmojiSad.initialize)
  }

  destroy() {
    this.EmojiGlasses.destroy()
    this.EmojiSad.destroy()
  }
}

export default EmojisScene;
