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
  Texture,
  TextureLoader,
} from "three";
import Tweakpane from "tweakpane";
import raf from "~three/Singletons/RAF";
import { RAFS } from "~constants/RAFS";
import { ThreeObject } from "~interfaces/Three";

class Emoji {
  params: { animSpeed: number; size: number };
  size: number;
  pane: Tweakpane | null;
  scene: Scene;
  group: THREE.Group | null;
  mixer: THREE.AnimationMixer | null;
  animations: AnimationClip[] | null;
  waveAction: AnimationAction | null;
  loader: GLTFLoader;
  // bakedMaterial: MeshBasicMaterial;
  // bakedTexture: Texture;

  constructor(size: number, pane: Tweakpane | null, scene: Scene) {
    this.params = {
      animSpeed: 0.005,
      size: size * MODELS.EMOJI.SCALE,
    };
    this.size = size;
    this.pane = pane;
    this.scene = scene;
    this.group = null;
    this.mixer = null;
    this.animations = null;
    this.waveAction = null;
    this.loader = new GLTFLoader(LoadManager.manager);
    // this.bakedTexture = new TextureLoader().load(MODELS.EMOJI.BAKE);
    // this.bakedTexture.flipY = false;
    // this.bakedMaterial = new MeshBasicMaterial({ map: this.bakedTexture });
  }

  start = () => {
    this.tweaks();
    raf.subscribe(RAFS.EMOJI, this.update);
  };

  load = () => {
    this.loader.load(MODELS.EMOJI.URL, (gltf) => {
      this.group = gltf.scene;
      this.group.traverse((child) => {
        const mesh = child as Mesh;
        // mesh.material = this.bakedMaterial;
      });
      this.group.scale.set(
        this.params.size,
        this.params.size,
        this.params.size
      );
    });
  };

  tweaks = () => {
    if (this.pane) {
      const sizeInput = this.pane.addInput(this.params, "size", {
        label: "Emoji size",
        min: this.size * MODELS.EMOJI.SCALE * 0.33,
        max: this.size * MODELS.EMOJI.SCALE * 3,
      });

      sizeInput &&
        sizeInput.on("change", (size: any) => {
          this.group?.scale.set(size.value, size.value, size.value);
        });
    } else {
      console.warn("no tweakpane");
    }
  };

  update = (dt: number = 0) => {};

  destroy = () => {
    this.group && this.scene.remove(this.group);
    raf.unsubscribe(RAFS.EMOJI);
  };
}

export default Emoji;
