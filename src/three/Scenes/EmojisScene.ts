import { Viewport } from "~/types";
import { Scene, Vector3, } from "three";
import { RECTS } from "~/constants/RECTS";
import { MODELS } from "~constants/MODELS";
import Emoji from "~three/Meshes/GLTF/Emoji";
import { RAFS } from "~constants/RAFS";

class EmojisScene {
  viewport: Viewport
  scene: Scene
  EmojiGlasses: Emoji;
  EmojiSad: Emoji;

  constructor(viewport: Viewport, scene: Scene) {
    this.viewport = viewport
    this.scene = scene
  }

  start() {
    this.EmojiGlasses = new Emoji(this.scene, this.viewport, MODELS.EMOJI_GLASSES, RAFS.EMOJIGLASSES, RECTS.INTRO.AMIRITE.LEFT, 0, new Vector3(-this.viewport.width / 30))
    this.EmojiSad = new Emoji(this.scene, this.viewport, MODELS.EMOJI_SAD, RAFS.EMOJISAD, RECTS.INTRO.AMIRITE.RIGHT, 0.5, new Vector3(this.viewport.width / 30))

    this.EmojiGlasses.start(MODELS.EMOJI_GLASSES.URL, this.EmojiGlasses.initialize)
    this.EmojiSad.start(MODELS.EMOJI_SAD.URL, this.EmojiSad.initialize)
  }

  destroy() {
    this.EmojiGlasses.destroy()
    this.EmojiSad.destroy()

    this.EmojiGlasses = null
    this.EmojiSad = null
  }
}

export default EmojisScene;
