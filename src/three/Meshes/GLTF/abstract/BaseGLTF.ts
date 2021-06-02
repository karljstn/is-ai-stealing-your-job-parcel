import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Group,
  Intersection,
  LoopRepeat,
  Material,
  Mesh,
  PerspectiveCamera,
  Raycaster,
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
import MouseController from "~singletons/MouseController";

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
  ON_UPDATE: (binding: any, dt: number) => void;
  ON_RAYCAST: (binding: any) => void;
  ON_CLICK: (binding: any) => void;
  raycaster: Raycaster;
  intersects: Intersection[];

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
    GLTF,
    raycaster,
  }: GLTFConstructor) {
    const {
      MODEL,
      MATERIAL,
      GET_OFFSET_FROM_RECT,
      ON_START,
      ON_UPDATE,
      ON_RAYCAST,
      ON_CLICK,
    } = GLTF;
    this.params = {
      base: {
        offset,
        scale: MODEL.BASE_SCALE,
        idle: GLTF.IDLE ? GLTF.IDLE : { enabled: true, type: IDLE_TYPE.SINUS },
      },
      animation: {
        timeScale: MODEL.ANIMATION_SPEED ? MODEL.ANIMATION_SPEED : 0.0008,
        loop: MODEL.ANIMATION_LOOP ? MODEL.ANIMATION_LOOP : LoopRepeat,
      },
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
    this.ON_UPDATE = ON_UPDATE;
    this.ON_RAYCAST = ON_RAYCAST;
    this.ON_CLICK = ON_CLICK;
    this.raycaster = raycaster;

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
    for (const action of this.actions) {
      action.play();
    }
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

  click = () => this.ON_CLICK(this);

  resize = (e: Event) => {
    this.viewport = getViewport(this.camera);
    if (this.rectElement) this.setFromRect();
  };

  protected update = (dt: number = 0) => {
    this.mixer.update(dt);

    if (this.ON_UPDATE) this.ON_UPDATE(this, dt);

    if (this.ON_RAYCAST) {
      this.raycaster.setFromCamera(MouseController.mouseVec2, this.camera);

      this.intersects = this.raycaster.intersectObjects(
        this.group.children,
        true
      );

      this.ON_RAYCAST(this.intersects);
    }

    if (this.params.base.idle.enabled === true) {
      this.group.rotation.z =
        this.params.base.offset.rotation.z +
        Math.sin(performance.now() * this.params.sinus.frequency) *
          this.params.sinus.amplitude;
    }
  };

  protected setEvents = () => {
    if (this.ON_CLICK) window.addEventListener("click", this.click);
    window.addEventListener("resize", this.resize);
  };
}

export default BaseGLTF;
