import FullScreenPlane from "~/three/Meshes/FullScreenPlane"
import { Viewport } from "~/types"
import { raf } from "rafz"
import { Camera, Scene } from "three"
import gsap from 'gsap'

class Loader {
	fullScreenPlane: FullScreenPlane
	camera: Camera
	scene: Scene

	constructor(viewport: Viewport, scene: Scene, camera: Camera) {
		this.fullScreenPlane = new FullScreenPlane(viewport)
		this.scene = scene
		this.camera = camera

		this.start()
	}

	start() {
		this.scene.add(this.fullScreenPlane.object3d)
		this.camera.position.z = 10
	}

	fadeIn() {
		gsap.to(this.fullScreenPlane.uniforms, { "uMixFactor": 1, duration: 1 })
	}

	update(dt = 0) {
		this.fullScreenPlane.update(dt)
		raf((dt: number) => this.update(dt))
	}
}

export default Loader