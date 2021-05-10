import { Scene, Vector3 } from "three";
import { Viewport } from "~types";
import { clamp } from "~util";
import withBase from "./withBase";
import BezierEasing from 'bezier-easing'
import raf from "~singletons/RAF"

type ThreeMeshTransition = {
	value: number
	factor: number
	target: {
		position: Vector3, offset: Vector3, scale: Vector3,
	}
	speed: number
	delay: {
		in: number,
		out: number
	}
	duration: number
	eases: {
		default: ReturnType<typeof BezierEasing>
	}
}

class withTween extends withBase {
	tweenRAFKey: string
	transition: ThreeMeshTransition

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)

		this.tweenRAFKey = performance.now().toString()
		this.transition = {
			value: 0,
			factor: 0,
			target: {
				position: new Vector3(),
				offset: new Vector3(),
				scale: new Vector3()
			},
			speed: 0.04,
			delay: { in: 0, out: 0 },
			duration: 0.3,
			eases: { default: new BezierEasing(.42, 0, .58, 1) }
		}

		raf.subscribe(this.tweenRAFKey, this.tween)
	}

	setTransition = (scaleScalar: number, position: Vector3, offset: Vector3 = new Vector3(), delay = { in: 0, out: 0 }, duration = 0.3) => {
		if (!this.group) return

		this.transition.target.scale.setScalar(scaleScalar)
		this.transition.target.position.copy(position)
		this.transition.target.offset.copy(offset)

		this.transition.delay = delay
		this.transition.duration = duration
	}

	in = () => {
		setTimeout(() => {
			this.transition.factor = this.transition.speed
		}, this.transition.delay.in * 1000);
	}

	out = () => {
		setTimeout(() => {
			this.transition.factor = -this.transition.speed
		}, this.transition.delay.out * 1000);
	}

	tween = () => {
		if (this.transition.value >= 0 && this.transition.value <= 1) {
			this.transition.value = clamp(this.transition.value + this.transition.factor, 0, 1)

			const eased = this.transition.eases.default(this.transition.value)
			this.group.scale.set(this.transition.target.scale.x * eased, this.transition.target.scale.y * eased, this.transition.target.scale.z * eased)
		}
	}

	killTween = () => {
		raf.unsubscribe(this.tweenRAFKey)
	}
}

export default withTween