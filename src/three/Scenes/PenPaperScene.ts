import { Viewport } from "~/types";
import { Scene } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeScene } from "~interfaces/Three";
import PenPaper from "~three/Meshes/GLTF/PenPaper";

class PenPaperScene implements ThreeScene {
	viewport: Viewport
	scene: Scene
	PenPaper: PenPaper

	constructor(viewport: Viewport, scene: Scene) {
		this.viewport = viewport
		this.scene = scene
	}

	start() {
		this.PenPaper = new PenPaper(this.scene, this.viewport)
		setTimeout(() => {
			this.PenPaper.start(MODELS.PEN_PAPER.URL, this.PenPaper.initialize)
		}, 500);
	}

	destroy() {
		this.PenPaper.destroy()
		this.PenPaper = null
	}
}

export default PenPaperScene;
