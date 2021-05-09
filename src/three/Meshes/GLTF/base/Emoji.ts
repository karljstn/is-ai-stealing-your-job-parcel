import * as THREE from "three";
import { MODEL, MODELS } from "~/constants/MODELS";
import {
	AnimationAction,

	Color,
	Mesh,
	Scene,
	ShaderMaterial,
	Texture,
	TextureLoader,
	Vector3,
} from "three";
import raf from "~singletons/RAF";
import { RAFS } from "~constants/RAFS";
import { Viewport } from "~types";
import gsap from "gsap";
import store from "~store";
import { RECTS } from "~constants/RECTS";
import { TpChangeEvent } from "tweakpane/dist/types/api/tp-event";
import { ThreeGLTF } from "~interfaces/Three";
import fragment from "~shaders/bakedFresnelEven/fragment.glsl";
import vertex from "~shaders/bakedFresnelEven/vertex.glsl";
import { Timeline } from "~lib/gsap-member/src/gsap-core";
import TransitionGLTF from "~three/Meshes/GLTF/base/TransitionGLTF";
import MouseController from '~singletons/MouseController'

class Emoji extends TransitionGLTF implements ThreeGLTF {
	params: any;

	RECT: string
	MODEL: MODEL
	rafKey: string
	mixer: THREE.AnimationMixer | null;
	waveAction: AnimationAction | null;
	mouse: Vector3;
	viewport: Viewport;
	isMoving: boolean;
	bakedMaterial: ShaderMaterial;
	bakedTexture: Texture;
	originalPos: Vector3;
	mappedMouse: Vector3
	inDelay: number

	constructor(scene: Scene, viewport: Viewport, MODEL: MODEL, RAF: string, RECT: string, inDelay: number) {
		super(scene, viewport)

		this.params = {
			animSpeed: 0.005,
			size: MODEL.SCALE,
			pos: { x: 0, y: 0, z: 0 },
			factor: 0,
			rotation: new Vector3(0, 0, 0),
			initialPos: new Vector3(),
			lightIntensity: 0.22,
			fresnelColor: new Color("#fff"),
			sinus: {
				amplitude: 0.1,
				frequency: 0.00304
			},
			fresnelWidth: 0.4
		};

		this.RECT = RECT
		this.MODEL = MODEL
		this.rafKey = RAF
		this.mixer = null;
		this.waveAction = null;
		this.mouse = MouseController.mouseVec3;
		this.viewport = viewport;
		this.isMoving = false;
		this.bakedTexture = new TextureLoader().load(`${MODEL.TEXTURE}`);
		this.bakedTexture.flipY = false;
		this.bakedMaterial = new ShaderMaterial({
			vertexShader: vertex,
			fragmentShader: fragment,
			uniforms: {
				uMap: { value: this.bakedTexture },
				uFresnelColor: {
					value: new Color("#fff"),
				},
				uFresnelWidth: {
					value: 0
				}
			},
		});

		this.originalPos = new Vector3();
		this.mappedMouse = new Vector3();
		this.inDelay = inDelay
	}

	initialize = () => this.setFromRect(this.RECT).then(({ x, y, w, h }) => {
		// Center
		x += w / 2
		y -= h / 2

		this.group.position.set(
			x,
			y,
			0
		);
		this.originalPos.copy(this.group.position);
		this.group.rotation.set(
			this.params.rotation.x,
			this.params.rotation.y,
			this.params.rotation.z
		);
		this.group.scale.set(
			0, 0, 0
		);
		this.scene.add(this.group);

		this.setTransition(this.MODEL.SCALE, this.group.position, new Vector3(0, 0, 0), { in: this.inDelay, out: 0 })

		// Set baked material
		this.group.traverse((object3D) => {
			const mesh = object3D as Mesh;
			if (mesh.material) mesh.material = this.bakedMaterial;
		});

		raf.subscribe(this.rafKey, this.update);
		this.in()
	})

	tweaks = () => {
		if (!store.state.tweakpane) return;

		const mainFolder = store.state.tweakpane.addFolder({ title: "Emoji", expanded: false });
		const sizeInput = mainFolder.addInput(this.params, "size", {
			label: "Size",
			min: this.params.size * 0.33,
			max: this.params.size * 3,
		});
		const rotateInput = mainFolder.addInput(this.params, "rotation", {
			label: "Rotation",
			min: 0,
			max: Math.PI,
		});
		mainFolder.addInput(this.params.sinus, "amplitude", { min: 0, max: 0.4, label: "Sinus amplitude" })
		mainFolder.addInput(this.params.sinus, "frequency", {
			label: "Sinus frequency", min: 0, max: 0.01, format: (v) => v.toFixed(4),
		})

		const fresnelFolder = mainFolder.addFolder({ title: "Fresnel", expanded: false })
		const fresnelColorInput = fresnelFolder.addInput(this.params, "fresnelColor", {
			label: "Fresnel",
		});


		const width = fresnelFolder.addInput(this.params, 'fresnelWidth')
		const inButton = mainFolder.addButton({ title: "Anim In" })
		const outButton = mainFolder.addButton({ title: "Anim Out" })

		sizeInput.on("change", (e: TpChangeEvent<number>) => {
			this.group?.scale.set(e.value, e.value, e.value);
		});
		rotateInput.on("change", (e: TpChangeEvent<Vector3>) => {
			if (!this.group) return;

			this.group.rotation.x = e.value.x;
			this.group.rotation.y = e.value.y;
			this.group.rotation.z = e.value.z;
		});
		fresnelColorInput.on("change", (e: TpChangeEvent<Vector3>) => {
			this.group?.traverse((obj) => {
				const mesh = obj as Mesh;

				if (mesh.material) {
					const mat: ShaderMaterial = mesh.material as ShaderMaterial;
					mat.uniforms["uFresnelColor"].value = new Vector3(
						this.params.fresnelColor.r / 255,
						this.params.fresnelColor.g / 255,
						this.params.fresnelColor.b / 255
					);
				}
			});
		});
		width.on("change", (e: any) => {
			this.group?.traverse((obj) => {
				const mesh = obj as Mesh;

				if (mesh.material) {
					const mat: ShaderMaterial = mesh.material as ShaderMaterial;
					mat.uniforms["uFresnelWidth"].value = e.value;
				}
			});
		})
		inButton.on('click', () => {
			this.in()
		})
		outButton.on('click', () => {
			this.out()
		})
	};

	hover = (toggle: boolean) => {
		if (!this.group) return

		if (toggle) {
			gsap.to(this.group.position, {
				x: MouseController.mouseVec3Viewport.x,
				y: MouseController.mouseVec3Viewport.y,
				duration: 0.5
			});
			this.group.traverse((obj) => {
				const mesh = obj as Mesh;
				const mat = mesh.material as ShaderMaterial;

				if (mat) {
					gsap.to(mat.uniforms.uFresnelWidth, { value: 1, duration: 1.2 })
				}
			})
		} else {
			gsap.to(this.group.position, {
				x: this.originalPos.x,
				y: this.originalPos.y,
				duration: 0.5,
			});
			this.group.traverse((obj) => {
				const mesh = obj as Mesh;
				const mat = mesh.material as ShaderMaterial;

				if (mat) {
					gsap.to(mat.uniforms.uFresnelWidth, { value: 0, duration: 0.75 })
				}
			})
		}
	}

	update = (dt: number = 0) => {
		if (!this.group) return

		if (MouseController.mouseVec3Viewport.distanceTo(this.originalPos) < 0.12) {
			this.hover(true)
		} else {
			this.hover(false)
		}

		this.group.rotation.z = Math.sin(performance.now() * this.params.sinus.frequency) * this.params.sinus.amplitude
	};

	destroy = () => {
		this.group && this.scene.remove(this.group);
		raf.unsubscribe(RAFS.EMOJIGLASSES);
	};
}

export default Emoji;
