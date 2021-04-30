import * as THREE from 'three'

import fragment from "~/shaders/radiologist/foreground/fragment.glsl"
import vertex from "~/shaders/radiologist/foreground/vertex.glsl"

import grid from '~/assets/Games/Radiologist/grid.jpg'
import lines from '~/assets/Games/Radiologist/lines.png'

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

        const texture = new THREE.TextureLoader().load(lines)
        // texture.repeat.set(10, 10)
        // texture.wrapS = THREE.RepeatWrapping
        // texture.wrapT = THREE.RepeatWrapping

        this.geometry = new THREE.PlaneBufferGeometry(2, 2)
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                size: { value: new THREE.Vector2(params.width, params.height) },
                ratio: { value: this.ratio },
                resolution: { value: new THREE.Vector2(window.innerWidth * params.width, window.innerHeight * params.height) },
                pi: { value: Math.PI },
                uPixelRatio: { value: 1 },
                uRenderTarget: { value: null },
                uLines: { value: 21 },
                uThickness: { value: 0.004 },
                uMap: { value: texture }
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

    init(renderTarget: THREE.WebGLRenderTarget, pixelRatio: number) {
        this.material.uniforms.uRenderTarget.value = renderTarget.texture
        this.material.uniforms.uPixelRatio.value = pixelRatio
    }

    onResize(pixelRatio: number) {
        this.ratio = (window.innerWidth * params.width) / (window.innerHeight * params.height)

        this.material.uniforms.ratio.value = this.ratio
        this.material.uniforms.resolution.value.set(window.innerWidth * params.width, window.innerHeight * params.height)
        this.material.uniforms.uPixelRatio.value = pixelRatio
    }


}
const instance = new Foreground()
export default instance