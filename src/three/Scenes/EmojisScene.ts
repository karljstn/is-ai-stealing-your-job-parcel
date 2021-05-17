import { Viewport } from "~/types";
import { Scene, Vector3, } from "three";
import { RECTS } from "~/constants/RECTS";
import { MODELS } from "~constants/MODELS";
import Emoji from "~three/Meshes/GLTF/Emoji";
import { RAFS } from "~constants/RAFS";
import { ThreeScene } from "~interfaces/Three";

class EmojisScene implements ThreeScene {
  viewport: Viewport
  scene: Scene
  EmojiGlasses: Emoji;
  EmojiSad: Emoji;

  constructor(viewport: Viewport, scene: Scene) {
    this.viewport = viewport
    this.scene = scene
  }

  start() {
    this.EmojiGlasses = new Emoji({ scene: this.scene, viewport: this.viewport, MODEL: MODELS.EMOJI_GLASSES, RAF: RAFS.EMOJIGLASSES, RECT: RECTS.INTRO.AMIRITE.LEFT, offset: new Vector3(-this.viewport.width / 30) })
    this.EmojiSad = new Emoji({ scene: this.scene, viewport: this.viewport, MODEL: MODELS.EMOJI_SAD, RAF: RAFS.EMOJISAD, RECT: RECTS.INTRO.AMIRITE.RIGHT, delay: { in: 0.5, out: 0.2 }, offset: new Vector3(this.viewport.width / 30) })

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
