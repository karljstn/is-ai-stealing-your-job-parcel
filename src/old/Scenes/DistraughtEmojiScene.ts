import { Viewport } from "~/types";
import { Scene, Vector3, } from "three";
import { MODELS } from "~constants/MODELS";
import Emoji from "~three/Meshes/GLTF/Emoji";
import { RAFS } from "~constants/RAFS";
import { ThreeScene } from "~interfaces/Three";

class DistraughtEmojiScene implements ThreeScene {
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
			MODEL: MODELS.EMOJI_DISTRAUGHT,
			RAF: RAFS.EMOJIDISTRAUGHT,
			offset: new Vector3(0.3, -0.075, 0),
			delay: { in: 1.1, out: 0 },
			rotation: new Vector3(0, 0, -0.2)
		})

		this.Emoji.start(MODELS.EMOJI_DISTRAUGHT.URL, this.Emoji.initialize)
	}

	destroy() {
		this.Emoji.destroy()

		this.Emoji = null
	}
}

export default DistraughtEmojiScene;
