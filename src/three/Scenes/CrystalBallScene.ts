import { Scene } from "three";
import { ThreeScene } from "~interfaces/Three";
import CrystalBall from "~three/Meshes/GLTF/CrystalBall";
import { Viewport } from "~types";

class CrystalBallScene implements ThreeScene {
	CrystalBall: CrystalBall

	constructor(viewport: Viewport, scene: Scene) {
		this.CrystalBall = new CrystalBall(scene, viewport)
		this.CrystalBall.load()
	}

	start = () => {
		this.CrystalBall.start()
	}

	tweaks = () => { }

	update = () => { }

	destroy = () => {
		this.CrystalBall.destroy()
	}
}

export default CrystalBallScene