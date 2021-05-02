import { ThreeGLTF } from "~interfaces/Three";
import BaseGLTF from '~three/Meshes/GLTF/BaseGLTF'
import { AnimationAction, AnimationClip, AnimationMixer, LoopOnce, Scene } from "three"
import { Viewport } from "~types"
import { MODELS } from "~constants/MODELS";

class SlotMachine extends BaseGLTF implements ThreeGLTF {
	params: {
		animation: { speed: number }
	}
	mixer: AnimationMixer | null
	animations: AnimationClip[] | null
	actions: AnimationAction[] | null

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
		this.params = {
			animation: { speed: 3 }
		}
		this.mixer = null
		this.animations = []
		this.actions = []
	}

	load = () => {
		this.loader.load(MODELS.SLOT_MACHINE.URL, (gltf) => {
			this.group = gltf.scene
			this.group.scale.set(MODELS.SLOT_MACHINE.SCALE, MODELS.SLOT_MACHINE.SCALE, MODELS.SLOT_MACHINE.SCALE)
			this.group.rotateY(-Math.PI / 2)
			this.group.position.x += this.viewport.width / 8;

			// Animations
			this.mixer = new AnimationMixer(this.group)
			this.mixer.timeScale = this.params.animation.speed
			this.animations = gltf.animations

			this.animations.forEach((anim) => {
				if (!this.mixer) return

				const clipAction = this.mixer.clipAction(anim)
				clipAction.loop = LoopOnce
				clipAction.clampWhenFinished = true
				clipAction.stop()
				this.actions?.push(clipAction)
			})

			this.start()
		})
	}

	start = () => {
		this.scene.add(this.group)
		setTimeout(this.pull, 1000);
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

	}
}

export default SlotMachine