import { Scene, Vector3 } from "three";
import { Viewport } from "~types";
import withTween from "./withTween";
import raf from "~singletons/RAF"
import MouseController from '~singletons/MouseController'

class withMouse extends withTween {
	mouseRAFKey: string
	mouse: { current: Vector3, target: Vector3, lerp: number, offset: Vector3, scalar: number }

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)

		this.mouseRAFKey = (performance.now() * Math.random()).toString()
		this.mouse = {
			current: new Vector3(),
			target: new Vector3(),
			lerp: 0.8,
			offset: new Vector3(),
			scalar: 1
		}

		raf.subscribe(this.mouseRAFKey, this.updateMouse)
	}

	setUpdateMouse = (lerp: number, offset: Vector3, scalar: number) => {
		this.mouse.lerp = lerp
		this.mouse.offset.copy(offset)
		this.mouse.scalar = scalar
	}

	updateMouse = () => {
		if (this.isLoaded) {
			this.mouse.target.copy(MouseController.mouseVec3Viewport);
			this.mouse.current.lerp(this.mouse.target, this.mouse.lerp)
			this.mouse.current.add(this.mouse.offset)
			this.mouse.current.multiplyScalar(this.mouse.scalar)
			this.group.lookAt(this.mouse.current.x, this.mouse.current.y, 1)
		}
	}

	killUpdateMouse = () => {
		raf.unsubscribe(this.tweenRAFKey)
	}
}

export default withMouse