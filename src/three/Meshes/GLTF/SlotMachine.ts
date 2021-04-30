import { ThreeGLTF } from "~interfaces/Three";
import BaseGLTF from '~three/Meshes/GLTF/BaseGLTF'
import { Mesh, Scene } from "three"
import { Viewport } from "~types"
import { MODELS } from "~constants/MODELS";

class Pencil extends BaseGLTF implements ThreeGLTF {
	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
	}

	load = () => {
		this.loader.load(MODELS.CRYSTAL_BALL.URL, (gltf) => {
			this.group = gltf.scene
			this.group.scale.set(MODELS.SLOT_MACHINE.SCALE, MODELS.SLOT_MACHINE.SCALE, MODELS.SLOT_MACHINE.SCALE)

			this.group.traverse((object3D) => {
				const mesh = object3D as Mesh;
				// if (mesh.material) mesh.material = this.material;
			});
		})
	}

	start = () => {

	}

	update = () => {

	}

	destroy = () => {

	}
}

export default Pencil