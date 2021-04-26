import * as THREE from 'three'

import fragment from "~/shaders/radiologist/background/fragment.glsl"
import vertex from "~/shaders/radiologist/background/vertex.glsl"

const params = {
    width: 0.82,
    height: 0.78,
    offsetY: 0.07
}

class Foreground {
    geometry: THREE.PlaneBufferGeometry
    material: THREE.ShaderMaterial

    ratio: number

    mesh: THREE.Mesh

    constructor() {
        this.ratio = (window.innerWidth * params.width) / (window.innerHeight * params.height)

        this.geometry = new THREE.PlaneBufferGeometry(2, 2)
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                size: { value: new THREE.Vector2(1, 1) }
            },
            fragmentShader: fragment,
            vertexShader: vertex,
            // transparent: true,
            depthTest: false
            // depthWrite: false
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.renderOrder = -2
        this.mesh.frustumCulled = false
    }



}
const instance = new Foreground()
export default instance