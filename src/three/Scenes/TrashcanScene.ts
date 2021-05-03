import store from "~/store";
import { Viewport } from "~/types";
import { rectToThree } from "~/util";
import { Scene, Vector2, Vector3, } from "three";
import { RECTS } from "~/constants/RECTS"
import Tweakpane from "tweakpane";
import SVG from "~three/Meshes/SVG";
import { MODELS } from "~constants/MODELS"
import Trashcan from "~three/Meshes/GLTF/Thrashcan";

class TrashcanScene {
	viewport: Viewport
	scene: Scene
	mouse: Vector3
	Trashcan: Trashcan

	constructor(viewport: Viewport, scene: Scene, mouse: Vector3) {
		this.viewport = viewport
		this.scene = scene
		this.mouse = mouse;
		this.Trashcan = new Trashcan(scene, viewport, mouse)
	}

	start() {
		this.Trashcan.load()
	}

	update(dt: number) {
		// if (!this.biases.group) return
		// const position = this.trashcan.group.position
		// const mouse = new Vector3(this.mouse.x * this.viewport.width, this.mouse.y * this.viewport.height, 0)
		// const rotationFactor = 0.07
		// const target = this.trashcan.group.rotation.toVector3().clone().subVectors(mouse, position).multiplyScalar(rotationFactor)
		// this.trashcan.group.rotation.setFromVector3(target)

		this.Trashcan.update(dt)
	}

	destroy = () => {
		this.Trashcan.destroy()
	}
}

export default TrashcanScene