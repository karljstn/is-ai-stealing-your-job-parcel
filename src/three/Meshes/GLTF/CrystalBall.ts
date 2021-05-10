import { Color, Mesh, PointLight, Scene, ShaderMaterial, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import LoadManager from '~/three/Singletons/LoadManager'
import { ThreeGLTF } from "~interfaces/Three";
import { MODELS } from "~constants/MODELS";
import { RECTS } from "~constants/RECTS";
import { Viewport } from "~types";
import { PALETTE } from "~constants/PALETTE";
import TransitionGLTF from "~three/Meshes/GLTF/base/TransitionGLTF";

// import vertex from '~shaders/refraction/vertex.glsl'
// import fragment from '~shaders/refraction/fragment.glsl'
import vertex from '~shaders/fresnel/vertex.glsl'
import fragment from '~shaders/fresnel/fragment.glsl'
import store from "~store";
import { TpChangeEvent } from "tweakpane/dist/types/api/tp-event";

class CrystalBall extends TransitionGLTF implements ThreeGLTF {
	params: any
	loader: GLTFLoader
	material: ShaderMaterial
	originalPos: Vector3
	timeline: any
	light: PointLight

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
		this.params = {
			size: MODELS.CRYSTAL_BALL.SCALE,
			rotation: new Vector3(0.5, -2.5, 0.2)
		}
		this.loader = new GLTFLoader(LoadManager.manager)
		this.material = new ShaderMaterial({
			vertexShader: vertex,
			fragmentShader: fragment,
			uniforms: {
				// uMap: { value: this.texture },
				uFresnelColor: { value: new Color("#000") },
				uBaseColor: { value: new Color(PALETTE.LIGHTPINK) }
			},
		});
		this.originalPos = new Vector3()
		this.light = new PointLight()
		this.light.position.z = 2
		this.light.intensity = 10
	}

	initialize = () => this.setFromRect(RECTS.INTRO.GUESS).then(({ x, y, w, h }) => {
		this.group.position.set(
			x - this.viewport.width / 15,
			y - h / 2 - this.viewport.height / 20,
			0
		);
		this.originalPos.copy(this.group.position);
		this.group.rotation.set(
			this.params.rotation.x,
			this.params.rotation.y,
			this.params.rotation.z
		);
		this.group.scale.setScalar(0)
		this.group.traverse((object3D) => {
			if (object3D.name != "Sphere") return

			const mesh = object3D as Mesh;
			if (mesh.material) mesh.material = this.material;
		});
		this.group && this.scene.add(this.group)


		this.scene.add(this.light)
		// raf.subscribe(RAFS.CRYSTALBALL, this.update);
		this.setTransition(MODELS.CRYSTAL_BALL.SCALE, this.group.position, new Vector3(0, 0, 0),)
		this.in()
		this.tweaks()
	})

	update = () => {
		if (this.group) {
			// this.group.rotation.z += 0.0020
			// this.group.rotation.y += 0.035
		}
	}

	tweaks = () => {
		const folder = store.state.tweakpane.addFolder({ title: 'Crystal ball', expanded: false })
		const rotation = folder.addInput(this.params, 'rotation')
		rotation.on('change', (e: TpChangeEvent<Vector3>) => {
			this.group.rotation.setFromVector3(e.value)
		})
	}

	destroy = () => {
		// this.killTween()
		this.scene.remove(this.light)
		this.scene.remove(this.group)
	}
}

export default CrystalBall