import { Viewport } from "~/types";
import { Scene } from "three";
import { MODELS } from "~constants/MODELS"
import Trashcan from "~old/GLTF/Thrashcan";
import { ThreeView } from "~interfaces/Three";

class TrashcanScene implements ThreeView {
	viewport: Viewport
	scene: Scene
	Trashcan: Trashcan

	constructor(viewport: Viewport, scene: Scene) {
		this.viewport = viewport
		this.scene = scene
	}

	start = () => {
		this.Trashcan = new Trashcan(this.scene, this.viewport)
		this.Trashcan.start(MODELS.TRASHCAN.URL, this.Trashcan.initialize)
	}

	destroy = () => {
		this.Trashcan.destroy()
		this.Trashcan = null
	}
}

export default TrashcanScene