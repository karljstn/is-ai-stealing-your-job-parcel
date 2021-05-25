import { Mesh, MeshPhongMaterial, PointLight, Scene, TextureLoader, Vector3 } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeGLTF } from "~interfaces/Three";
import store from "~store";
import { Viewport } from "~types";
import withTween from "./base/withTween";

class PenPaper extends withTween implements ThreeGLTF {
	params: any

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
		this.params = { position: new Vector3(0.27, 0.07, 0) }
	}

	initialize = () => {
		const light = new PointLight(0xffffff, 100)
		light.position.set(this.params.position.x + 0.05, this.params.position.y + 0.1, 0)
		light.intensity = 0.5
		this.scene.add(light)

		// Set baked material
		const bakedTexture = new TextureLoader().load(MODELS.PEN_PAPER.TEXTURE);
		bakedTexture.flipY = false;
		const bakedMat = new MeshPhongMaterial({ map: bakedTexture })
		this.group.traverse((object3D) => {
			const mesh = object3D as Mesh;
			if (mesh.material) mesh.material = bakedMat;
		});

		this.group.rotateY(Math.PI)
		this.group.position.copy(this.params.position)
		this.scene.add(this.group)
		this.setTransition(MODELS.PEN_PAPER.SCALE, new Vector3(0.0, 0, 0))
		this.in()
		this.tweaks()
	}

	tweaks = () => {
		if (!store.state.tweakpane) return

		const folder = store.state.tweakpane.addFolder({ title: 'PenPaper', expanded: false })

		const positionInput = folder.addInput(this.params, 'position')
		positionInput.on('change', (position: any) => {
			this.group.position.copy(position.value)
		})
	}

	update = () => {

	}

	destroy = () => {
		this.scene.remove(this.group)
	}
}

export default PenPaper