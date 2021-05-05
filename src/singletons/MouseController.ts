import { Vector2, Vector3 } from "three"
import { Viewport } from "~types"

class MouseController {
	mouseVec3: Vector3 // Useful for distance and lookAt() logic
	mouseVec2: Vector2 // Useful for raycasts
	mouseVec3Viewport: Vector3 // Useful for responsive

	constructor() {
		this.mouseVec3 = new Vector3()
		this.mouseVec2 = new Vector2()
		this.mouseVec3Viewport = new Vector3()

		this.setEvents()
	}

	setFromViewport = (viewport: Viewport) => {
		this.mouseVec3Viewport.x = this.mouseVec3.x * (viewport.width / 2)
		this.mouseVec3Viewport.y = this.mouseVec3.y * (viewport.height / 2)
	}

	mousemove = (e: MouseEvent) => {
		this.mouseVec3.x = (e.clientX / window.innerWidth) * 2 - 1
		this.mouseVec3.y = -(e.clientY / window.innerHeight) * 2 + 1

		this.mouseVec2.x = this.mouseVec3.x
		this.mouseVec2.y = this.mouseVec3.y
	}

	setEvents = () => {
		window.addEventListener("mousemove", this.mousemove)
	}
}

const instance = new MouseController()
export default instance