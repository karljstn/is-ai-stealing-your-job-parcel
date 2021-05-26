import { PerspectiveCamera, Scene } from "three";
import { ViewInterface } from "~interfaces/Three";
import { BasedGLTF, TweenedGLTF, MousedGLTF } from '~three/Meshes/GLTF'
import { GLTF_TYPE, onRect, VIEW, Viewport, VIEW_MESH } from "~types";

type ThreeViewConstructor = {
	viewport: Viewport, scene: Scene, camera: PerspectiveCamera, viewData: VIEW, rect: HTMLElement, onRect: onRect
}

class ThreeView implements ViewInterface {
	viewport: Viewport
	scene: Scene
	camera: PerspectiveCamera
	view: VIEW
	rect: HTMLElement
	onRect: onRect

	constructor({ viewport, scene, camera, viewData, rect, onRect }: ThreeViewConstructor) {
		this.viewport = viewport
		this.scene = scene
		this.camera = camera
		this.view = viewData
		this.rect = rect
		this.onRect = onRect
	}

	getMesh = (MESH: VIEW_MESH) => {
		const { scene, viewport, rect, camera } = this

		switch (MESH.TYPE) {
			case GLTF_TYPE.BASE:
				return new BasedGLTF({ scene, viewport })

			case GLTF_TYPE.TWEENED:
				return new TweenedGLTF({ scene, viewport })

			case GLTF_TYPE.MOUSED:
				return new MousedGLTF({ scene, viewport, camera, MODEL: MESH.MODEL, rect, onRect: this.onRect })

			default:
				return null;
		}
	}

	start = () => {
		const meshes: (BasedGLTF | TweenedGLTF | MousedGLTF)[] = []

		for (const MESH of this.view.MESHES) {
			meshes.push(this.getMesh(MESH))
		}

		for (const mesh of meshes) {
			const forced = mesh as MousedGLTF //TODO: Implement other meshes

			mesh.load(forced.MODEL.URL).then(() => mesh.initialize())
		}
	}

	destroy = () => {

	}
}

export default ThreeView