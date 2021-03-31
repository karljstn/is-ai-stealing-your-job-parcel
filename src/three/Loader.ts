import FullScreenPlane from "~/three/Meshes/FullScreenPlane"
import { Viewport } from "~/types"
import { raf } from "rafz"
import { Camera, Scene } from "three"
import Tweakpane from "tweakpane"

class Loader {
	fullScreenPlane: FullScreenPlane
	camera: Camera
	scene: Scene

	constructor(viewport: Viewport, scene: Scene, camera: Camera, pane: Tweakpane | null) {
		this.fullScreenPlane = new FullScreenPlane(viewport, pane)
		this.scene = scene
		this.camera = camera

		this.start()
	}

	start = () => {
		this.scene.add(this.fullScreenPlane.object3d)
	}

	destroy = () => {
		this.scene.remove(this.fullScreenPlane.object3d)
	}

	update = (dt = 0) => {
		this.fullScreenPlane.update(dt)
		raf((dt: number) => this.update(dt))
	}
}

export default Loader