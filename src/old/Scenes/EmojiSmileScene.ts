import { Viewport } from "~/types";
import { Scene, Vector3, } from "three";
import { MODELS } from "~constants/MODELS";
import Emoji from "~old/GLTF/Emoji";
import { RAFS } from "~constants/RAFS";
import { ThreeView } from "~interfaces/Three";

class EmojiSmileScene implements ThreeView {
	viewport: Viewport
	scene: Scene
	Emoji: Emoji;

	constructor(viewport: Viewport, scene: Scene) {
		this.viewport = viewport
		this.scene = scene
	}

	start() {
		this.Emoji = new Emoji({
			scene: this.scene,
			viewport: this.viewport,
			MODEL: MODELS.EMOJI_SMILE,
			RAF: RAFS.EMOJISMILE,
			offset: new Vector3(0.377, -0.12, 0),
			// delay: { in: 1.1, out: 0 },
			rotation: new Vector3(-0.1, 0, 0.2)
		})

		this.Emoji.start(MODELS.EMOJI_SMILE.URL, this.Emoji.initialize)
	}

	destroy() {
		this.Emoji.destroy()

		this.Emoji = null
	}
}

export default EmojiSmileScene;
