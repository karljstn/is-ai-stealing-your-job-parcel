import { Viewport } from "~/types";
import { Scene, } from "three";
import { RECTS } from "~/constants/RECTS";
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
    this.EmojiGlasses = new Emoji(scene, viewport, MODELS.EMOJI_GLASSES, RAFS.EMOJIGLASSES, RECTS.INTRO.AMIRITE.LEFT, 0)
    this.EmojiSad = new Emoji(scene, viewport, MODELS.EMOJI_SAD, RAFS.EMOJISAD, RECTS.INTRO.AMIRITE.RIGHT, 0.5)

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
