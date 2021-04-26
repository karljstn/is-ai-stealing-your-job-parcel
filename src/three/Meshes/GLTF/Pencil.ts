import { Group, Object3D, Scene, Vector2, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import LoadManager from '~/three/Singletons/LoadManager'
import { ThreeGLTF } from "~interfaces/Three";
import { MODELS } from "~constants/MODELS";
import { Viewport } from "~types";
import store from "~store";
import { TpChangeEvent } from "tweakpane/dist/types/api/tp-event";

class Pencil implements ThreeGLTF {
	scene: Scene
	viewport: Viewport
	params: any
	group: Group | null
	loader: GLTFLoader
	mouse: Vector2

	constructor(scene: Scene, viewport: Viewport, mouse: Vector2) {
		this.scene = scene
		this.viewport = viewport
		this.mouse = mouse
		this.params = {
			size: MODELS.PENCIL.SCALE,
			rotation: new Vector3(Math.PI, 0, Math.PI * 0.16)
		}
		this.group = null
		this.loader = new GLTFLoader(LoadManager.manager)
	}

	load = () => {
		this.loader.load(MODELS.PENCIL.URL, (gltf) => {
			this.group = gltf.scene
			this.group.scale.set(this.params.size, this.params.size, this.params.size)
			this.group.rotation.setFromVector3(this.params.rotation)
			this.start()
		})
	}

	start = () => {
		this.group && this.scene.add(this.group)
		this.tweaks()
	}

	update = (dt: number) => {
		if (!this.group) return

		const mouse = new Vector3(
			(this.mouse.x * this.viewport.width) / 2,
			(this.mouse.y * this.viewport.height) / 2,
			0
		);

		this.group.position.lerp(mouse, 0.8)

	}

	checkBox = () => {

	}

	tweaks = () => {
		const folder = store.state.tweakpane?.addFolder({ title: 'Pencil', expanded: false })

		const rotationInput = folder?.addInput(this.params, 'rotation', { label: "Rotation" })
		const sizeInput = folder?.addInput(this.params, 'size', { label: "Hand size", min: MODELS.PENCIL.SCALE * 0.2, max: MODELS.PENCIL.SCALE * 2 })
		const btn = folder?.addButton({ title: "Write" })

		rotationInput?.on('change', (rotation: TpChangeEvent<Vector3>) => {
			this.group?.rotation.setFromVector3(rotation.value)
		})
		sizeInput?.on('change', (size: any) => {
			this.group?.scale.set(size.value, size.value, size.value)
		})
		btn?.on('click', () => {
			this.checkBox()
		})
	}

	destroy = () => {
		this.group && this.scene.remove(this.group)
	}
}

export default Pencil