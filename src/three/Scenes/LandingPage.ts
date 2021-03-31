import store from "~/store";
import { Viewport } from "~/types";
import { rectToThree } from "~/util";
import { PerspectiveCamera, PointLight, Scene, Vector2, Vector3, WebGLRenderer } from "three";
import { RECTS } from "~/constants/RECTS"
import Hand from "../Meshes/Hand";
import Tweakpane from "tweakpane";

class LandingPage {
	viewport: Viewport
	scene: Scene
	hand: Hand
	mouse: Vector2

	constructor(viewport: Viewport, scene: Scene, mouse: Vector2, pane: Tweakpane | null) {
		this.viewport = viewport
		this.scene = scene
		this.hand = new Hand(1, pane)
		this.mouse = mouse;
	}

	start() {
		const light = new PointLight("#fff", 1, 1, 1)
		this.scene.add(light)

		let rect = store.state.rects.get(RECTS.INTRO.HELLO)

		const intervalID = setInterval(() => {
			rect = store.state.rects.get(RECTS.INTRO.HELLO)
			if (rect && this.hand.group) {
				clearInterval(intervalID)

				// Upper left
				let { x, y } = rectToThree(this.viewport, rect)

				// Bottom right
				x += (rect.width / window.innerWidth) * this.viewport.width
				y -= ((rect.height / 2) / window.innerWidth) * this.viewport.height

				// Small offset
				y -= (rect.height / 4) / window.innerHeight

				this.hand.group.position.set(x, y, 0)
				this.scene.add(this.hand.group)
			}
		}, 100);
	}

	update(dt: number) {
		// from -1 -> 1 to 0 -> 1
		// const mouse = { x: this.mouse.x / 2 + 0.5, y: this.mouse.y / 2 + 0.5 }

		if (!this.hand.group) return
		const position = this.hand.group.position
		const mouse = new Vector3(this.mouse.x * this.viewport.width, this.mouse.y * this.viewport.height, 0)
		const rotationFactor = 0.07
		const target = this.hand.group.rotation.toVector3().clone().subVectors(mouse, position).multiplyScalar(rotationFactor)
		this.hand.group.rotation.setFromVector3(target)
		this.hand.update(dt)
	}
}

export default LandingPage