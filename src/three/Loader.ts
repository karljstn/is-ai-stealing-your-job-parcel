import FullScreenPlane from "~/three/Meshes/FullScreenPlane"
import { Viewport } from "~/types"

import { PerspectiveCamera, Scene } from "three"
import Tweakpane from "tweakpane"

class Loader {
	fullScreenPlane: FullScreenPlane
	camera: PerspectiveCamera
	scene: Scene

	constructor(viewport: Viewport, scene: Scene, camera: PerspectiveCamera, pane: Tweakpane | null) {
		this.fullScreenPlane = new FullScreenPlane(viewport, camera)
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
	}
}

export default Loader