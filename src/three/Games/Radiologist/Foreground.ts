import * as THREE from 'three'

import fragment from "~/shaders/radiologist/foreground/fragment.glsl"
import vertex from "~/shaders/radiologist/foreground/vertex.glsl"

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
                size: { value: new THREE.Vector2(params.width, params.height) },
                ratio: { value: this.ratio },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                pi: { value: Math.PI },
                renderTarget: { value: null },
                uLines: { value: 150 },
                uThickness: { value: 0.004 },
            },
            depthTest: false,
            fragmentShader: fragment,
            vertexShader: vertex,

            // depthWrite: false
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.renderOrder = -1
        this.mesh.frustumCulled = false
    }

    init(renderTarget: THREE.WebGLRenderTarget) {
        this.material.uniforms.renderTarget.value = renderTarget.texture
    }

    onResize() {
        this.ratio = (window.innerWidth * params.width) / (window.innerHeight * params.height)

        this.material.uniforms.ratio.value = this.ratio
        this.material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
    }


}
const instance = new Foreground()
export default instance