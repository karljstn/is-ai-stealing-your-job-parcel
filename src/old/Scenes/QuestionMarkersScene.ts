import { Viewport } from "~/types";
import { Scene, Vector3, } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeScene } from "~interfaces/Three";
import QuestionMark from "~three/Meshes/GLTF/QuestionMark";

class QuestionMarkersScene implements ThreeScene {
	viewport: Viewport
	scene: Scene
	QuestionMarkOne: QuestionMark
	QuestionMarkTwo: QuestionMark

	constructor(viewport: Viewport, scene: Scene) {
		this.viewport = viewport
		this.scene = scene
	}

	start() {
		this.QuestionMarkOne = new QuestionMark(this.scene, this.viewport)
		setTimeout(() => {
			this.QuestionMarkOne.start(MODELS.QUESTION_MARK.URL, () => this.QuestionMarkOne.initialize({ offset: new Vector3(0.5, 0.5, 0.5) }))
		}, 500);

		this.QuestionMarkTwo = new QuestionMark(this.scene, this.viewport)
		setTimeout(() => {
			this.QuestionMarkTwo.start(MODELS.QUESTION_MARK.URL, () => this.QuestionMarkTwo.initialize({ offset: new Vector3(0, 0, 0) }))
		}, 500);
	}

	destroy() {
		this.QuestionMarkOne.destroy()
		this.QuestionMarkOne = null

		this.QuestionMarkTwo.destroy()
		this.QuestionMarkTwo = null
	}
}

export default QuestionMarkersScene;
