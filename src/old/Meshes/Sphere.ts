import * as THREE from "three"

export default class Sphere extends THREE.Mesh {
	constructor(size: number) {
		super()

		this.geometry = new THREE.SphereBufferGeometry(size, 30, 30)
		this.material = new THREE.MeshNormalMaterial()
		this.userData.name = "Sphere"
	}

	destroy() {
		this.geometry.dispose()
	}

	update(dt: number) {
		// this.rotation.x += 0.01
		// this.rotation.z += 0.01
		this.position.y += Math.sin(performance.now() * 0.001) * 0.0005
	}
}
