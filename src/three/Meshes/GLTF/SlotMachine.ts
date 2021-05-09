import { ThreeGLTF } from "~interfaces/Three";
import { AnimationAction, AnimationMixer, LoopOnce, Scene, Vector3 } from "three"
import { Viewport } from "~types"
import { MODELS } from "~constants/MODELS";
import TransitionGLTF from "./base/TransitionGLTF";
import { RAFS } from "~constants/RAFS";
import raf from '~singletons/RAF';

class SlotMachine extends TransitionGLTF implements ThreeGLTF {
	params: {
		animation: { speed: number }
	}
	mixer: AnimationMixer | null
	actions: AnimationAction[] | null

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
		this.params = {
			animation: { speed: 0.001 }
		}
		this.mixer = null
		this.animations = []
		this.actions = []

		this.load(MODELS.SLOT_MACHINE.URL)
	}

	initialize = () => {
		this.group.scale.set(0, 0, 0)
		this.group.rotateY(-Math.PI / 2)
		this.group.position.x += this.viewport.width / 8;

		this.mixer = new AnimationMixer(this.group)
		this.mixer.timeScale = this.params.animation.speed
		this.animations.forEach((anim) => {
			if (!this.mixer) return

			const clipAction = this.mixer.clipAction(anim)
			clipAction.loop = LoopOnce
			clipAction.clampWhenFinished = true
			this.actions?.push(clipAction)
		})

		this.setTransition(MODELS.SLOT_MACHINE.SCALE, this.group.position, new Vector3(0, 0, 0))
		this.scene.add(this.group)
		this.in()
		setTimeout(this.pull, 1000);
		raf.subscribe(RAFS.SLOT_MACHINE, this.update)
	}

	pull = () => {
		if (!this.actions) return

		this.actions?.forEach(action => {
			action.play()
		})
	}

	update = (dt: number) => {
		this.mixer?.update(dt);
	}

	destroy = () => {
		// this.killTween()
		this.scene.remove(this.group)
		raf.unsubscribe(RAFS.SLOT_MACHINE)
	}
}

export default SlotMachine