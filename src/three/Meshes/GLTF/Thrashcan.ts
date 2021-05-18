import { AnimationAction, AnimationClip, AnimationMixer, LoopOnce, Scene, Vector3 } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeGLTF } from "~interfaces/Three";
import { Viewport } from "~types";
import withTween from "./base/withTween";
import MouseController from '~singletons/MouseController'
import raf from "~singletons/RAF"
import { RAFS } from "~constants/RAFS"
import store from "~store";

class Trashcan extends withTween implements ThreeGLTF {
	params: {
		animation: { speed: number }
		out: { duration: number, delay: number }
	}
	original: { position: Vector3 }
	mouse: Vector3
	mixer: AnimationMixer | null
	animations: AnimationClip[]
	actions: AnimationAction[]

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
		this.params = { animation: { speed: 0.001 }, out: { duration: 0.5, delay: 1 } }
		this.original = { position: new Vector3() }
		this.mouse = MouseController.mouseVec3
		this.mixer = null
		this.animations = []
		this.actions = []

		this.load(MODELS.TRASHCAN.URL)
	}

	initialize = () => {
		this.mixer = new AnimationMixer(this.group)
		this.mixer.timeScale = this.params.animation.speed

		this.animations.forEach((anim) => {
			if (!this.mixer) return

			const clipAction = this.mixer.clipAction(anim)
			clipAction.loop = LoopOnce
			clipAction.clampWhenFinished = true
			this.actions?.push(clipAction)
		})

		const target = new Vector3(0, -this.viewport.height / 2.7, 0)
		this.group.position.copy(target)
		this.original.position.copy(target)
		this.group.rotateY(-Math.PI / 2)
		this.scene.add(this.group)
		this.tweaks()
		raf.subscribe(RAFS.TRASHCAN, this.update)
		this.setTransition(MODELS.TRASHCAN.SCALE, this.original.position, new Vector3(0, -0.3, 0), { in: 0, out: 0 }, this.params.out.duration)
	}

	tweaks = () => {
		const dropBtn = store.state.tweakpane.addButton({ title: 'Drop' })
		dropBtn.on('click', () => {
			this.drop()
		})
		const inBtn = store.state.tweakpane.addButton({ title: 'In' })
		inBtn.on('click', () => {
			this.in()
		})
		const outBtn = store.state.tweakpane.addButton({ title: 'Out' })
		outBtn.on('click', () => {
			this.out()
		})
	}

	drop: () => Promise<void> | undefined = () => {
		if (!this.actions) return null

		this.actions?.forEach(action => {
			action.play()
		})

		return new Promise((resolve) => {
			setTimeout(() => {
				this.out()
				setTimeout(() => {
					resolve()
				}, this.params.out.duration * 1000);
			}, 3000);
		})
	}

	update = (dt: number) => {
		this.mixer?.update(dt);
	}

	destroy = () => {
		// this.killTween()
		raf.unsubscribe(RAFS.TRASHCAN)
		this.group.rotateY(Math.PI / 2)
		this.mixer.stopAllAction()
		this.scene.remove(this.group)
	}
}

export default Trashcan