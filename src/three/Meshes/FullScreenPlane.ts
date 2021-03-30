import { PlaneBufferGeometry, ShaderMaterial, IUniform, Mesh, Color, Vector2 } from 'three'
import { Viewport } from "~/types/"
import { ThreeMesh } from '~/interfaces/Three'
import fragment from "~/shaders/fullScreenPlane/fragment.glsl"
import vertex from "~/shaders/fullScreenPlane/vertex.glsl"

class FullScreenPlane implements ThreeMesh {
	viewport: Viewport

	timeSpeed: number
	uniforms: { [name: string]: IUniform }

	geometry: PlaneBufferGeometry
	material: ShaderMaterial
	object3d: Mesh

	constructor(viewport: Viewport) {
		this.viewport = viewport
		this.timeSpeed = 0.01
		this.uniforms = {
			uTime: { value: 0 },
			uMixFactor: { value: 0 },
			uColorInitial: { value: new Color('#fff') },
			uColorFinal: { value: new Color('#000') },
			uMousePos: { value: new Vector2() },
			uAspectHorizontal: { value: window.innerWidth / window.innerHeight },
			uTargetOffset: { value: new Vector2() }
		}
		this.geometry = new PlaneBufferGeometry(2, 2, 1, 1)
		this.material = new ShaderMaterial({ uniforms: this.uniforms, vertexShader: vertex, fragmentShader: fragment, transparent: true })
		this.object3d = new Mesh(this.geometry, this.material)

		this.start()
	}

	start() {
		this.object3d.position.set(0, 0, 0)
	}

	update(dt = 0) {
		this.material.uniforms.uTime.value = performance.now()
		this.material.uniforms.uTargetOffset.value.set(Math.sin(performance.now() * 0.1), Math.sin(performance.now()) * 0.1)
		// window.
		// console.log(this.material.uniforms.uTargetOffset.value)
	}
}

export default FullScreenPlane