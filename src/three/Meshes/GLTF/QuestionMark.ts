import { PointLight, Scene, Vector3 } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeGLTF } from "~interfaces/Three";
import { Viewport } from "~types";
import withTween from "./base/withTween"
class QuestionMark extends withTween implements ThreeGLTF {
	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
	}

	initialize = () => {
		const light = new PointLight(0xffffff, 100)
		light.position.set(1, 1, 1)
		light.intensity = 100
		this.scene.add(light)

		this.setTransition(MODELS.HERE.SCALE, new Vector3(0, 0, 0))
		this.scene.add(this.group)
		this.in()
	}

	update = () => {

	}

	destroy = () => {
		this.scene.remove(this.group)
	}
}

export default QuestionMark