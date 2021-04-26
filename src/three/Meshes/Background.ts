import { Color, IUniform, Mesh, PerspectiveCamera, PlaneBufferGeometry, ShaderMaterial } from "three";
import { Viewport } from "~types";
import vertex from '~shaders/background/vertex.glsl'
import fragment from '~shaders/background/fragment.glsl'
import gsap from "gsap";
import { ThreeMesh } from "~interfaces/Three";
import { getViewport } from "~util";
import store from "~store";
import { PALETTE } from "~constants/PALETTE";

class Background implements ThreeMesh {
	uniforms: { [name: string]: IUniform }

	geometry: PlaneBufferGeometry
	material: ShaderMaterial
	object3d: Mesh

	constructor(camera: PerspectiveCamera) {
		this.uniforms = {
			uMixFactor: { value: 0 },
			uColorInitial: { value: new Color(PALETTE.WHITE) },
			uColorFinal: { value: new Color(PALETTE.PINK) },
		}

		this.material = new ShaderMaterial({ uniforms: this.uniforms, vertexShader: vertex, fragmentShader: fragment, transparent: false })
		this.geometry = new PlaneBufferGeometry(1, 1, 1, 1)

		this.material.depthWrite = false
		this.object3d = new Mesh(this.geometry, this.material)
		this.start(camera)
	}

	start = (camera: PerspectiveCamera) => {
		const width = getViewport(camera).width * 2;
		const height = getViewport(camera).height * 2;

		this.object3d.scale.set(width, height, 0)
		this.object3d.position.setZ(-1)

		this.tweaks()
	}

	fadeFromTo = (from: string, to: string) => {
		this.uniforms.uColorInitial.value = new Color(from)
		this.uniforms.uColorFinal.value = new Color(to)
		this.uniforms.uMixFactor.value = 0

		gsap.to(this.uniforms.uMixFactor, { value: 1, duration: 0.5 })
	}

	tweaks = () => {
		const folder = store.state.tweakpane?.addFolder({ title: 'Background', expanded: false })
		folder?.addInput(this.uniforms.uMixFactor, 'value', { label: "Mix Factor", min: 0, max: 1 })

		const btn = folder?.addButton({ title: "Fade", })
		btn?.on('click', () => {
			this.fadeFromTo(PALETTE.VIOLET, PALETTE.ORANGE)
		})
	}

	update = () => { }

	hide = () => {
		this.object3d.visible = false
	}
}

export default Background