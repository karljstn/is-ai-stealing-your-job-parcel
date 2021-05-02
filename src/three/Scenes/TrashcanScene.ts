import store from "~/store";
import { Viewport } from "~/types";
import { rectToThree } from "~/util";
import { Scene, Vector2, Vector3, } from "three";
import { RECTS } from "~/constants/RECTS"
import Biases from "../Meshes/GLTF/Biases";
import Tweakpane from "tweakpane";
import TrashcanBake from "~three/Meshes/GLTF/TrashcanBake";
import SVG from "~three/Meshes/SVG";
import { MODELS } from "~constants/MODELS"

class TrashcanScene {
	viewport: Viewport
	scene: Scene
	mouse: Vector3

	biases: Biases
	trashcanBake: TrashcanBake
	// arrow: SVG

	constructor(viewport: Viewport, scene: Scene, mouse: Vector3, pane: Tweakpane | null) {
		this.viewport = viewport
		this.scene = scene
		this.mouse = mouse;

		this.biases = new Biases(1, pane, scene)
		this.trashcanBake = new TrashcanBake(1, scene)
		// this.arrow = new SVG()

		this.biases.load()
		this.trashcanBake.load()
		// this.arrow.load(MODELS.ARROW)
	}

	start() {
		let rect = store.state.rects.get(RECTS.LANDING)

		const intervalID = setInterval(() => {
			rect = store.state.rects.get(RECTS.LANDING)
			if (rect && this.biases.group) {
				clearInterval(intervalID)
				// Upper left
				let { x, y } = rectToThree(this.viewport, rect)

				// Bottom Middle
				x += ((rect.width / 2) / window.innerWidth) * this.viewport.width
				y -= ((rect.height / 2) / window.innerWidth) * this.viewport.height

				y -= this.viewport.height * 0.33

				this.biases.group.position.set(x, y, 0)
				this.scene.add(this.biases.group)
				this.biases.start()

				if (this.trashcanBake.group) {
					this.trashcanBake.group.position.set(x, -this.viewport.height / 2 + (this.viewport.height / 2 * 0.32), 0)
					// this.arrow.group.position.set(x, y, 2)
					this.scene.add(this.trashcanBake.group)
					// this.scene.add(this.arrow.group)
				}
			}
		}, 100);
	}

	update(dt: number) {
		// from -1 -> 1 to 0 -> 1
		// const mouse = { x: this.mouse.x / 2 + 0.5, y: this.mouse.y / 2 + 0.5 }

		if (!this.biases.group) return
		// const position = this.trashcan.group.position
		// const mouse = new Vector3(this.mouse.x * this.viewport.width, this.mouse.y * this.viewport.height, 0)
		// const rotationFactor = 0.07
		// const target = this.trashcan.group.rotation.toVector3().clone().subVectors(mouse, position).multiplyScalar(rotationFactor)
		// this.trashcan.group.rotation.setFromVector3(target)
		this.biases.update(dt)
	}
}

export default TrashcanScene