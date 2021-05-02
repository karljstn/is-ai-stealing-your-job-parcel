import { Scene, Vector2, Vector3 } from "three";
import { ThreeScene } from "~interfaces/Three";
import Pencil from "~three/Meshes/GLTF/Pencil";
import { Viewport } from "~types";

class PencilScene implements ThreeScene {
	Pencil: Pencil

	constructor(viewport: Viewport, scene: Scene, mouse: Vector3,) {
		this.Pencil = new Pencil(scene, viewport, mouse)
	}

	start = () => {
		this.Pencil.load()
	}

	tweaks = () => {

	}

	update = (dt: number) => {
		this.Pencil.update(dt)
	}

	destroy = () => {
		this.Pencil.destroy()
	}
}

export default PencilScene