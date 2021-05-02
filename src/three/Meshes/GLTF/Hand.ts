import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import LoadManager from '~/three/Singletons/LoadManager'
import { MODELS } from '~/constants/MODELS'
import { AnimationAction, AnimationClip, AnimationMixer, Group, LoopOnce, Scene, Vector2, Vector3 } from "three"
import Tweakpane from "tweakpane"
import raf from "~three/Singletons/RAF"
import { RAFS } from "~constants/RAFS"
import { ThreeGLTF } from "~interfaces/Three"
import store from "~store"
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { RECTS } from "~constants/RECTS";
import TransitionGLTF, { CallbackType } from "./TransitionGLTF"
import { Viewport } from '~types'
import { rectToThree } from '~util'

class Hand extends TransitionGLTF implements ThreeGLTF {
	params: { animation: { speed: number }, size: number }
	original: { position: Vector3 }
	pane: Tweakpane | null
	scene: Scene
	mixer: THREE.AnimationMixer | null
	animations: AnimationClip[] | null
	waveAction: AnimationAction | null
	loader: GLTFLoader
	mouse: Vector3

	constructor(scene: Scene, viewport: Viewport, mouse: Vector3) {
		super(scene, viewport)
		this.params = {
			animation: { speed: 0.002 },
			size: MODELS.HAND.SCALE
		}
		this.original = { position: new Vector3() }
		this.pane = store.state.tweakpane
		this.scene = scene
		this.mixer = null
		this.animations = null
		this.waveAction = null
		this.loader = new GLTFLoader(LoadManager.manager)
		this.mouse = mouse;
	}

	load = () => {
		this.loader.load(MODELS.HAND.URL, (gltf) => {
			this.group = gltf.scene

			this.setFromRect(this.viewport, RECTS.INTRO.HELLO).then(({ x, y, w, h }) => {
				console.log(x, y, w, h)
				const target = new Vector3(x + w - this.viewport.width / 6, y - h / 2, 0)
				this.group.position.copy(target)
				this.original.position.copy(target)
				this.group.scale.set(0, 0, 0)

				// Animations
				this.mixer = new AnimationMixer(this.group)
				this.mixer.timeScale = this.params.animation.speed
				this.animations = gltf.animations
				const clip = AnimationClip.findByName(this.animations, 'ArmatureAction');
				this.waveAction = this.mixer.clipAction(clip)
				this.waveAction.loop = LoopOnce
				this.waveAction.clampWhenFinished = true

				this.start()
			}, (reason) => console.error(reason))
		})
	}

	start = () => {
		this.group && this.scene.add(this.group)
		this.tweaks()
		this.setCallback(CallbackType.ONCOMPLETE, this.wave)
		this.setCallback(CallbackType.ONREVERSECOMPLETE, this.destroy)
		this.in(MODELS.HAND.SCALE, this.original.position, new Vector3(0, 0, 0))
		setTimeout(this.wave, 1000)
	}

	setFromRect = (viewport: Viewport, rectName: string) => new Promise<ReturnType<typeof rectToThree>>((resolve, reject) => {
		const intervalID = setInterval(() => {
			let rect = store.state.rects.get(rectName);
			if (rect && this.group) {
				clearInterval(intervalID);

				resolve(rectToThree(viewport, rect));
			}
		}, 50);

		setTimeout(() => {
			clearInterval(intervalID)
			if (!store.state.rects.get(rectName)) reject("no rect timeout")
		}, 1000);
	})


	tweaks = () => {
		if (!this.pane) return

		const folder = this.pane.addFolder({ title: 'Hand', expanded: false })

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
		this.mixer && this.mixer.update(dt)

		if (this.mouse.distanceTo(this.group.position) <= 0.14 && this.waveAction?.paused) {
			this.wave()
		}
	}

	destroy = () => {
		this.group && this.scene.remove(this.group)
		raf.unsubscribe(RAFS.HAND)
	}
}

export default Hand

