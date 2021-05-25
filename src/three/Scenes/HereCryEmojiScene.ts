import { Viewport } from "~/types";
import { Scene, Vector3 } from "three";
import { MODELS } from "~constants/MODELS";
import { RAFS } from "~constants/RAFS"
import { ThreeScene } from "~interfaces/Three";
import Emoji from "~three/Meshes/GLTF/Emoji";
import Here from "~three/Meshes/GLTF/Here";

class HereCryEmojiScene implements ThreeScene {
	viewport: Viewport
	scene: Scene
	Here: Here
	SadEmoji: Emoji

	constructor(viewport: Viewport, scene: Scene) {
		this.viewport = viewport
		this.scene = scene
	}

	start() {
		this.Here = new Here(this.scene, this.viewport)
		setTimeout(() => {
			this.Here.start(MODELS.HERE.URL, this.Here.initialize)
		}, 500);

		this.SadEmoji = new Emoji({ scene: this.scene, viewport: this.viewport, MODEL: MODELS.EMOJI_CRY, RAF: RAFS.EMOJISAD, offset: new Vector3(0.23, -0.05, 0) });
		setTimeout(() => {
			this.SadEmoji.start(MODELS.EMOJI_CRY.URL, this.SadEmoji.initialize)
		}, 1000);
	}

	destroy() {
		this.SadEmoji.destroy()
		this.SadEmoji = null

		this.Here.destroy()
		this.Here = null
	}
}

export default HereCryEmojiScene;
