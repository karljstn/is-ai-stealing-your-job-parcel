import { Group, Scene } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Viewport } from "~types"
import LoadManager from '~/three/Singletons/LoadManager'
import store from "~store"
import { rectToThree } from "~util"

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

	setFromRect = (viewport: Viewport, rectName: string) => new Promise<ReturnType<typeof rectToThree>>((resolve, reject) => {
		const intervalID = setInterval(() => {
			let rect = store.state.rects.get(rectName);
			if (rect && this.group) {
				clearInterval(intervalID);

				resolve(rectToThree(viewport, rect));
			}
		}, 50);

		setTimeout(() => {
			clearInterval(intervalID)
			if (!store.state.rects.get(rectName)) reject("no rect timeout")
		}, 1000);
	})
}

export default BaseGLTF