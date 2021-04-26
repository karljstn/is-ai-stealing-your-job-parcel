import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import LoadManager from '~/three/Singletons/LoadManager'
import { MODELS } from '~/constants/MODELS'
import { AnimationAction, AnimationClip, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import Tweakpane from "tweakpane"
import raf from "~three/Singletons/RAF"
import { RAFS } from "~constants/RAFS"
import { ThreeGLTF } from "~interfaces/Three"

class Biases implements ThreeGLTF {
	params: { animSpeed: number, size: number }
	size: number
	pane: Tweakpane | null
	scene: Scene
	group: THREE.Group | null
	mixer: THREE.AnimationMixer | null
	animations: AnimationClip[] | null
	waveAction: AnimationAction | null
	loader: GLTFLoader

	constructor(size: number, pane: Tweakpane | null, scene: Scene) {
		this.params = {
			animSpeed: 0.005,
			size: size * MODELS.TRASHCAN.SCALE
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
		raf.subscribe(RAFS.TRASHCAN, this.update)
	}

	load = () => {
		this.loader.load(MODELS.TRASHCAN.URL, (gltf) => {
			this.group = gltf.scene
			this.group.scale.set(this.params.size, this.params.size, this.params.size)

			this.mixer = new THREE.AnimationMixer(this.group)
			this.mixer.timeScale = this.params.animSpeed
			this.animations = gltf.animations
		})
	}

	tweaks = () => {
		if (!this.pane) return

		const folder = this.pane.addFolder({ title: 'Biases', expanded: false })

		const speedInput = folder.addInput(this.params, 'animSpeed', { label: "Drop speed", min: this.params.animSpeed * 0.33, max: this.params.animSpeed * 3 })
		const sizeInput = folder.addInput(this.params, 'size', { label: "Trashcan size", min: this.size * MODELS.TRASHCAN.SCALE * 0.33, max: this.size * MODELS.TRASHCAN.SCALE * 3 })
		const btn = folder.addButton({ title: "Drop" })

		speedInput.on('change', (speed: any) => {
			if (this.mixer) this.mixer.timeScale = speed.value
		})
		sizeInput.on('change', (size: any) => {
			this.group?.scale.set(size.value, size.value, size.value)
		})
		btn.on('click', () => {
			this.drop()
		})

	}

	drop = () => {
		this.animations?.forEach((anim) => {
			const clip = this.mixer?.clipAction(anim)
			if (clip) {
				clip.loop = THREE.LoopOnce;
				clip.clampWhenFinished = true;
				clip.reset()
				clip.play()
			}
		});
	}

	update = (dt: number = 0) => {
		this.mixer && this.mixer.update(dt)
	}

	destroy = () => {
		this.group && this.scene.remove(this.group)
		raf.unsubscribe(RAFS.TRASHCAN)
	}
}

export default Biases
