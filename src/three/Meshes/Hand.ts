import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import LoadManager from '~/three/Singletons/LoadManager'
import { MODELS } from '~/constants/MODELS'
import { AnimationAction, AnimationClip, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import Tweakpane from "tweakpane"
import raf from "~three/Singletons/RAF"
import { RAFS } from "~constants/RAFS"
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

class Hand {
	params: { animSpeed: number, size: number }
	size: number
	pane: Tweakpane | null
	scene: Scene
	group: THREE.Group | null
	mixer: THREE.AnimationMixer | null
	animations: AnimationClip[] | null
	waveAction: AnimationAction | null
	loader: GLTFLoader

	constructor(size: number, pane: Tweakpane | null, scene: Scene) { //camera: PerspectiveCamera, renderer: WebGLRenderer
		this.params = {
			animSpeed: 0.005,
			size: size * MODELS.HAND.SCALE
		}
		this.size = size
		this.pane = pane
		this.scene = scene
		this.group = null
		this.mixer = null
		this.animations = null
		this.waveAction = null
		this.loader = new GLTFLoader(LoadManager.manager)
	}

	start = () => {
		this.tweaks()
		raf.subscribe(RAFS.HAND, this.update)
	}

	load = () => {
		this.loader.load(MODELS.HAND.URL, (gltf) => {
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

	tweaks = () => {
		if (!this.pane) return

		const folder = this.pane.addFolder({ title: 'Hand', expanded: false })

		const speedInput = folder.addInput(this.params, 'animSpeed', { label: "Wave speed", min: this.params.animSpeed * 0.33, max: this.params.animSpeed * 3 })
		const sizeInput = folder.addInput(this.params, 'size', { label: "Hand size", min: this.size * MODELS.HAND.SCALE * 0.33, max: this.size * MODELS.HAND.SCALE * 3 })
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
		this.mixer && this.mixer.update(dt)
	}

	destroy = () => {
		this.group && this.scene.remove(this.group)
		raf.unsubscribe(RAFS.HAND)
	}
}

export default Hand

