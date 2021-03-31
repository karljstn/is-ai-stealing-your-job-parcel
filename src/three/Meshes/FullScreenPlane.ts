import { PlaneBufferGeometry, ShaderMaterial, IUniform, Mesh, Color, Vector2 } from 'three'
import { Viewport } from "~/types/"
import { ThreeMesh } from '~/interfaces/Three'
import fragment from "~/shaders/fullScreenPlane/fragment.glsl"
import vertex from "~/shaders/fullScreenPlane/vertex.glsl"
import Tweakpane from 'tweakpane'
import { PALETTE } from '~/constants/PALETTE'

class FullScreenPlane implements ThreeMesh {
	viewport: Viewport
	pane: Tweakpane | null

	timeSpeed: number
	uniforms: { [name: string]: IUniform }

	geometry: PlaneBufferGeometry
	material: ShaderMaterial
	object3d: Mesh

	constructor(viewport: Viewport, pane: Tweakpane | null) {
		this.viewport = viewport
		this.pane = pane
		this.timeSpeed = 0.01
		this.uniforms = {
			uTime: { value: 0 },
			uAlpha: { value: 1 },
			uMixFactor: { value: 0 },
			uColorInitial: { value: new Color(PALETTE.ORANGE) },
			uColorFinal: { value: new Color(PALETTE.LIGHTBLUE) },
			uMousePos: { value: new Vector2() },
			uAspectHorizontal: { value: window.innerWidth / window.innerHeight },
			uTargetOffset: { value: new Vector2() },
			uTransitions: { value: false }
		}
		const width = viewport.width * 2;
		const height = viewport.height * 2;
		this.geometry = new PlaneBufferGeometry(width, height, 1, 1)
		this.material = new ShaderMaterial({ uniforms: this.uniforms, vertexShader: vertex, fragmentShader: fragment, transparent: true })
		this.material.depthWrite = false
		this.object3d = new Mesh(this.geometry, this.material)

		this.start()
	}

	start() {
		this.pane && this.pane.addInput(this.uniforms.uMixFactor, 'value', { label: "Loader Mix Factor", min: 0, max: 1 })
		this.object3d.position.setZ(-1)
	}

	toggleTransitions() {
		const value = this.material.uniforms.uTransitions.value
		this.material.uniforms.uTransitions.value = !value;
	}

	update(dt = 0) {
		this.material.uniforms.uTime.value = performance.now()
	}
}

export default FullScreenPlane