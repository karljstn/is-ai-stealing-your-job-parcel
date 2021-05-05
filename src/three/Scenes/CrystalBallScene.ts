import { Scene } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeScene } from "~interfaces/Three";
import CrystalBall from "~three/Meshes/GLTF/CrystalBall";
import { Viewport } from "~types";

class CrystalBallScene implements ThreeScene {
	CrystalBall: CrystalBall

	constructor(viewport: Viewport, scene: Scene) {
		this.CrystalBall = new CrystalBall(scene, viewport)
		this.CrystalBall.load(MODELS.CRYSTAL_BALL.URL)
	}

	start = () => {
		this.CrystalBall.start(MODELS.CRYSTAL_BALL.URL, this.CrystalBall.initialize)
	}

	destroy = () => {
		this.CrystalBall.destroy()
	}
}

export default CrystalBallScene