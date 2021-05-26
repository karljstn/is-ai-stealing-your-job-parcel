import { AnimationClip, Group, PerspectiveCamera, Scene } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Viewport } from "~types"
import LoadManager from '~/three/Singletons/LoadManager'
import store from "~store"
import { getViewport, rectToThree } from "~util"

abstract class BaseGLTF {
	scene: Scene
	viewport: Viewport
	camera: PerspectiveCamera

	group: Group
	animations: AnimationClip[]
	loader: GLTFLoader
	isLoaded: boolean
	rectToThree: ReturnType<typeof rectToThree>
	rectName: string

	constructor(scene: Scene, viewport: Viewport, camera: PerspectiveCamera) {
		this.scene = scene
		this.viewport = viewport
		this.camera = camera

		this.group = new Group()
		this.loader = new GLTFLoader(LoadManager.manager)
		this.isLoaded = false
	}

	load = (url: string) => new Promise<void>((resolve, reject) => {
		this.loader.load(url, (gltf) => {
			gltf.scene.scale.setScalar(0)
			this.group = gltf.scene
			this.animations = gltf.animations
			this.isLoaded = true

			resolve()
		}, () => null, () => reject())
	})

	start = (url: string, cb: () => void) => {
		if (!this.isLoaded) { this.load(url).then(() => { }).then(cb) }
		else { cb() }
	}

	setFromRect = (el: HTMLElement) => rectToThree(this.viewport, el.getBoundingClientRect())


	resize = (e: Event) => {
		this.viewport = getViewport(this.camera)
	}

	setEvents = () => {
		window.addEventListener('resize', this.resize)
	}
}

// class Deux {
// 	params: {
// 		offset: {
// 			position: Vector3,
// 			rotation: Vector3
// 		},
// 		size: number,
// 		sinus: {
// 			amplitude: 0.1,
// 			frequency: 0.00304
// 		},
// 		fresnel: {
// 			width: number,
// 			color: Color
// 		}
// 	}

// 	MODEL: MODEL
// 	RAFKey: string
// 	rect: HTMLElement
// 	onRect: onRect
// 	delay: { in: number, out: number }
// 	idle: boolean

// 	isMoving: boolean;
// 	originalPos: Vector3;
// 	mappedMouse: Vector3

// 	constructor({ scene, viewport, camera, MODEL, rect = null, onRect = null, delay = { in: 0, out: 0 }, offset = { rotation: new Vector3(), position: new Vector3() }, idle = true }: GLTFConstructor) {
// 		super(scene, viewport, camera)

// 		this.params = {
// 			offset,
// 			size: MODEL.BASE_SCALE,
// 			sinus: {
// 				amplitude: 0.1,
// 				frequency: 0.00304
// 			},
// 			fresnel: {
// 				width: 0.4,
// 				color: new Color(PALETTE.WHITE),
// 			}
// 		}

// 		this.MODEL = MODEL
// 		this.RAFKey = (performance.now() * Math.random()).toString()
// 		this.rect = rect
// 		this.onRect = onRect
// 		this.delay = delay
// 		this.idle = idle

// 		this.isMoving = false;
// 		this.originalPos = new Vector3();
// 		this.mappedMouse = new Vector3();
// 	}

// 	initialize = () => {
// 		if (this.rect) {
// 			this.manageRect();
// 		} else {
// 			this.setTransition(this.MODEL.BASE_SCALE, this.group.position, new Vector3(0, 0, 0), { in: this.delay.in, out: this.delay.out })
// 		}

// 		this.group.position.add(this.params.offset.position);
// 		this.originalPos.copy(this.group.position);
// 		this.group.rotation.setFromVector3(this.params.offset.rotation)

// 		// Set baked material
// 		this.manageMaterial();

// 		this.scene.add(this.group);
// 		RAF.subscribe(this.RAFKey, this.update);
// 		this.tweaks()
// 		window.addEventListener('resize', this.manageResize)

// 		this.in()
// 	}

// 	tweaks = () => { }

// 	update = (dt: number = 0) => {
// 		if (this.idle === false) return
// 		this.group.rotation.z = this.params.offset.rotation.z + Math.sin(performance.now() * this.params.sinus.frequency) * this.params.sinus.amplitude
// 	}

// 	destroy = () => {
// 		this.scene.remove(this.group);
// 		window.removeEventListener('resize', this.resize)
// 		window.removeEventListener('resize', this.manageResize)
// 		RAF.unsubscribe(this.RAFKey);
// 	}

// 	private manageResize = () => {
// 		// Viewport from constructor seems to be cached, seem to need to resize here instead of parent
// 		this.viewport = getViewport(this.camera)
// 		this.manageRect()
// 	}

// 	private manageMaterial() {
// 		// Bake
// 		if (!this.MODEL.TEXTURE) return
// 		const bakedTexture = new TextureLoader().load(this.MODEL.TEXTURE);
// 		bakedTexture.flipY = false;
// 		const bakedMaterial = new ShaderMaterial({
// 			vertexShader: vertex,
// 			fragmentShader: fragment,
// 			uniforms: {
// 				uMap: { value: bakedTexture },
// 				uFresnelColor: {
// 					value: this.params.fresnel.color,
// 				},
// 				uFresnelWidth: {
// 					value: 0
// 				}
// 			},
// 		});
// 		this.group.traverse((object3D) => {
// 			const mesh = object3D as Mesh;
// 			if (mesh.material)
// 				mesh.material = bakedMaterial;
// 		});
// 	}

// 	private manageRect() {
// 		const { x, y, w, h } = rectToThree(this.viewport, this.rect.getBoundingClientRect())

// 		const hasTransitioned = !this.transition.active && this.transition.factor > 0

// 		if (hasTransitioned) this.group.scale.setScalar(this.MODEL.BASE_SCALE * h)
// 		else this.setTransition(this.MODEL.BASE_SCALE * h, this.group.position, new Vector3(0, 0, 0), { in: this.delay.in, out: this.delay.out })

// 		if (typeof this.onRect !== "function") return
// 		this.onRect(x, y, w, h, this.group, this.viewport);
// 	};
// }

export default BaseGLTF

