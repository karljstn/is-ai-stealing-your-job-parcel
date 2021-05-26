import * as THREE from "three"
import fragment from "~/shaders/particlesExplosion/fragment.glsl"
import vertex from "~/shaders/particlesExplosion/vertex.glsl"
import t from "~/assets/mort.jpg"
import t1 from "~/assets/mort-2.jpg"
import { ThreeMesh } from "~/interfaces/Three"
import gsap from "gsap"

// console.log(t)


export default class MorphingMesh implements ThreeMesh {
  geometry: THREE.PlaneBufferGeometry
  material: THREE.ShaderMaterial
  object3d: THREE.Points

  constructor() {
    this.geometry = new THREE.PlaneBufferGeometry(480 * 1.9, 820 * 1.9, 480, 820)
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        distortionValue: { value: 0 },
        t: { value: new THREE.TextureLoader().load(t) },
        t1: { value: new THREE.TextureLoader().load(t1) },
        progress: { value: 0 },
        resolution: { value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    this.object3d = new THREE.Points(this.geometry, this.material)

    this.switchAnimation()

    this.update()
  }

  switchAnimation() {
    if (this.material.uniforms.progress.value === 0) {
      gsap.to(this.material.uniforms.distortionValue, {
        duration: 1.5,
        value: 3,
        ease: "power2.inOut",
      })

      gsap.to(this.material.uniforms.progress, {
        duration: 1.5,
        value: 1,
        delay: 0.75,
        ease: "power2.inOut",
      })
      gsap.to(this.material.uniforms.distortionValue, {
        duration: 1.5,
        value: 0,
        ease: "power2.inOut",
        delay: 1.5,
        onComplete: () => {
          setTimeout(() => {
            this.switchAnimation()
          }, 1000)
        },
      })
    } else {
      gsap.to(this.material.uniforms.distortionValue, {
        duration: 1.5,
        value: 3,
        ease: "power2.inOut",
      })

      gsap.to(this.material.uniforms.progress, {
        duration: 1.5,
        value: 0,
        delay: 0.75,
        ease: "power2.inOut",
      })
      gsap.to(this.material.uniforms.distortionValue, {
        duration: 1.5,
        value: 0,
        ease: "power2.inOut",
        delay: 1.5,
        onComplete: () => {
          setTimeout(() => {
            this.switchAnimation()
          }, 1000)
        },
      })
    }
  }

  update(dt = 0) {
    this.material.uniforms.time.value += dt / 100
  }
}
