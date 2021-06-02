import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Group,
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
  IDLE_TYPE,
  MODEL,
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
  MODEL: MODEL;
  MATERIAL: Material;
  GET_OFFSET_FROM_RECT: GET_OFFSET_FROM_RECT;
  ON_START: (group: Group, viewport: Viewport, binding: any) => void;
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

  constructor({ scene, viewport, camera, offset, GLTF }: GLTFConstructor) {
    const { MODEL, MATERIAL, GET_OFFSET_FROM_RECT, ON_START } = GLTF;
    this.params = {
      base: {
        offset,
        scale: MODEL.BASE_SCALE,
        idle: GLTF.IDLE ? GLTF.IDLE : { enabled: true, type: IDLE_TYPE.SINUS },
      },
      animation: { timeScale: MODEL.ANIMATION_SPEED, loop: LoopRepeat },
      sinus: {
        amplitude: 0.12,
        frequency: 0.004,
      },
    };

    this.scene = scene;
    this.viewport = viewport;
    this.camera = camera;
    this.MODEL = MODEL;
    this.MATERIAL = MATERIAL;
    this.GET_OFFSET_FROM_RECT = GET_OFFSET_FROM_RECT;
    this.ON_START = ON_START;

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
          this.mixer.timeScale = this.params.animation.timeScale;

          for (const anim of this.animations) {
            const clipAction = this.mixer.clipAction(anim);
            clipAction.loop = this.params.animation.loop;
            clipAction.clampWhenFinished = true;
            this.actions.push(clipAction);
          }

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

  getFromRect = () => {
    return rectToThree(this.viewport, this.rectElement.getBoundingClientRect());
  };

  setFromRect = () => {
    const { x, y, w, h } = this.getFromRect();
    this.group.position.copy(this.GET_OFFSET_FROM_RECT({ x, y, w, h }));
  };

  resize = (e: Event) => {
    this.viewport = getViewport(this.camera);
    if (this.rectElement) this.setFromRect();
  };

  protected setEvents = () => {
    window.addEventListener("resize", this.resize);
  };
}

export default BaseGLTF;
