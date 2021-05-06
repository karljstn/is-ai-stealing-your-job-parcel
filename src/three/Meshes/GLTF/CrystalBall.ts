import { Color, Mesh, Scene, ShaderMaterial, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import LoadManager from '~/three/Singletons/LoadManager'
import { ThreeGLTF } from "~interfaces/Three";
import { MODELS } from "~constants/MODELS";
import { RECTS } from "~constants/RECTS";
import { Viewport } from "~types";
import { PALETTE } from "~constants/PALETTE";
import TransitionGLTF, { CallbackType } from "./base/TransitionGLTF";

// import vertex from '~shaders/refraction/vertex.glsl'
// import fragment from '~shaders/refraction/fragment.glsl'
import vertex from '~shaders/fresnel/vertex.glsl'
import fragment from '~shaders/fresnel/fragment.glsl'

class CrystalBall extends TransitionGLTF implements ThreeGLTF {
	params: any
	loader: GLTFLoader
	material: ShaderMaterial
	originalPos: Vector3
	timeline: any

	constructor(scene: Scene, viewport: Viewport) {
		super(scene, viewport)
		this.params = {
			size: MODELS.CRYSTAL_BALL.SCALE,
			rotation: new Vector3()
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
	}

	initialize = () => this.setFromRect(RECTS.INTRO.GUESS).then(({ x, y, w, h }) => {
		this.group.position.set(
			x + w,
			y,
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
			const mesh = object3D as Mesh;
			if (mesh.material) mesh.material = this.material;
		});

		this.group && this.scene.add(this.group)
		// raf.subscribe(RAFS.CRYSTALBALL, this.update);

		this.setCallback(CallbackType.ONREVERSECOMPLETE, this.destroy)
		this.setTransition(MODELS.CRYSTAL_BALL.SCALE, this.group.position, new Vector3(0, 0, 0), 0)

		this.in()
	})

	update = () => {
		if (this.group) {
			// this.group.rotation.z += 0.0020
			// this.group.rotation.y += 0.035
		}
	}

	destroy = () => {
		this.group && this.scene.remove(this.group)
	}
}

export default CrystalBall