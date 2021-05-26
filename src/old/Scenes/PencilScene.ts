import { Scene, Vector2, Vector3 } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeScene } from "~interfaces/Three";
import Pencil from "~three/Meshes/GLTF/Pencil";
import { Viewport } from "~types";

class PencilScene implements ThreeScene {
	viewport: Viewport
	scene: Scene
	Pencil: Pencil

	constructor(viewport: Viewport, scene: Scene) {
		this.viewport = viewport
		this.scene = scene
	}

	start = () => {
		this.Pencil = new Pencil(this.scene, this.viewport)
		this.Pencil.start(MODELS.PENCIL.URL, this.Pencil.initialize)
	}

	destroy = () => {
		this.Pencil.destroy()
		this.Pencil = null
	}
}

export default PencilScene