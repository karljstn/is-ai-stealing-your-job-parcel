import { Scene, Vector2, Vector3 } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeScene } from "~interfaces/Three";
import Pencil from "~three/Meshes/GLTF/Pencil";
import { Viewport } from "~types";

class PencilScene implements ThreeScene {
	Pencil: Pencil

	constructor(viewport: Viewport, scene: Scene) {
		this.Pencil = new Pencil(scene, viewport)

		this.Pencil.load(MODELS.PENCIL.URL)
	}

	start = () => {
		this.Pencil.start(MODELS.PENCIL.URL, this.Pencil.initialize)
	}

	destroy = () => {
		this.Pencil.destroy()
	}
}

export default PencilScene