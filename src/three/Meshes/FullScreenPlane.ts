// import { PlaneBufferGeometry, ShaderMaterial, IUniform, Mesh, Color, Vector2, PerspectiveCamera } from 'three'
// import { Viewport } from "~/types/"
// import { ThreeMesh } from '~/interfaces/Three'
// import fragment from "~/shaders/fullScreenPlane/fragment.glsl"
// import vertex from "~/shaders/fullScreenPlane/vertex.glsl"
// import Tweakpane from 'tweakpane'
// import { PALETTE } from '~/constants/PALETTE'
// import { getViewport } from '~util'
// import store from '~store'

// class FullScreenPlane implements ThreeMesh {
// 	viewport: Viewport
// 	pane: Tweakpane | null
// 	camera: PerspectiveCamera

// 	timeSpeed: number


// 	folder: any

// 	constructor(viewport: Viewport, camera: PerspectiveCamera) {
// 		this.viewport = viewport
// 		this.pane = store.state.tweakpane
// 		this.camera = camera
// 		this.timeSpeed = 0.01

// 		this.start()
// 	}

// 	start() {


// 		this.tweaks()

// 		window.addEventListener('resize', this.resize)
// 	}

// 	tweaks() {
// 		if (!this.pane) return
// 		this.folder = this.pane.addFolder({ title: 'Background', expanded: true })
// 		this.folder.addInput(this.uniforms.uMixFactor, 'value', { label: "Mix Factor", min: 0, max: 1 })
// 	}

// 	toggleTransitions() {
// 		const value = this.material.uniforms.uTransitions.value
// 		this.material.uniforms.uTransitions.value = !value;
// 	}

// 	resize = () => {
// 		setTimeout(() => {
// 			const width = getViewport(this.camera).width * 2;
// 			const height = getViewport(this.camera).height * 2;
// 			this.object3d.scale.set(width, height, 0)
// 		}, 1);
// 	}

// 	hide = () => {
// 		this.object3d.visible = false
// 	}

// 	show = () => {
// 		this.object3d.visible = true
// 	}
// }

// export default FullScreenPlane