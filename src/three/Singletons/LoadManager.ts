import { LoadingManager } from 'three'

class LoadManager {
	manager: LoadingManager
	constructor() {
		this.manager = new LoadingManager(this.onLoad, this.onProgress, this.onError)
	}
	onLoad = () => {
		// console.log("loaded")
	}
	onProgress = (url: string, loaded: number, total: number) => {
		// console.log("progression: " + (loaded / total) * 100)
	}
	onError = (url: string) => {
		// console.log(url)
	}
}

const instance = new LoadManager()
export default instance;