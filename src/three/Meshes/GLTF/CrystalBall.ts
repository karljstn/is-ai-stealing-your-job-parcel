import { Color, Group, Mesh, Scene, ShaderMaterial, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import LoadManager from '~/three/Singletons/LoadManager'
import { ThreeGLTF } from "~interfaces/Three";
// import vertex from '~shaders/refraction/vertex.glsl'
// import fragment from '~shaders/refraction/fragment.glsl'
import vertex from '~shaders/fresnel/vertex.glsl'
import fragment from '~shaders/fresnel/fragment.glsl'
import { MODELS } from "~constants/MODELS";
import store from "~store";
import { RECTS } from "~constants/RECTS";
import { rectToThree } from "~util";
import { Viewport } from "~types";
import gsap from 'gsap'
import { PALETTE } from "~constants/PALETTE";
import { RAFS } from "~constants/RAFS";
import raf from "~three/Singletons/RAF";

class CrystalBall implements ThreeGLTF {
	scene: Scene
	viewport: Viewport
	params: any
	group: Group | null
	loader: GLTFLoader
	material: ShaderMaterial
	originalPos: Vector3
	timeline: Timeline

	constructor(scene: Scene, viewport: Viewport) {
		this.scene = scene
		this.viewport = viewport
		this.params = {
			size: MODELS.CRYSTAL_BALL.SCALE,
			rotation: new Vector3()
		}
		this.group = null
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
		this.timeline = gsap.timeline({ paused: true, onReverseComplete: this.destroy })
	}

	load = () => {
		this.loader.load(MODELS.CRYSTAL_BALL.URL, (gltf) => {
			this.group = gltf.scene
			this.group.scale.set(this.params.size, this.params.size, this.params.size)

			this.group.traverse((object3D) => {
				const mesh = object3D as Mesh;
				if (mesh.material) mesh.material = this.material;
			});

			this.setFromRect(RECTS.INTRO.GUESS)
		})
	}

	setFromRect = (rectName: string) => {
		const intervalID = setInterval(() => {
			let rect = store.state.rects.get(rectName);
			if (rect && this.group) {
				clearInterval(intervalID);

				let { x, y, w, } = rectToThree(this.viewport, rect);

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
				this.start()
			}
		}, 50);
	}

	start = () => {
		this.group && this.scene.add(this.group)
		raf.subscribe(RAFS.CRYSTALBALL, this.update);
	}

	update = () => {
		if (this.group) {
			this.group.rotation.z += 0.0020
			this.group.rotation.y += 0.035
		}
	}

	destroy = () => {
		this.group && this.scene.remove(this.group)
	}
}

export default CrystalBall