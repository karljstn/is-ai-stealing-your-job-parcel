import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import LoadManager from '~/three/Singletons/LoadManager'
import { MODELS } from '~/constants/MODELS'
import { AnimationAction, AnimationClip, PerspectiveCamera, WebGLRenderer } from "three"
import Tweakpane from "tweakpane"
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

class Hand {
	loader: GLTFLoader
	group: THREE.Group | null
	mixer: THREE.AnimationMixer | null
	animations: AnimationClip[] | null
	waveAction: AnimationAction | null
	params: { animSpeed: number, size: number }
	pane: Tweakpane | null
	size: number

	constructor(size: number, pane: Tweakpane | null) { //camera: PerspectiveCamera, renderer: WebGLRenderer
		this.pane = pane
		this.size = size
		this.params = {
			animSpeed: 0.0025,
			size: size * MODELS.HAND.scale
		}
		this.group = null
		this.mixer = null
		this.animations = null
		this.waveAction = null

		this.loader = new GLTFLoader(LoadManager.manager)
	}

	load() {
		this.loader.load(MODELS.HAND.url, (gltf) => {
			this.group = gltf.scene
			this.group.scale.set(this.params.size, this.params.size, this.params.size)

			// Animations
			this.mixer = new THREE.AnimationMixer(this.group)
			this.mixer.timeScale = this.params.animSpeed
			this.animations = gltf.animations
			const clip = THREE.AnimationClip.findByName(this.animations, 'ArmatureAction');
			this.waveAction = this.mixer.clipAction(clip)
			this.waveAction.loop = THREE.LoopOnce
			this.waveAction.clampWhenFinished = true
		})
	}

	tweaks() {
		if (this.pane) {
			const speedInput = this.pane.addInput(this.params, 'animSpeed', { label: "Wave speed", min: this.params.animSpeed * 0.33, max: this.params.animSpeed * 3 })
			const sizeInput = this.pane.addInput(this.params, 'size', { label: "Hand size", min: this.size * MODELS.HAND.scale * 0.33, max: this.size * MODELS.HAND.scale * 3 })
			const btn = this.pane && this.pane.addButton({ title: "Wave" })

			speedInput && speedInput.on('change', (speed: any) => {
				if (this.mixer) this.mixer.timeScale = speed.value
			})
			sizeInput && sizeInput.on('change', (size: any) => {
				this.group?.scale.set(size.value, size.value, size.value)
			})
			btn && btn.on('click', () => {
				this.wave()
			})
		} else {
			console.warn("no tweakpane")
		}
	}

	wave() {
		if (!this.waveAction) return

		this.waveAction.reset()
		this.waveAction.play()
	}

	update(dt: number = 0) {
		this.mixer?.update(dt)
	}
}

export default Hand

