import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import LoadManager from "~/three/Singletons/LoadManager";
import { MODELS } from "~/constants/MODELS";
import {
  AnimationAction,
  AnimationClip,
  Color,
  Mesh,
  Object3D,
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
import gsap from "gsap";
import store from "~store";
import { RECTS } from "~constants/RECTS";
import { rectToThree } from "~util";
import { TpChangeEvent } from "tweakpane/dist/types/api/tp-event";
import { ThreeGLTF } from "~interfaces/Three";
import fragment from "~shaders/bakedFresnelEven/fragment.glsl";
import vertex from "~shaders/bakedFresnelEven/vertex.glsl";

class EmojiGlasses implements ThreeGLTF {
  params: any;
  size: number;
  scene: Scene;
  group: THREE.Group | null;
  mixer: THREE.AnimationMixer | null;
  animations: AnimationClip[] | null;
  waveAction: AnimationAction | null;
  loader: GLTFLoader;
  mouse: Vector2;
  viewport: Viewport;
  isMoving: boolean;
  bakedMaterial: ShaderMaterial;
  bakedTexture: Texture;
  originalPos: Vector3;
  pane: Tweakpane | null;
  timeline: Timeline & { to: (targets: gsap.TweenTarget, vars: gsap.TweenVars, position?: gsap.Position | undefined) => any, fromTo: (targets: gsap.TweenTarget, fromVars: gsap.TweenVars, toVars: gsap.TweenVars, position?: gsap.Position | undefined) => any }
  mappedMouse: Vector3

  constructor(size: number, scene: Scene, mouse: Vector2, viewport: Viewport) {
    this.params = {
      animSpeed: 0.005,
      size: MODELS.EMOJI_SAD.SCALE ? size * MODELS.EMOJI_SAD.SCALE : size,
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
    this.size = size;
    this.pane = store.state.tweakpane;
    this.scene = scene;
    this.group = null;
    this.mixer = null;
    this.animations = null;
    this.waveAction = null;
    this.loader = new GLTFLoader(LoadManager.manager);
    this.mouse = mouse;
    this.viewport = viewport;
    this.isMoving = false;
    this.bakedTexture = new TextureLoader().load(MODELS.EMOJI_GLASSES.TEXTURE ? MODELS.EMOJI_GLASSES.TEXTURE : "");
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
    this.timeline = gsap.timeline({ paused: true, onReverseComplete: this.destroy })
    this.mappedMouse = new Vector3()
  }

  load = () => {
    this.loader.load(MODELS.EMOJI_GLASSES.URL, (gltf) => {
      this.group = gltf.scene; // Group

      // Set baked material
      this.group.traverse((object3D) => {
        const mesh = object3D as Mesh;
        if (mesh.material) mesh.material = this.bakedMaterial;
      });
    });

    this.setFromRect()
  };

  setFromRect = () => {
    let rect = store.state.rects.get(RECTS.INTRO.AMIRITE.RIGHT);

    const intervalID = setInterval(() => {
      rect = store.state.rects.get(RECTS.INTRO.AMIRITE.RIGHT);
      if (rect && this.group) {
        clearInterval(intervalID);
        // Upper left
        let { x, y, w, h } = rectToThree(this.viewport, rect);

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
        this.start();
      }
    }, 50);
  }

  start = () => {
    this.tweaks();
    raf.subscribe(RAFS.EMOJIGLASSES, this.update);
    this.in()
  };

  tweaks = () => {
    if (!this.pane) return;

    const mainFolder = this.pane.addFolder({ title: "Emoji", expanded: false });
    const sizeInput = mainFolder.addInput(this.params, "size", {
      label: "Size",
      min: this.size * MODELS.EMOJI_GLASSES.SCALE * 0.33,
      max: this.size * MODELS.EMOJI_GLASSES.SCALE * 3,
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

  in = () => {
    if (!this.group) return

    this.timeline.to(this.group.scale, { x: this.params.size, y: this.params.size, z: this.params.size, duration: 0.2 }, 1)
    this.timeline.fromTo(this.group.position, { x: this.originalPos.x - 0.05, y: this.originalPos.y - 0.05 }, { x: this.originalPos.x, y: this.originalPos.y, duration: 0.2 }, 1)
    this.timeline.play()
  }

  out = () => {
    this.timeline.reverse()
  }

  hover = (toggle: boolean) => {
    if (!this.group) return

    if (toggle) {

      gsap.to(this.group.position, { x: this.mappedMouse.x, y: this.mappedMouse.y, duration: 0.5 });
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

    this.mappedMouse.set(
      (this.mouse.x * this.viewport.width) / 2,
      (this.mouse.y * this.viewport.height) / 2,
      0
    )

    if (this.mappedMouse.distanceTo(this.originalPos) < 0.12) {
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

export default EmojiGlasses;
