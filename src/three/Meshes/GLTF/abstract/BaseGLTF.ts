import { AnimationClip, Group, PerspectiveCamera, Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTFConstructor, MODEL, onRect, Viewport } from "~types";
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

  group: Group;
  animations: AnimationClip[];
  loader: GLTFLoader;
  isLoaded: boolean;
  rectToThree: ReturnType<typeof rectToThree>;
  rectName: string;

  constructor({ scene, viewport, camera, offset, MODEL }: GLTFConstructor) {
    this.params = {
      base: {
        offset,
        scale: MODEL.BASE_SCALE,
      },
    };

    this.scene = scene;
    this.viewport = viewport;
    this.camera = camera;
    this.MODEL = MODEL;

    this.group = new Group();
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
          this.isLoaded = true;

          resolve();
        },
        () => null,
        (event: ErrorEvent) => reject(event)
      );
    });

  start = (url: string, cb: () => void) => {
    if (!this.isLoaded) {
      this.load(url)
        .then(() => {})
        .then(cb);
    } else {
      cb();
    }
  };

  setFromRect = (el: HTMLElement) =>
    rectToThree(this.viewport, el.getBoundingClientRect());

  resize = (e: Event) => {
    this.viewport = getViewport(this.camera);
  };

  setEvents = () => {
    window.addEventListener("resize", this.resize);
  };
}

export default BaseGLTF;
