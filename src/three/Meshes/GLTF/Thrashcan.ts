import { AnimationAction, AnimationClip, AnimationMixer, LoopOnce, Scene, Vector3 } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeGLTF } from "~interfaces/Three";
import { Viewport } from "~types";
import TransitionGLTF, { CallbackType } from "./base/TransitionGLTF";

class Trashcan extends TransitionGLTF implements ThreeGLTF {
	params: {
		animation: { speed: number }
	}
	original: { position: Vector3 }
	mouse: Vector3
	mixer: AnimationMixer | null
	animations: AnimationClip[]
	actions: AnimationAction[]

	constructor(scene: Scene, viewport: Viewport, mouse: Vector3) {
		super(scene, viewport)
		this.params = { animation: { speed: 0.001 } }
		this.original = { position: new Vector3() }
		this.mouse = mouse
		this.mixer = null
		this.animations = []
		this.actions = []
	}

	load = () => {
		this.loader.load(MODELS.TRASHCAN.URL, (gltf) => {
			this.group = gltf.scene

			// Animations
			this.mixer = new AnimationMixer(this.group)
			this.mixer.timeScale = this.params.animation.speed
			this.animations = gltf.animations

			this.animations.forEach((anim) => {
				if (!this.mixer) return

				const clipAction = this.mixer.clipAction(anim)
				clipAction.loop = LoopOnce
				clipAction.clampWhenFinished = true
				this.actions?.push(clipAction)
			})

			this.start()
		})
	}

	start = () => {
		const target = new Vector3(0, -this.viewport.height / 2.7, 0)
		this.group.position.copy(target)
		this.original.position.copy(target)

		this.group.traverse((obj) => {
			if (obj.name === "POUBELLE") {
				obj.position.y += this.viewport.height / 6
			}
		})

		this.group.scale.set(0, 0, 0)
		this.group.rotateY(-Math.PI / 2)

		this.scene.add(this.group)

		this.setCallback(CallbackType.ONREVERSECOMPLETE, this.destroy)
		this.setTransition(MODELS.TRASHCAN.SCALE, this.original.position, new Vector3(0, -0.3, 0), 1)

		this.in()
	}

	drop: () => Promise<void> | undefined = () => {
		if (!this.actions) return

		this.actions?.forEach(action => {
			action.play()
		})

		return new Promise((resolve) => {
			setTimeout(() => {
				this.out()
				resolve()
			}, 2000);
		})
	}

	update = (dt: number) => {
		this.mixer?.update(dt);
	}

	destroy = () => {
		this.scene.remove(this.group)
	}
}

export default Trashcan