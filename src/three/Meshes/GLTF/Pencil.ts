import { Group, Object3D, Scene, Vector2, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import LoadManager from '~/three/Singletons/LoadManager'
import { ThreeGLTF } from "~interfaces/Three";
import { MODELS } from "~constants/MODELS";
import { Viewport } from "~types";
import store from "~store";
import { TpChangeEvent } from "tweakpane/dist/types/api/tp-event";
import { timeStamp } from "node:console";
import { clamp, map } from "~util";
import BezierEasing from 'bezier-easing'
import TransitionGLTF, { CallbackType } from "./base/TransitionGLTF";
import raf from '~singletons/RAF'
import { RAFS } from "~constants/RAFS";

class Pencil extends TransitionGLTF implements ThreeGLTF {
	params: any
	mouse: Vector3
	eventData: any

	constructor(scene: Scene, viewport: Viewport, mouse: Vector3) {
		super(scene, viewport)
		this.scene = scene
		this.viewport = viewport
		this.mouse = mouse
		this.params = {
			size: MODELS.PENCIL.SCALE,
			rotation: {
				resting: new Vector3(Math.PI, 0, Math.PI * 0.3),
				writing: new Vector3(Math.PI * 1.2, 0, Math.PI * 0.2),
				target: new Vector3(),
				factor: 0
			},
			eventData: {
				mouseDown: {
					factor: 0,
					speed: 0.04
				}
			},
			eases: {
				rotation: new BezierEasing(.61, .27, .78, .99)
			}
		}

		this.load(MODELS.PENCIL.URL)
	}

	initialize = () => {
		this.group.scale.set(0, 0, 0)
		this.group.rotation.setFromVector3(this.params.rotation.resting)

		this.setCallback(CallbackType.ONREVERSECOMPLETE, this.destroy)
		this.setTransition(MODELS.PENCIL.SCALE, this.group.position, new Vector3(0, 0, 0), 0)

		this.group && this.scene.add(this.group)
		this.tweaks()
		this.setEvents()

		raf.subscribe(RAFS.PENCIL, this.update);
	}

	update = (dt: number) => {
		if (!this.group) return

		const mouse = new Vector3(
			(this.mouse.x * this.viewport.width) / 2,
			(this.mouse.y * this.viewport.height) / 2,
			0
		);

		this.group.position.lerp(mouse, 0.8)

		const f = this.params.rotation.factor
		if (f >= 0 && f <= 1) this.params.rotation.factor = clamp(f + this.params.eventData.mouseDown.factor, 0, 1)

		const prev: Vector3 = this.params.rotation.resting
		const current: Vector3 = this.params.rotation.writing
		const target: Vector3 = this.params.rotation.target.copy(prev).lerp(current, this.params.eases.rotation(this.params.rotation.factor))

		this.group.rotation.setFromVector3(target)

		if (f === 1 && !store.state.isPencilWriting) store.commit('setPencilWriting', true)
		else if (store.state.isPencilWriting) store.commit('setPencilWriting', false)
	}

	tweaks = () => {
		const folder = store.state.tweakpane?.addFolder({ title: 'Pencil', expanded: false })

		const rotationInput = folder?.addInput(this.params.rotation, 'resting', { label: "Rotation" })
		const sizeInput = folder?.addInput(this.params, 'size', { label: "Hand size", min: MODELS.PENCIL.SCALE * 0.2, max: MODELS.PENCIL.SCALE * 2 })

		rotationInput?.on('change', (rotation: TpChangeEvent<Vector3>) => {
			this.group?.rotation.setFromVector3(rotation.value)
		})
		sizeInput?.on('change', (size: any) => {
			this.group?.scale.set(size.value, size.value, size.value)
		})
	}

	setEvents = () => {
		const onMouseDown = (e: MouseEvent) => {
			this.params.eventData.mouseDown.factor = this.params.eventData.mouseDown.speed
		}
		const onMouseUp = (e: MouseEvent) => {
			this.params.eventData.mouseDown.factor = -this.params.eventData.mouseDown.speed * 1.3
		}
		const onMouseMove = () => {
			if (this.group.scale.length() === 0) this.in()
		}

		window.addEventListener("mousedown", onMouseDown)
		window.addEventListener("mouseup", onMouseUp)
		window.addEventListener('mousemove', onMouseMove)
	}

	destroy = () => {
		this.group && this.scene.remove(this.group)
		raf.unsubscribe(RAFS.PENCIL)
	}


}

export default Pencil