import { Viewport } from "~/types";
import { Scene, Vector3, } from "three";
import { MODELS } from "~constants/MODELS"
import Trashcan from "~three/Meshes/GLTF/Thrashcan";
import { ThreeScene } from "~interfaces/Three";

class TrashcanScene implements ThreeScene {
	viewport: Viewport
	scene: Scene
	mouse: Vector3
	Trashcan: Trashcan

	constructor(viewport: Viewport, scene: Scene, mouse: Vector3) {
		this.viewport = viewport
		this.scene = scene
		this.mouse = mouse;
		this.Trashcan = new Trashcan(scene, viewport, mouse)
	}

	start() {
		this.Trashcan.start(MODELS.TRASHCAN.URL, this.Trashcan.initialize)
	}

	destroy = () => {
		this.Trashcan.destroy()
	}
}

export default TrashcanScene