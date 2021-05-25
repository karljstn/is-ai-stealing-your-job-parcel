import { PointLight, Scene, Vector3 } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeGLTF } from "~interfaces/Three";
import store from "~store";
import { Viewport } from "~types";
import withMouse from "./base/withMouse";

class Tree extends withMouse implements ThreeGLTF {
	params: any
	light: PointLight

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
		this.params = { position: new Vector3(0.25, -0.2, 0) }
	}

	initialize = () => {
		this.light = new PointLight(0xffffff, 100)
		this.light.position.set(this.params.position.x + 0.7, this.params.position.y + 0.7, 1)
		this.light.intensity = 4
		this.scene.add(this.light)

		this.group.rotateY(-Math.PI / 1.5)
		this.group.position.copy(this.params.position)
		this.scene.add(this.group)
		this.setTransition(MODELS.TREE.SCALE, new Vector3(0.2, 0, 0), new Vector3(), { in: 1.3, out: 0 })
		this.setUpdateMouse(0.5, new Vector3(5, -2, 0), 0.3)
		this.in()
		this.tweaks()
	}

	tweaks = () => {
		if (!store.state.tweakpane) return

		const folder = store.state.tweakpane.addFolder({ title: 'Tree', expanded: false })

		const positionInput = folder.addInput(this.params, 'position')
		positionInput.on('change', (position: any) => {
			this.group.position.copy(position.value)
		})
	}

	update = () => {

	}

	destroy = () => {
		this.scene.remove(this.light)
		this.scene.remove(this.group)
		this.killUpdateMouse()
	}
}

export default Tree