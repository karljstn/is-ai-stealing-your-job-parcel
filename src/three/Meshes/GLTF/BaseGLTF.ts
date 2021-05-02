import { Group, Scene } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Viewport } from "~types"
import LoadManager from '~/three/Singletons/LoadManager'

class BaseGLTF {
	scene: Scene
	viewport: Viewport
	group: Group
	loader: GLTFLoader

	constructor(scene: Scene, viewport: Viewport) {
		this.scene = scene
		this.viewport = viewport
		this.group = new Group()
		this.loader = new GLTFLoader(LoadManager.manager)
	}
}

export default BaseGLTF