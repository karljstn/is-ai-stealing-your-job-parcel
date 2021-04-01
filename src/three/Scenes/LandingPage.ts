import store from "~/store";
import { Viewport } from "~/types";
import { rectToThree } from "~/util";
import { PerspectiveCamera, PointLight, Scene, Vector2, Vector3, WebGLRenderer } from "three";
import { RECTS } from "~/constants/RECTS"
import Trashcan from "../Meshes/Trashcan";
import Tweakpane from "tweakpane";

class LandingPage {
	viewport: Viewport
	scene: Scene
	trashcan: Trashcan
	mouse: Vector2

	constructor(viewport: Viewport, scene: Scene, mouse: Vector2, pane: Tweakpane | null) {
		this.viewport = viewport
		this.scene = scene
		this.trashcan = new Trashcan(1, pane, scene)
		this.mouse = mouse;
	}

	start() {
		this.trashcan.load()

		let rect = store.state.rects.get(RECTS.INTRO.HELLO)

		const intervalID = setInterval(() => {
			rect = store.state.rects.get(RECTS.INTRO.HELLO)
			if (rect && this.trashcan.group) {
				clearInterval(intervalID)
				// Upper left
				let { x, y } = rectToThree(this.viewport, rect)

				// Bottom Middle
				x += ((rect.width / 2) / window.innerWidth) * this.viewport.width
				y -= ((rect.height / 2) / window.innerWidth) * this.viewport.height

				y -= 0.1

				this.trashcan.group.position.set(x, y, 0)
				this.scene.add(this.trashcan.group)
				this.trashcan.start()
			}
		}, 100);
	}

	update(dt: number) {
		// from -1 -> 1 to 0 -> 1
		// const mouse = { x: this.mouse.x / 2 + 0.5, y: this.mouse.y / 2 + 0.5 }

		if (!this.trashcan.group) return
		const position = this.trashcan.group.position
		const mouse = new Vector3(this.mouse.x * this.viewport.width, this.mouse.y * this.viewport.height, 0)
		const rotationFactor = 0.07
		const target = this.trashcan.group.rotation.toVector3().clone().subVectors(mouse, position).multiplyScalar(rotationFactor)
		this.trashcan.group.rotation.setFromVector3(target)
		this.trashcan.update(dt)
	}
}

export default LandingPage