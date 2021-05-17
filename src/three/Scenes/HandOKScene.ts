import { Viewport } from "~/types";
import { PerspectiveCamera, Scene, Vector3 } from "three";
import HandOK from "../Meshes/GLTF/HandOK";
import { MODELS } from "~constants/MODELS";
import { ThreeScene } from "~interfaces/Three";

class HandOKScene implements ThreeScene {
	viewport: Viewport
	scene: Scene
	Hand: HandOK;

	constructor(viewport: Viewport, scene: Scene) {
		this.viewport = viewport
		this.scene = scene
	}

	start() {
		this.Hand = new HandOK(this.scene, this.viewport);
		this.Hand.start(MODELS.HAND_OK.URL, this.Hand.initialize)
	}

	destroy() {
		this.Hand.destroy()
		this.Hand = null
	}
}

export default HandOKScene;
