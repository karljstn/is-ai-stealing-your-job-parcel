import { Scene, Vector3 } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeGLTF } from "~interfaces/Three";
import { Viewport } from "~types";
import TweenGLTF from "~three/Meshes/GLTF/abstract/TweenGLTF";

class QuestionMark extends TweenGLTF implements ThreeGLTF {
	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
	}

	initialize = ({ offset }: { offset: Vector3 }) => {
		this.setTransition(MODELS.QUESTION_MARK.BASE_SCALE, this.group.position)
		this.scene.add(this.group)
		this.in()
		this.group.position.copy(offset)
	}

	update = () => {

	}

	destroy = () => {
		this.scene.remove(this.group)
	}
}

export default QuestionMark