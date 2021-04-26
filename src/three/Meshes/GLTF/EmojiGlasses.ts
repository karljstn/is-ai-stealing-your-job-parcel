import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import LoadManager from "~/three/Singletons/LoadManager";
import { MODELS } from "~/constants/MODELS";
import {
  AnimationAction,
  AnimationClip,
  Color,
  Mesh,
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
import fragment from "~shaders/bakedFresnelStep/fragment.glsl";
import vertex from "~shaders/bakedFresnelStep/vertex.glsl";
import { ThreeGLTF } from "~interfaces/Three";


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

  constructor(size: number, scene: Scene, mouse: Vector2, viewport: Viewport) {
    this.params = {
      animSpeed: 0.005,
      size: size * MODELS.EMOJI_GLASSES.SCALE,
      pos: { x: 0, y: 0, z: 0 },
      factor: 0,
      positionOffset: new Vector3(-viewport.width / 3.75, 0, 0),
      rotation: new Vector3(0, 0, 0),
      initialPos: new Vector3(),
      lightIntensity: 0.22,
      fresnelColor: new Color("fff"),
      fresnelFactor: 3.,
      minStep: 0.19,
      maxStep: 3.77,
      fakeLight: new Vector3(3.77, 1.57, 0.57),
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
    this.bakedTexture = new TextureLoader().load(MODELS.EMOJI_GLASSES.BAKE);
    this.bakedTexture.flipY = false;
    this.bakedMaterial = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uMap: { value: this.bakedTexture },
        uFresnelColor: {
          value: new Color("#fff"),
        },
        uPowerOfFactor: {
          value: 1,
        },
        uFresnelWidth: {
          value: 1 - this.params.fresnelWidth
        }
      },
    });

    this.originalPos = new Vector3();
    this.timeline = gsap.timeline({ paused: true, onReverseComplete: this.destroy })
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
    let rect = store.state.rects.get(RECTS.INTRO.AMIRITE);

    const intervalID = setInterval(() => {
      rect = store.state.rects.get(RECTS.INTRO.AMIRITE);
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
    raf.subscribe(RAFS.EMOJISMILE, this.update);
    this.in()
  };

  tweaks = () => {
    if (!this.pane) return;

    const folder = this.pane.addFolder({ title: "Emoji", expanded: false });

    const posOffsetInput = folder.addInput(this.params, "positionOffset", {
      label: "Position Offset",
    });
    const sizeInput = folder.addInput(this.params, "size", {
      label: "Size",
      min: this.size * MODELS.EMOJI_GLASSES.SCALE * 0.33,
      max: this.size * MODELS.EMOJI_GLASSES.SCALE * 3,
    });
    const rotateInput = folder.addInput(this.params, "rotation", {
      label: "Rotation",
      min: 0,
      max: Math.PI,
    });
    const lightInput = folder.addInput(this.params, "lightIntensity", {
      label: "Texture light",
      min: 0,
      max: 1,
    });
    folder.addInput(this.params.sinus, "amplitude", { min: 0, max: 0.4, label: "Sinus amplitude" })
    folder.addInput(this.params.sinus, "frequency", {
      label: "Sinus frequency", min: 0, max: 0.01, format: (v) => v.toFixed(4),
    })

    const fresnelFolder = folder.addFolder({ title: "Fresnel", expanded: false })
    const fresnelColorInput = fresnelFolder.addInput(this.params, "fresnelColor", {
      label: "Fresnel",
    });
    const fresnelIntensityInput = fresnelFolder.addInput(
      this.params,
      "fresnelFactor",
      {
        label: "Fresnel Factor",
        min: 0,
        max: 10,
      }
    );
    const fresnelMaxInput = fresnelFolder.addInput(this.params, "maxStep", {
      label: "Fresnel Max",
      min: 0,
      max: 10,
    });
    const fresnelMin = fresnelFolder.addInput(this.params, "minStep", {
      label: "Fresnel Min",
      min: 0,
      max: 1,
    });
    const fresnelFakeLightInput = fresnelFolder.addInput(this.params, "fakeLight", {
      label: "Fake Light",
    });


    const width = fresnelFolder.addInput(this.params, 'fresnelWidth')

    const inButton = folder.addButton({ title: "Anim In" })
    const outButton = folder.addButton({ title: "Anim Out" })

    posOffsetInput.on("change", (e: TpChangeEvent<Vector3>) => {
      if (!this.group) return;

      this.group.position.set(e.value.x, e.value.y, e.value.z);
    });
    sizeInput.on("change", (e: TpChangeEvent<number>) => {
      this.group?.scale.set(e.value, e.value, e.value);
    });
    rotateInput.on("change", (e: TpChangeEvent<Vector3>) => {
      if (!this.group) return;

      this.group.rotation.x = e.value.x;
      this.group.rotation.y = e.value.y;
      this.group.rotation.z = e.value.z;
    });
    lightInput.on("change", (e: TpChangeEvent<number>) => {
      this.group?.traverse((obj) => {
        const mesh = obj as Mesh;

        if (mesh.material) {
          const mat: ShaderMaterial = mesh.material as ShaderMaterial;
          mat.uniforms["uLightIntensity"].value = e.value;
        }
      });
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
    fresnelIntensityInput.on("change", (e: TpChangeEvent<number>) => {
      this.group?.traverse((obj) => {
        const mesh = obj as Mesh;

        if (mesh.material) {
          const mat: ShaderMaterial = mesh.material as ShaderMaterial;
          mat.uniforms["uPowerOfFactor"].value = e.value;
        }
      });
    });
    fresnelMaxInput.on("change", (e: TpChangeEvent<number>) => {
      this.group?.traverse((obj) => {
        const mesh = obj as Mesh;

        if (mesh.material) {
          const mat: ShaderMaterial = mesh.material as ShaderMaterial;
          mat.uniforms["uMaxStep"].value = e.value;
        }
      });
    });
    fresnelMin.on("change", (e: TpChangeEvent<number>) => {
      this.group?.traverse((obj) => {
        const mesh = obj as Mesh;

        if (mesh.material) {
          const mat: ShaderMaterial = mesh.material as ShaderMaterial;
          mat.uniforms["uMinStep"].value = e.value;
        }
      });
    });
    fresnelFakeLightInput.on("change", (e: TpChangeEvent<Vector3>) => {
      this.group?.traverse((obj) => {
        const mesh = obj as Mesh;

        if (mesh.material) {
          const mat: ShaderMaterial = mesh.material as ShaderMaterial;
          mat.uniforms["uFakeLight"].value = e.value;
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

    this.timeline.to(this.group.scale, { x: this.params.size, y: this.params.size, z: this.params.size, duration: 0.2 }, 2)
    this.timeline.fromTo(this.group.position, { x: this.originalPos.x - 0.05, y: this.originalPos.y - 0.05 }, { x: this.originalPos.x, y: this.originalPos.y, duration: 0.2 }, 2)
    this.timeline.play()
  }

  out = () => {
    this.timeline.reverse()
  }

  update = (dt: number = 0) => {
    if (!this.group) return

    const mouse = new Vector3(
      (this.mouse.x * this.viewport.width) / 2,
      (this.mouse.y * this.viewport.height) / 2,
      0
    );

    if (mouse.distanceTo(this.originalPos) < 0.12) {
      gsap.to(this.group.position, { x: mouse.x, y: mouse.y, duration: 0.5 });
    } else {
      gsap.to(this.group.position, {
        x: this.originalPos.x,
        y: this.originalPos.y,
        duration: 0.5,
      });
    }

    this.group.rotation.z = Math.sin(performance.now() * this.params.sinus.frequency) * this.params.sinus.amplitude
  };

  destroy = () => {
    this.group && this.scene.remove(this.group);
    raf.unsubscribe(RAFS.EMOJISMILE);
  };
}

export default EmojiGlasses;
