import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import LoadManager from "~/three/Singletons/LoadManager";
import { MODELS } from "~/constants/MODELS";
import {
  AnimationAction,
  AnimationClip,
  Mesh,
  MeshBasicMaterial,
  Scene,
  ShaderMaterial,
  Texture,
  TextureLoader,
  Vector2,
  Vector3,
} from "three";
import Tweakpane from "tweakpane";
import raf from "~three/Singletons/RAF";
import { RAFS } from "~constants/RAFS";
import { Viewport } from "~types";
import gsap from 'gsap'
import store from "~store";
import { RECTS } from "~constants/RECTS";
import { rectToThree } from "~util";
import { TpChangeEvent } from "tweakpane/dist/types/api/tp-event";
import fragment from "~shaders/baked/fragment.glsl"
import vertex from "~shaders/blank/vUv.glsl"

class Emoji {
  params: { animSpeed: number; size: number, pos: { x: number, y: number, z: number }, factor: number, rotation: Vector3, initialPos: Vector3, lightIntensity: number };
  size: number;
  pane: Tweakpane | null;
  scene: Scene;
  group: THREE.Group | null;
  mixer: THREE.AnimationMixer | null;
  animations: AnimationClip[] | null;
  waveAction: AnimationAction | null;
  loader: GLTFLoader;
  mouse: Vector2
  viewport: Viewport
  isMoving: boolean
  bakedMaterial: ShaderMaterial;
  bakedTexture: Texture;
  originalPos: Vector3

  constructor(size: number, pane: Tweakpane | null, scene: Scene, mouse: Vector2, viewport: Viewport) {
    this.params = {
      animSpeed: 0.005,
      size: size * MODELS.EMOJI.SCALE,
      pos: { x: 0, y: 0, z: 0 },
      factor: 0,
      rotation: new Vector3(),
      initialPos: new Vector3(),
      lightIntensity: 0.2
    };
    this.size = size;
    this.pane = pane;
    this.scene = scene;
    this.group = null;
    this.mixer = null;
    this.animations = null;
    this.waveAction = null;
    this.loader = new GLTFLoader(LoadManager.manager);
    this.mouse = mouse
    this.viewport = viewport
    this.isMoving = false
    this.bakedTexture = new TextureLoader().load(MODELS.EMOJI.BAKE);
    this.bakedTexture.flipY = false;
    this.bakedMaterial = new ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms: { uMap: { value: this.bakedTexture }, uLightIntensity: { value: 0.2 } }, });
    this.originalPos = new Vector3()
  }

  load = () => {
    this.loader.load(MODELS.EMOJI.URL, (gltf) => {
      this.group = gltf.scene;
      // const mesh: Mesh = gltf.scene.children[0] as Mesh
      // mesh.material = this.bakedMaterial
      this.group.traverse((object3D) => {
        const mesh = object3D as Mesh
        if (mesh.material) mesh.material = this.bakedMaterial
      })

      this.group.scale.set(
        this.params.size,
        this.params.size,
        this.params.size
      );
    });


    let rect = store.state.rects.get(RECTS.INTRO.HELLO);

    const intervalID = setInterval(() => {
      rect = store.state.rects.get(RECTS.INTRO.HELLO);
      if (rect && this.group) {
        clearInterval(intervalID);
        // Upper left
        let { x, y } = rectToThree(this.viewport, rect);

        // Bottom right
        x += (rect.width / window.innerWidth) * this.viewport.width;
        y -= (rect.height / 2 / window.innerWidth) * this.viewport.height;

        // Small offset
        x += 0.2;
        // y -= rect.height / 4 / window.innerHeight;

        this.originalPos.set(x, y, 0)

        this.group.position.set(x, y, 0);
        this.scene.add(this.group);
        this.start();
      }
    }, 50);
  };

  start = () => {
    this.tweaks();
    raf.subscribe(RAFS.EMOJI, this.update);
  };

  tweaks = () => {
    if (!this.pane) return

    const folder = this.pane.addFolder({ title: 'Emoji', expanded: false })

    const sizeInput = folder.addInput(this.params, "size", {
      label: "Size",
      min: this.size * MODELS.EMOJI.SCALE * 0.33,
      max: this.size * MODELS.EMOJI.SCALE * 3,
    });

    const rotateInput = folder.addInput(this.params, "rotation", {
      label: "Rotation",
      min: 0,
      max: Math.PI,
    });

    const lightInput = folder.addInput(this.params, "lightIntensity", {
      label: "Light",
      min: 0,
      max: 1,
    });

    sizeInput.on("change", (size: TpChangeEvent<number>) => {
      this.group?.scale.set(size.value, size.value, size.value);
    });
    rotateInput.on("change", (rotate: TpChangeEvent<Vector3>) => {
      this.group?.rotateX(rotate.value.x)
      this.group?.rotateY(rotate.value.y)
      this.group?.rotateZ(rotate.value.z)
    });
    lightInput.on("change", (light: TpChangeEvent<number>) => {
      this.group?.traverse((obj) => {
        const mesh = obj as Mesh

        // console.log(mesh)
        if (mesh.material) {
          const mat: ShaderMaterial = mesh.material as ShaderMaterial
          mat.uniforms['uLightIntensity'].value = light.value
        }

      })
    })
  };

  update = (dt: number = 0) => {
    const mouse = new Vector3(this.mouse.x * this.viewport.width / 2, this.mouse.y * this.viewport.height / 2, 0)

    if (this.group) {
      if (mouse.distanceTo(this.group?.position) < 0.12) {
        gsap.to(this.group.position, { x: mouse.x, y: mouse.y, duration: 0.5 })
      } else {
        gsap.to(this.group.position, { x: this.originalPos.x, y: this.originalPos.y, duration: 0.5 })
      }
    }
  };

  destroy = () => {
    this.group && this.scene.remove(this.group);
    raf.unsubscribe(RAFS.EMOJI);
  };
}

export default Emoji;
