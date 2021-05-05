import { Viewport } from "~/types";
import { Scene } from "three";
import { MODELS } from "~constants/MODELS"
import Trashcan from "~three/Meshes/GLTF/Thrashcan";
import { ThreeScene } from "~interfaces/Three";

class TrashcanScene implements ThreeScene {
	Trashcan: Trashcan

	constructor(viewport: Viewport, scene: Scene) {
		this.Trashcan = new Trashcan(scene, viewport)

		this.Trashcan.load(MODELS.TRASHCAN.URL)
	}

	start() {
		this.Trashcan.start(MODELS.TRASHCAN.URL, this.Trashcan.initialize)
	}

	destroy = () => {
		this.Trashcan.destroy()
	}
}

export default TrashcanScene