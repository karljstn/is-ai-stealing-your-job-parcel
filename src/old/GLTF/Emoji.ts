import * as THREE from "three";
import { MODEL } from "~/constants/MODELS";
import { PALETTE } from "~/constants/PALETTE";
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
import { TpChangeEvent } from "tweakpane/dist/types/api/tp-event";
import { ThreeGLTF } from "~interfaces/Three";
import fragment from "~shaders/bakedFresnelEven/fragment.glsl";
import vertex from "~shaders/bakedFresnelEven/vertex.glsl";
import TweenGLTF from "~three/Meshes/GLTF/abstract/TweenGLTF";
import MouseController from "~singletons/MouseController";

type EmojiArgs = {
  scene: Scene;
  viewport: Viewport;
  MODEL: MODEL;
  RAF: string;
  RECT?: string;
  delay?: { in: number; out: number };
  offset: Vector3;
  rotation?: Vector3;
};

class Emoji extends TweenGLTF implements ThreeGLTF {
  params: any;

  RECT: string;
  MODEL: MODEL;
  tweenRAFKey: string;
  mixer: THREE.AnimationMixer | null;
  waveAction: AnimationAction | null;
  mouse: Vector3;
  viewport: Viewport;
  isMoving: boolean;
  bakedMaterial: ShaderMaterial;
  bakedTexture: Texture;
  originals: Vector3;
  mappedMouse: Vector3;
  delay: { in: number; out: number };
  offset: Vector3;

  constructor({
    scene,
    viewport,
    MODEL,
    RAF,
    RECT = null,
    delay = { in: 0, out: 0 },
    offset,
    rotation = new Vector3(),
  }: EmojiArgs) {
    super(scene, viewport);

    this.params = {
      animSpeed: 0.005,
      size: MODEL.BASE_SCALE,
      pos: { x: 0, y: 0, z: 0 },
      fresnelColor: new Color(PALETTE.WHITE),
      sinus: {
        amplitude: 0.1,
        frequency: 0.00304,
      },
      fresnelWidth: 0.4,
    };

    this.RECT = RECT;
    this.MODEL = MODEL;
    this.tweenRAFKey = RAF;
    this.mixer = null;
    this.waveAction = null;
    this.mouse = MouseController.Vec3;
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
          value: this.params.fresnelColor,
        },
        uFresnelWidth: {
          value: 0,
        },
      },
    });

    this.originalPos = new Vector3();
    this.mappedMouse = new Vector3();
    this.delay = delay;
    this.offset = offset;
  }

  initialize = () => {
    if (this.RECT) {
      this.setFromRect(this.RECT).then(({ x, y, w, h }) => {
        // Center
        x += w / 2;
        y -= h / 2;

        this.group.position.set(
          x + this.offset.x,
          y + this.offset.y,
          0 + this.offset.z
        );
        this.originalPos.copy(this.group.position);
        this.group.rotation.set(
          this.params.rotation.x,
          this.params.rotation.y,
          this.params.rotation.z
        );
        this.scene.add(this.group);
      });
    } else {
      this.group.position.set(this.offset.x, this.offset.y, 0 + this.offset.z);
      this.originalPos.copy(this.group.position);
      this.group.rotation.set(
        this.params.rotation.x,
        this.params.rotation.y,
        this.params.rotation.z
      );
      this.scene.add(this.group);
    }

    this.setTransition(
      this.MODEL.BASE_SCALE,
      this.group.position,
      new Vector3(0, 0, 0),
      { in: this.delay.in, out: this.delay.out }
    );

    // Set baked material
    this.group.traverse((object3D) => {
      const mesh = object3D as Mesh;
      if (mesh.material) mesh.material = this.bakedMaterial;
    });

    raf.subscribe(this.tweenRAFKey, this.update);
    this.in();
    this.tweaks();
  };

  tweaks = () => {
    if (!store.state.tweakpane) return;

    const mainFolder = store.state.tweakpane.addFolder({
      title: "Emoji",
      expanded: false,
    });
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
    mainFolder.addInput(this.params.sinus, "amplitude", {
      min: 0,
      max: 0.4,
      label: "Sinus amplitude",
    });
    mainFolder.addInput(this.params.sinus, "frequency", {
      label: "Sinus frequency",
      min: 0,
      max: 0.01,
      format: (v) => v.toFixed(4),
    });

    const fresnelFolder = mainFolder.addFolder({
      title: "Fresnel",
      expanded: false,
    });
    const fresnelColorInput = fresnelFolder.addInput(
      this.params,
      "fresnelColor",
      {
        label: "Fresnel",
      }
    );

    const width = fresnelFolder.addInput(this.params, "fresnelWidth");
    const inButton = mainFolder.addButton({ title: "Anim In" });
    const outButton = mainFolder.addButton({ title: "Anim Out" });

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
    });
    inButton.on("click", () => {
      this.in();
    });
    outButton.on("click", () => {
      this.out();
    });
  };

  hover = (toggle: boolean) => {
    if (!this.group) return;

    if (toggle) {
      gsap.to(this.group.position, {
        x: MouseController.Vec3Viewport.x,
        y: MouseController.Vec3Viewport.y,
        duration: 0.5,
      });
      this.group.traverse((obj) => {
        const mesh = obj as Mesh;
        const mat = mesh.material as ShaderMaterial;

        if (mat) {
          gsap.to(mat.uniforms.uFresnelWidth, { value: 0.9, duration: 1.2 });
        }
      });
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
          gsap.to(mat.uniforms.uFresnelWidth, { value: 0, duration: 0.75 });
        }
      });
    }
  };

  update = (dt: number = 0) => {
    if (!this.group) return;

    if (MouseController.Vec3Viewport.distanceTo(this.originalPos) < 0.12) {
      this.hover(true);
    } else {
      this.hover(false);
    }

    this.group.rotation.z =
      this.params.rotation.z +
      Math.sin(performance.now() * this.params.sinus.frequency) *
        this.params.sinus.amplitude;
  };

  destroy = () => {
    this.group && this.scene.remove(this.group);
    raf.unsubscribe(RAFS.EMOJIGLASSES);
  };
}

export default Emoji;
