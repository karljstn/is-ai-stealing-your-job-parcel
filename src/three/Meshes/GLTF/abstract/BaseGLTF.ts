import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Group,
  LoopOnce,
  LoopRepeat,
  Material,
  Mesh,
  PerspectiveCamera,
  Scene,
  Vector3,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  GET_OFFSET_FROM_RECT,
  GLTFConstructor,
  MODEL,
  onRect,
  Viewport,
} from "~types";
import LoadManager from "~/three/Singletons/LoadManager";
import { getViewport, rectToThree } from "~util";

abstract class BaseGLTF {
  params: { [name: string]: any };

  scene: Scene;
  viewport: Viewport;
  camera: PerspectiveCamera;
  rectElement: HTMLElement;
  onRect: onRect;
  MODEL: MODEL;
  MATERIAL: Material;
  GET_OFFSET_FROM_RECT: GET_OFFSET_FROM_RECT;
  RAFKey: string;
  originalPos: Vector3;

  group: Group;
  animations: AnimationClip[];
  actions: AnimationAction[];
  mixer: AnimationMixer;
  loader: GLTFLoader;
  isLoaded: boolean;
  rectToThree: ReturnType<typeof rectToThree>;
  rectName: string;

  constructor({
    scene,
    viewport,
    camera,
    offset,
    idle,
    GLTF,
  }: GLTFConstructor) {
    const { MODEL, MATERIAL, GET_OFFSET_FROM_RECT } = GLTF;
    this.params = {
      base: {
        offset,
        scale: MODEL.BASE_SCALE,
        idle,
        animation: { timeScale: MODEL.ANIMATION_SPEED, loop: LoopRepeat },
      },
    };

    this.scene = scene;
    this.viewport = viewport;
    this.camera = camera;
    this.MODEL = MODEL;
    this.MATERIAL = MATERIAL;
    this.GET_OFFSET_FROM_RECT = GET_OFFSET_FROM_RECT;

    this.RAFKey = (performance.now() * Math.random()).toString();
    this.originalPos = new Vector3();
    this.group = new Group();
    this.animations = [];
    this.actions = [];
    this.loader = new GLTFLoader(LoadManager.manager);
    this.isLoaded = false;
  }

  load = (url: string) =>
    new Promise<void>((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => {
          gltf.scene.scale.setScalar(0);
          this.group = gltf.scene;
          this.animations = gltf.animations;

          this.mixer = new AnimationMixer(this.group);
          this.mixer.timeScale = this.params.base.animation.timeScale;
          this.animations.forEach((anim) => {
            if (!this.mixer) return;

            const clipAction = this.mixer.clipAction(anim);
            clipAction.loop = this.params.base.animation.loop;
            clipAction.clampWhenFinished = true;
            this.actions?.push(clipAction);
          });

          this.group.position.add(this.params.base.offset.position);
          this.originalPos.copy(this.group.position);
          this.group.rotation.setFromVector3(this.params.base.offset.rotation);
          this.scene.add(this.group);
          if (this.MATERIAL) this.setMaterial(this.MATERIAL);

          this.isLoaded = true;

          resolve();
        },
        () => null,
        (event: ErrorEvent) => reject(event)
      );
    });

  start = (url: string, cb: () => void) => {
    if (!this.isLoaded) {
      this.load(url).then(cb);
    } else {
      cb();
    }
  };

  playAllAnims = () => {
    this.actions?.forEach((action) => {
      action.play();
    });
  };

  setMaterial = (material: Material) => {
    this.group.traverse((object3D) => {
      const mesh = object3D as Mesh;
      if (mesh.material) mesh.material = material;
    });
  };

  setFromRect = (el: HTMLElement) =>
    rectToThree(this.viewport, el.getBoundingClientRect());

  resize = (e: Event) => {
    this.viewport = getViewport(this.camera);
  };

  protected setEvents = () => {
    window.addEventListener("resize", this.resize);
  };
}

export default BaseGLTF;
