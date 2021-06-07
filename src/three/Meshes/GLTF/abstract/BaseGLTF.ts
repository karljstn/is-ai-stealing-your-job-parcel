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
  ShaderMaterial,
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
import gsap from "gsap";

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
  ON_RAYCAST: (intersection: Intersection[], binding: any) => void;
  ON_CLICK: (binding: any) => void;
  raycaster: Raycaster;
  intersects: Intersection[];

  RAFKey: string;
  group: Group;
  animations: AnimationClip[];
  actions: AnimationAction[];
  mixer: AnimationMixer;
  loader: GLTFLoader;
  isLoaded: boolean;
  rectToThree: ReturnType<typeof rectToThree>;
  rectName: string;
  isResetting: boolean;
  groupOriginalPosition: Vector3;

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
        factor: 1,
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
    this.group = new Group();
    this.animations = [];
    this.actions = [];
    this.loader = new GLTFLoader(LoadManager.manager);
    this.isLoaded = false;
    this.isResetting = false;
  }

  load = (url: string) =>
    new Promise<void>((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => {
          gltf.scene.scale.setScalar(0);
          this.group = gltf.scene;
          this.groupOriginalPosition = this.group.position;

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

  hoverFresnel = (toggle: boolean) => {
    if (!this.group) return;

    if (toggle) {
      this.group.traverse((obj) => {
        const mesh = obj as Mesh;
        const mat = mesh.material as ShaderMaterial;

        if (mat) {
          gsap.to(mat.uniforms.uFresnelWidth, { value: 0.5, duration: 1.2 });
        }
      });
    } else {
      this.group.traverse((obj) => {
        const mesh = obj as Mesh;
        const mat = mesh.material as ShaderMaterial;

        if (mat) {
          gsap.to(mat.uniforms.uFresnelWidth, { value: 0, duration: 0.75 });
        }
      });
    }
  };

  reset = (duration = 0) => {
    this.isResetting = true;
    this.group.traverse((obj) => {
      for (const tween of obj.userData.tweens) {
        tween && tween.kill();
      }

      gsap.to(obj.position, {
        duration,
        x: obj.userData.original.position.x,
        y: obj.userData.original.position.y,
        z: obj.userData.original.position.z,
      });
      gsap.to(obj.rotation, {
        duration,
        x: obj.userData.original.rotation.x,
        y: obj.userData.original.rotation.y,
        z: obj.userData.original.rotation.z,
      });
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
    if (this.GET_OFFSET_FROM_RECT)
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

    this.intersects = this.raycaster.intersectObjects(
      this.group.children,
      true
    );
    if (this.ON_RAYCAST) {
      this.ON_RAYCAST(this.intersects, this);
    }

    if (this.params.base.idle.enabled === true) {
      this.group.rotation.z =
        this.params.base.offset.rotation.z +
        Math.sin(
          performance.now() *
            this.params.sinus.frequency *
            this.params.sinus.factor
        ) *
          this.params.sinus.amplitude *
          this.params.sinus.factor;
    }
  };

  protected setEvents = () => {
    if (this.ON_CLICK) window.addEventListener("click", this.click);
    window.addEventListener("resize", this.resize);
  };
}

export default BaseGLTF;
