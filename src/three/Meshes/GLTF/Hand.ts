import { MODELS } from '~/constants/MODELS'
import { AnimationAction, AnimationClip, AnimationMixer, LoopOnce, MeshLambertMaterial, Scene, Vector3 } from "three"
import raf from "~singletons/RAF"
import { RAFS } from "~constants/RAFS"
import { ThreeGLTF } from "~interfaces/Three"
import store from "~store"
import { RECTS } from "~constants/RECTS";
import TransitionGLTF, { CallbackType } from "./base/TransitionGLTF"
import { Viewport } from '~types'
import MouseController from "~singletons/MouseController"

class Hand extends TransitionGLTF implements ThreeGLTF {
	params: { animation: { speed: number }, size: number }
	original: { position: Vector3 }
	world: { position: Vector3 }
	mixer: THREE.AnimationMixer | null
	waveAction: AnimationAction | null
	mouse: { current: Vector3, target: Vector3 }
	mat: MeshLambertMaterial

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
		this.params = {
			animation: { speed: 0.002 },
			size: MODELS.HAND.SCALE
		}
		this.original = { position: new Vector3() }
		this.world = { position: new Vector3() }
		this.mouse = {
			current: new Vector3(),
			target: new Vector3()
		}
		this.isLoaded = false
		this.mixer = null
		this.waveAction = null
		this.mat = new MeshLambertMaterial({ color: '#F4933B' })
	}

	initialize = () => this.setFromRect(RECTS.INTRO.HELLO).then(({ x, y, w, h }) => {
		const target = new Vector3(x + w - this.viewport.width / 6, y - h / 2, 0)
		this.original.position.copy(target)
		this.group.position.copy(target)
		this.group.scale.set(0, 0, 0)
		this.group && this.scene.add(this.group)

		// Animations
		if (!this.animations) return
		this.mixer = new AnimationMixer(this.group)
		this.mixer.timeScale = this.params.animation.speed
		const clip = AnimationClip.findByName(this.animations, 'ArmatureAction');
		this.waveAction = this.mixer.clipAction(clip)
		this.waveAction.loop = LoopOnce
		this.waveAction.clampWhenFinished = true

		this.setCallback(CallbackType.ONCOMPLETE, this.wave)
		this.setCallback(CallbackType.ONREVERSECOMPLETE, this.destroy)
		this.setTransition(MODELS.HAND.SCALE, this.group.position, new Vector3(0, 0, 0))

		this.group.traverse((obj: any) => {
			if (obj.name === "mesh") {
				obj.material.color = this.mat.color
				obj.material.roughness = 0.9
			}
		})

		raf.subscribe(RAFS.HAND, this.update)

		this.in()
		this.tweaks()

		setTimeout(this.wave, 1000)
	}, (reason) => console.error(reason))

	tweaks = () => {
		if (!store.state.tweakpane) return

		const folder = store.state.tweakpane.addFolder({ title: 'Hand', expanded: false })

		const speedInput = folder.addInput(this.params.animation, 'speed', { label: "Wave speed", min: this.params.animation.speed * 0.33, max: this.params.animation.speed * 3 })
		const sizeInput = folder.addInput(this.params, 'size', { label: "Hand size", min: MODELS.HAND.SCALE * 0.33, max: MODELS.HAND.SCALE * 3 })
		const btn = folder.addButton({ title: "Wave" })

		speedInput.on('change', (speed: any) => {
			if (this.mixer) this.mixer.timeScale = speed.value
		})
		sizeInput.on('change', (size: any) => {
			this.group?.scale.set(size.value, size.value, size.value)
		})
		btn.on('click', () => {
			this.wave()
		})
	}

	wave = () => {
		if (!this.waveAction) return

		this.waveAction.reset()
		this.waveAction.play()
	}

	update = (dt: number = 0) => {
		if (this.isLoaded) {
			this.mixer && this.mixer.update(dt)

			this.mouse.target.copy(MouseController.mouseVec3Viewport);

			this.mouse.current.lerp(this.mouse.target, 0.8)

			if (this.mouse.current.distanceTo(this.group.position) <= 0.075) {
				document.body.classList.add('cursor-grab')
				if (this.waveAction?.paused) {
					this.wave()
				}
			} else {
				if (document.body.classList.contains('cursor-grab')) {
					document.body.classList.remove('cursor-grab')
				}
			}

			this.group.lookAt(this.mouse.current.x, this.mouse.current.y, 1)
		}
	}

	destroy = () => {
		this.group && this.scene.remove(this.group)
		raf.unsubscribe(RAFS.HAND)
	}
}

export default Hand