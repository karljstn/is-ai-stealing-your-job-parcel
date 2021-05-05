import store from "~/store";
import { Viewport } from "~/types";
import { rectToThree } from "~/util";
import { PerspectiveCamera, Scene, Vector2, Vector3 } from "three";
import { RECTS } from "~/constants/RECTS";
import EmojiGlasses from "../Meshes/GLTF/EmojiGlasses";
import Tweakpane from "tweakpane";
import EmojiSad from "~three/Meshes/GLTF/EmojiSad";
import { MODELS } from "~constants/MODELS";
import Emoji from "~three/Meshes/GLTF/base/Emoji";
import { RAFS } from "~constants/RAFS";

class EmojisScene {
  EmojiGlasses: Emoji;
  EmojiSad: Emoji;

  constructor(
    viewport: Viewport,
    scene: Scene,
  ) {
    this.EmojiGlasses = new Emoji(scene, viewport, MODELS.EMOJI_GLASSES, RAFS.EMOJIGLASSES, RECTS.INTRO.AMIRITE.LEFT)
    this.EmojiSad = new Emoji(scene, viewport, MODELS.EMOJI_SAD, RAFS.EMOJISAD, RECTS.INTRO.AMIRITE.RIGHT)

    this.EmojiGlasses.load(MODELS.EMOJI_GLASSES.URL);
    this.EmojiSad.load(MODELS.EMOJI_SAD.URL);
  }

  start() {
    this.EmojiGlasses.start(MODELS.EMOJI_GLASSES.URL, this.EmojiGlasses.initialize)
    this.EmojiSad.start(MODELS.EMOJI_SAD.URL, this.EmojiSad.initialize)
  }

  destroy() {
    this.EmojiGlasses.destroy()
    this.EmojiSad.destroy()
  }
}

export default EmojisScene;
