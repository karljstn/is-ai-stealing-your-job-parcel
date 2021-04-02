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
  Vector,
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

class Emoji {
  params: { animSpeed: number; size: number, pos: {x: number, y: number, z: number}, factor: number, initialPos: Vector3 };
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
  // bakedMaterial: MeshBasicMaterial;
  // bakedTexture: Texture;

  constructor(size: number, pane: Tweakpane | null, scene: Scene, mouse: Vector2, viewport: Viewport) {
    this.params = {
      animSpeed: 0.005,
      size: size * MODELS.EMOJI.SCALE,
      pos: {x: 0, y: 0, z:0},
      factor: 0,
      initialPos: new Vector3()
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
    // this.bakedTexture = new TextureLoader().load(MODELS.EMOJI.BAKE);
    // this.bakedTexture.flipY = false;
    // this.bakedMaterial = new MeshBasicMaterial({ map: this.bakedTexture });
  }

  load = () => {
    this.loader.load(MODELS.EMOJI.URL, (gltf) => {
      this.group = gltf.scene;
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
        x += 0.1;
        y -= rect.height / 4 / window.innerHeight;

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

  update = (dt: number = 0) => {
    const mouse = new Vector3(this.mouse.x * this.viewport.width / 2, this.mouse.y * this.viewport.height / 2, 0)

    if(this.group){
      if(mouse.distanceTo(this.group?.position) < 0.12){
        gsap.to(this.group.position, {x: mouse.x, y:mouse.y, duration: 0.5})
      }else{

      }
    }
  };

  destroy = () => {
    this.group && this.scene.remove(this.group);
    raf.unsubscribe(RAFS.EMOJI);
  };
}

export default Emoji;
