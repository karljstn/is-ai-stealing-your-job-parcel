import { Scene, Vector3 } from "three";
import { Viewport } from "~types";
import { clamp } from "~util";
import BaseGLTF from "./BaseGLTF";
import BezierEasing from 'bezier-easing'
import raf from "~singletons/RAF"

type ThreeMeshTransition = {
	value: number
	factor: number
	target: {
		position: Vector3, offset: Vector3, scale: Vector3,
	}
	speed: number
	delay: number
	duration: number
	eases: {
		default: ReturnType<typeof BezierEasing>
	}
}

class TransitionGLTF extends BaseGLTF {
	rafKey: string
	transition: ThreeMeshTransition

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
		this.rafKey = performance.now().toString()
		this.transition = {
			value: 0,
			factor: 0,
			target: {
				position: new Vector3(),
				offset: new Vector3(),
				scale: new Vector3()
			},
			speed: 0.01,
			delay: 0,
			duration: 0.3,
			eases: { default: new BezierEasing(.61, .27, .78, .99) }
		}

		raf.subscribe(this.rafKey, this.tween)
	}

	setTransition = (scaleScalar: number, position: Vector3, offset: Vector3 = new Vector3(), delay = 0, duration = 0.3) => {
		if (!this.group) return

		this.transition.target.scale.setScalar(scaleScalar)
		this.transition.target.position.copy(position)
		this.transition.target.offset.copy(offset)

		this.transition.delay = delay
		this.transition.duration = duration
	}

	in = () => {
		this.transition.factor = this.transition.speed
	}

	out = () => {
		this.transition.factor = -this.transition.speed
	}

	tween = () => {
		if (this.transition.value >= 0 && this.transition.value <= 1) {
			this.transition.value = clamp(this.transition.value + this.transition.factor, 0, 1)

			const eased = this.transition.eases.default(this.transition.value)
			this.group.scale.set(this.transition.target.scale.x * eased, this.transition.target.scale.y * eased, this.transition.target.scale.z * eased)
		}
	}

	killTween = () => {
		raf.unsubscribe(this.rafKey)
	}
}

export default TransitionGLTF