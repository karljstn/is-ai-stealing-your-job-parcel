import * as THREE from "three"
import fragment from "~/shaders/fresnel/fragment.glsl"
import vertex from "~/shaders/fresnel/vertex.glsl"

export default class FresnelTorus extends THREE.Mesh {
	constructor(size: number) {
		super()

		this.geometry = new THREE.TorusKnotBufferGeometry(10, 3, 100, 16)
		// this.geometry = new THREE.BoxBufferGeometry(size, size, size)
		// this.geometry = new THREE.SphereBufferGeometry(size, 500, 500)
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
		// this.rotation.z += 0.01
	}
}
