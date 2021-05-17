import { MODELS } from '~/constants/MODELS'
import { AnimationAction, AnimationClip, AnimationMixer, LoopOnce, MeshLambertMaterial, Scene, Vector3 } from "three"
import raf from "~singletons/RAF"
import { RAFS } from "~constants/RAFS"
import { ThreeGLTF } from "~interfaces/Three"
import store from "~store"
import { RECTS } from "~constants/RECTS";
import withMouse from "./base/withMouse"
import { Viewport } from '~types'

class HandWave extends withMouse implements ThreeGLTF {
	params: { animation: { speed: number }, size: number }
	original: { position: Vector3 }
	world: { position: Vector3 }
	mixer: THREE.AnimationMixer | null
	actions: AnimationAction[] | null
	waveAction: AnimationAction | null
	mat: MeshLambertMaterial

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
		this.params = {
			animation: { speed: 0.002 },
			size: MODELS.HAND_WAVE.SCALE
		}
		this.original = { position: new Vector3() }
		this.world = { position: new Vector3() }
		this.isLoaded = false
		this.mixer = null
		this.waveAction = null
		this.mat = new MeshLambertMaterial({ color: '#F4933B' })
	}

	initialize = () => this.setFromRect(RECTS.INTRO.HELLO).then(({ x, y, w, h }) => {
		const target = new Vector3(x + w, y - h / 2, 0)
		this.original.position.copy(target)
		this.group.position.copy(target)
		this.group.scale.set(0, 0, 0)
		this.scene.add(this.group)

		this.mixer = new AnimationMixer(this.group)
		this.mixer.timeScale = this.params.animation.speed

		this.animations.forEach((anim) => {
			if (!this.mixer) return

			const clipAction = this.mixer.clipAction(anim)
			clipAction.loop = LoopOnce
			clipAction.clampWhenFinished = true
			this.actions?.push(clipAction)
		})

		const clip = AnimationClip.findByName(this.animations, 'ArmatureAction');
		this.waveAction = this.mixer.clipAction(clip)
		this.waveAction.loop = LoopOnce
		this.waveAction.clampWhenFinished = true

		this.setTransition(MODELS.HAND_WAVE.SCALE, this.group.position)

		this.group.traverse((obj: any) => {
			if (obj.name === "mesh") {
				obj.material.color = this.mat.color
				obj.material.roughness = 0.9
			}
		})

		raf.subscribe(RAFS.HAND_WAVE, this.update)

		this.in()
		this.tweaks()

		setTimeout(this.wave, 1000)
	}, (reason) => console.error(reason))

	tweaks = () => {
		if (!store.state.tweakpane) return

		const folder = store.state.tweakpane.addFolder({ title: 'Hand', expanded: false })

		const speedInput = folder.addInput(this.params.animation, 'speed', { label: "Wave speed", min: this.params.animation.speed * 0.33, max: this.params.animation.speed * 3 })
		const sizeInput = folder.addInput(this.params, 'size', { label: "Hand size", min: MODELS.HAND_WAVE.SCALE * 0.33, max: MODELS.HAND_WAVE.SCALE * 3 })
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

	update = (dt = 0) => {
		if (this.isLoaded) {
			this.mixer && this.mixer.update(dt)

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
		}
	}

	destroy = () => {
		// this.killTween()
		this.killUpdateMouse()
		this.scene.remove(this.group)
		raf.unsubscribe(RAFS.HAND_WAVE)
	}
}

export default HandWave