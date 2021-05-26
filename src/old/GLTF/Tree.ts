import { PointLight, Scene, Vector3 } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeGLTF } from "~interfaces/Three";
import store from "~store";
import { Viewport } from "~types";
import MouseGLTF from "~three/Meshes/GLTF/abstract/MouseGLTF";

class Tree extends MouseGLTF implements ThreeGLTF {
	params: any

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
		this.params = { position: new Vector3(0.30, -0.13, 0) }
	}

	initialize = () => {
		const light = new PointLight(0xffffff, 100)
		light.position.set(this.params.position.x + 0.5, this.params.position.y + 0.5, 1)
		light.intensity = 1
		this.scene.add(light)

		this.group.rotateY(-Math.PI / 1.5)
		this.group.position.copy(this.params.position)
		this.scene.add(this.group)
		this.setTransition(MODELS.TREE.BASE_SCALE, new Vector3(0.2, 0, 0))
		this.setUpdateMouse(0.5, new Vector3(10, -2, 0), 0.1)
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
		this.scene.remove(this.group)
		this.killUpdateMouse()
	}
}

export default Tree