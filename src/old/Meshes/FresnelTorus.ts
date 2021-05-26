import * as THREE from "three"
import fragment from "~/shaders/fresnel/fragment.glsl"
import vertex from "~/shaders/fresnel/vertex.glsl"

export default class FresnelTorus extends THREE.Mesh {
	constructor() {
		super()

		this.geometry = new THREE.TorusKnotBufferGeometry(10, 3, 100, 16)
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertex,
			fragmentShader: fragment,
			transparent: true
		})

		this.userData.name = "FresnelTorus"
		this.scale.set(0.03, 0.03, 0.03)
	}

	destroy() {
		this.geometry.dispose()
	}

	update() {
		this.rotation.x += 0.01
	}
}
