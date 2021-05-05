import { AnimationClip, Group, Scene } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Viewport } from "~types"
import LoadManager from '~/three/Singletons/LoadManager'
import store from "~store"
import { rectToThree } from "~util"

class BaseGLTF {
	scene: Scene
	viewport: Viewport

	group: Group
	animations: AnimationClip[]
	loader: GLTFLoader
	isLoaded: boolean

	constructor(scene: Scene, viewport: Viewport) {
		this.scene = scene
		this.viewport = viewport

		this.group = new Group()
		this.animations = []
		this.loader = new GLTFLoader(LoadManager.manager)
		this.isLoaded = false
	}

	load = (url: string) => new Promise<void>((resolve, reject) => {
		this.loader.load(url, (gltf) => {
			this.group = gltf.scene
			this.animations = gltf.animations
			this.isLoaded = true
			resolve()
		}, () => null, () => reject())
	})

	start = (url: string, cb: () => void) => {
		!this.isLoaded ? this.load(url).then(cb) : cb()
	}

	setFromRect = (rectName: string) => new Promise<ReturnType<typeof rectToThree>>((resolve, reject) => {
		const intervalID = setInterval(() => {
			let rect = store.state.rects.get(rectName);
			if (rect && this.group) {
				clearInterval(intervalID);

				resolve(rectToThree(this.viewport, rect));
			}
		}, 50);

		setTimeout(() => {
			clearInterval(intervalID)
			if (!store.state.rects.get(rectName)) reject("no rect timeout")
		}, 1000);
	})
}

export default BaseGLTF