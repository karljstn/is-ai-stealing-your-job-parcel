import { AnimationAction, Color, Group, Mesh, PerspectiveCamera, Scene, ShaderMaterial, Texture, TextureLoader, Vector3 } from "three";
import { ThreeGLTF } from "~interfaces/Three";
import BaseGLTF from "~three/Meshes/GLTF/abstract/BaseGLTF";
import MouseGLTF from "~three/Meshes/GLTF/abstract/MouseGLTF";
import TweenGLTF from "~three/Meshes/GLTF/abstract/TweenGLTF";
import { MODEL, onRect, Viewport } from "~types";
import fragment from "~shaders/bakedFresnelEven/fragment.glsl";
import vertex from "~shaders/bakedFresnelEven/vertex.glsl";
import { PALETTE } from "~constants/PALETTE";
import RAF from "~singletons/RAF";
import { getViewport, rectToThree } from "~util";

type GLTFConstructor = {
	scene: Scene,
	viewport: Viewport,
	camera: PerspectiveCamera,
	MODEL: MODEL,
	rect?: HTMLElement,
	onRect?: onRect
	delay?: { in: number, out: number },
	offset?: {
		position: Vector3,
		rotation: Vector3
	},
	idle?: boolean
}

export class BasedGLTF extends BaseGLTF implements ThreeGLTF {
	constructor({ scene, viewport, camera }: any) {
		super(scene, viewport, camera)
	}

	initialize() { }

	update() { }

	destroy() { }
}

export class TweenedGLTF extends TweenGLTF implements ThreeGLTF {
	constructor({ scene, viewport, camera }: any) {
		super(scene, viewport, camera)
	}

	initialize() { }

	update() { }

	destroy() { }
}

export class MousedGLTF extends MouseGLTF implements ThreeGLTF {
	params: {
		offset: {
			position: Vector3,
			rotation: Vector3
		},
		size: number,
		sinus: {
			amplitude: 0.1,
			frequency: 0.00304
		},
		fresnel: {
			width: number,
			color: Color
		}
	}

	MODEL: MODEL
	RAFKey: string
	rect: HTMLElement
	onRect: onRect
	delay: { in: number, out: number }
	idle: boolean

	isMoving: boolean;
	originalPos: Vector3;
	mappedMouse: Vector3

	constructor({ scene, viewport, camera, MODEL, rect = null, onRect = null, delay = { in: 0, out: 0 }, offset = { rotation: new Vector3(), position: new Vector3() }, idle = true }: GLTFConstructor) {
		super(scene, viewport, camera)

		this.params = {
			offset,
			size: MODEL.BASE_SCALE,
			sinus: {
				amplitude: 0.1,
				frequency: 0.00304
			},
			fresnel: {
				width: 0.4,
				color: new Color(PALETTE.WHITE),
			}
		}

		this.MODEL = MODEL
		this.RAFKey = (performance.now() * Math.random()).toString()
		this.rect = rect
		this.onRect = onRect
		this.delay = delay
		this.idle = idle

		this.isMoving = false;
		this.originalPos = new Vector3();
		this.mappedMouse = new Vector3();
	}

	initialize = () => {
		if (this.rect) {
			this.manageRect();
		} else {
			this.setTransition(this.MODEL.BASE_SCALE, this.group.position, new Vector3(0, 0, 0), { in: this.delay.in, out: this.delay.out })
		}

		this.group.position.add(this.params.offset.position);
		this.originalPos.copy(this.group.position);
		this.group.rotation.setFromVector3(this.params.offset.rotation)

		// Set baked material
		this.manageMaterial();

		this.scene.add(this.group);
		RAF.subscribe(this.RAFKey, this.update);
		this.tweaks()
		window.addEventListener('resize', this.manageResize)

		this.in()
	}

	tweaks = () => { }

	update = (dt: number = 0) => {
		if (this.idle === false) return
		this.group.rotation.z = this.params.offset.rotation.z + Math.sin(performance.now() * this.params.sinus.frequency) * this.params.sinus.amplitude
	}

	destroy = () => {
		this.scene.remove(this.group);
		window.removeEventListener('resize', this.resize)
		window.removeEventListener('resize', this.manageResize)
		RAF.unsubscribe(this.RAFKey);
	}

	private manageResize = () => {
		// Viewport from constructor seems to be cached, seem to need to resize here instead of parent
		this.viewport = getViewport(this.camera)
		this.manageRect()
	}

	private manageMaterial() {
		// Bake
		if (!this.MODEL.TEXTURE) return
		const bakedTexture = new TextureLoader().load(this.MODEL.TEXTURE);
		bakedTexture.flipY = false;
		const bakedMaterial = new ShaderMaterial({
			vertexShader: vertex,
			fragmentShader: fragment,
			uniforms: {
				uMap: { value: bakedTexture },
				uFresnelColor: {
					value: this.params.fresnel.color,
				},
				uFresnelWidth: {
					value: 0
				}
			},
		});
		this.group.traverse((object3D) => {
			const mesh = object3D as Mesh;
			if (mesh.material)
				mesh.material = bakedMaterial;
		});
	}

	private manageRect() {
		const { x, y, w, h } = rectToThree(this.viewport, this.rect.getBoundingClientRect())

		const hasTransitioned = !this.transition.active && this.transition.factor > 0

		if (hasTransitioned) this.group.scale.setScalar(this.MODEL.BASE_SCALE * h)
		else this.setTransition(this.MODEL.BASE_SCALE * h, this.group.position, new Vector3(0, 0, 0), { in: this.delay.in, out: this.delay.out })

		if (typeof this.onRect !== "function") return
		this.onRect(x, y, w, h, this.group, this.viewport);
	};
}

