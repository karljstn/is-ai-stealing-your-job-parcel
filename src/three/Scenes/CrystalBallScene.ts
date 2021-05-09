import { Scene } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeScene } from "~interfaces/Three";
import CrystalBall from "~three/Meshes/GLTF/CrystalBall";
import { Viewport } from "~types";

class CrystalBallScene implements ThreeScene {
	viewport: Viewport
	scene: Scene
	CrystalBall: CrystalBall

	constructor(viewport: Viewport, scene: Scene) {
		this.viewport = viewport
		this.scene = scene
	}

	start = () => {
		this.CrystalBall = new CrystalBall(this.scene, this.viewport)
		this.CrystalBall.start(MODELS.CRYSTAL_BALL.URL, this.CrystalBall.initialize)
	}

	destroy = () => {
		this.CrystalBall.destroy()
		this.CrystalBall = null
	}
}

export default CrystalBallScene