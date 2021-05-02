import { Scene, Vector3 } from "three";
import { Viewport } from "~types";
import BaseGLTF from "./BaseGLTF";
import gsap from 'gsap'

export enum CallbackType {
	ONCOMPLETE,
	ONREVERSECOMPLETE
}

type ThreeMeshTransition = {
	timeline: Timeline & { to: (targets: gsap.TweenTarget, vars: gsap.TweenVars, position?: gsap.Position | undefined) => any, fromTo: (targets: gsap.TweenTarget, fromVars: gsap.TweenVars, toVars: gsap.TweenVars, position?: gsap.Position | undefined) => any } & any
}

class TransitionGLTF extends BaseGLTF {
	transition: ThreeMeshTransition

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
		this.transition = { timeline: gsap.timeline({ paused: true, }) }
	}

	setCallback = (type: CallbackType, cb: () => void) => {
		switch (type) {
			case CallbackType.ONCOMPLETE:
				this.transition.timeline.eventCallback("onComplete", cb)
				break;

			case CallbackType.ONREVERSECOMPLETE:
				this.transition.timeline.eventCallback("onReverseComplete", cb)
				break;

			default:
				break;
		}
	}

	in = (size: number, position: Vector3, offset: Vector3, onComplete: () => void = () => null) => {
		if (!this.group) return

		this.transition.timeline.to(this.group.scale, { x: size, y: size, z: size, duration: 0.2 }, 2)
		this.transition.timeline.fromTo(this.group.position, { x: position.x - offset.x, y: position.y - offset.y }, { x: position.x, y: position.y, duration: 0.2 }, 2)
		this.transition.timeline.play()
	}

	out = () => {
		this.transition.timeline.reverse()
	}
}

export default TransitionGLTF