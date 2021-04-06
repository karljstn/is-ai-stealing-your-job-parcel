import { PlaneBufferGeometry, ShaderMaterial, IUniform, Mesh, Color, Vector2, PerspectiveCamera } from 'three'
import { Viewport } from "~/types/"
import { ThreeMesh } from '~/interfaces/Three'
import fragment from "~/shaders/fullScreenPlane/fragment.glsl"
import vertex from "~/shaders/fullScreenPlane/vertex.glsl"
import Tweakpane from 'tweakpane'
import { PALETTE } from '~/constants/PALETTE'
import { getViewport } from '~util'

class FullScreenPlane implements ThreeMesh {
	viewport: Viewport
	pane: Tweakpane | null
	camera: PerspectiveCamera

	timeSpeed: number
	uniforms: { [name: string]: IUniform }

	geometry: PlaneBufferGeometry
	material: ShaderMaterial
	object3d: Mesh

	constructor(viewport: Viewport, pane: Tweakpane | null, camera: PerspectiveCamera) {
		this.viewport = viewport
		this.pane = pane
		this.camera = camera
		this.timeSpeed = 0.01
		this.uniforms = {
			uTime: { value: 0 },
			uAlpha: { value: 1 },
			uMixFactor: { value: 0 },
			uColorInitial: { value: new Color(PALETTE.GRAY) },
			uColorFinal: { value: new Color(PALETTE.WHITE) },
			uMousePos: { value: new Vector2() },
			uAspectHorizontal: { value: window.innerWidth / window.innerHeight },
			uTargetOffset: { value: new Vector2() },
			uTransitions: { value: false }
		}
		this.geometry = new PlaneBufferGeometry(1, 1, 1, 1)
		this.material = new ShaderMaterial({ uniforms: this.uniforms, vertexShader: vertex, fragmentShader: fragment, transparent: true })
		this.material.depthWrite = false
		this.object3d = new Mesh(this.geometry, this.material)

		this.start()
	}

	start() {
		const width = getViewport(this.camera).width * 2;
		const height = getViewport(this.camera).height * 2;
		this.object3d.scale.set(width, height, 0)
		this.object3d.position.setZ(-1)

		this.tweaks()

		window.addEventListener('resize', this.resize)
	}

	tweaks() {
		if (!this.pane) return
		const folder = this.pane.addFolder({ title: 'Background', expanded: false })
		folder.addInput(this.uniforms.uMixFactor, 'value', { label: "Loader Mix Factor", min: 0, max: 1 })
	}

	toggleTransitions() {
		const value = this.material.uniforms.uTransitions.value
		this.material.uniforms.uTransitions.value = !value;
	}

	resize = () => {
		setTimeout(() => {
			const width = getViewport(this.camera).width * 2;
			const height = getViewport(this.camera).height * 2;
			this.object3d.scale.set(width, height, 0)
		}, 1);
	}

	hide = () => {
		this.object3d.visible = false
	}

	show = () => {
		this.object3d.visible = true
	}

	update(dt = 0) {
		this.material.uniforms.uTime.value = performance.now()
	}
}

export default FullScreenPlane