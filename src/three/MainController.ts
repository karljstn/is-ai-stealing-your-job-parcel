import RAF from "~singletons/RAF";
import MouseController from "~singletons/MouseController";
import Tweakpane from "tweakpane";
import {
  AmbientLight,
  Clock,
  DirectionalLight,
  Mesh,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { clamp, getViewport } from "~/util/";
import { MainSceneParams, VIEW, Viewport } from "~/types/";
import store from "~/store";
import { RAFS } from "~constants/RAFS";
import { TpChangeEvent } from "tweakpane/dist/types/api/tp-event";
import Benchmark from "./Benchmark";
import { VIEWS } from "~constants/VIEWS";
import Radio from "./Games/Radiologist/Radio";
import { ViewInterface } from "~interfaces/Three";
import ThreeView from "./ThreeView";

export default class MainController {
  params: MainSceneParams;
  viewport: Viewport;
  w: number;
  h: number;
  pane: Tweakpane | null;

  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  light: DirectionalLight;

  controls: OrbitControls;
  raycaster: Raycaster;
  clock: Clock;
  meshes: Mesh[];
  radio: Radio;

  Benchmark: Benchmark | null;

  threeViews: WeakMap<VIEW, ThreeView>;

  constructor(canvas: HTMLCanvasElement, maxFPS: number) {
    this.params = {
      maxFPS: maxFPS,
      readyFPS: false,
      averageFPS: 0,
      arrFPS: [],
      scoreFPS: 0,
      light: {
        pos: new Vector3(3.1, 0.86, 4.2),
        intensity: 0.51,
        target: new Vector3(),
      },
      camera: {
        fov: 45,
        position: new Vector3(0, 0, 2),
      },
    };
    this.viewport = { width: 0, height: 0 };

    this.w = window.innerWidth;
    this.h = window.innerHeight;
    const paneEl = document.querySelector(".tp-dfwv");

    if (
      !paneEl &&
      (!store.state.devMode.enabled ||
        (store.state.devMode.enabled && store.state.devMode.tweakpane))
    ) {
      store.commit("setPane", new Tweakpane());
      this.pane = store.state.tweakpane;
      // if (store.state.tweakpane) store.state.tweakpane.hidden = true
    } else this.pane = null;

    this.camera = new PerspectiveCamera(75, this.w / this.h, 0.1, 5000);
    this.camera.fov = this.params.camera.fov;
    this.camera.position.copy(this.params.camera.position); //z has to be different than 0 for getViewport to work

    this.scene = new Scene();

    this.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(this.w, this.h);
    this.renderer.setPixelRatio(clamp(window.devicePixelRatio, 1, 2)); //limiter à 2

    // this.composer = new EffectComposer(this.renderer)
    // this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // this.composer.setSize(this.w, this.h)

    // this.renderPass = new RenderPass(this.scene, this.camera)
    // this.composer.addPass(this.renderPass)

    // this.outlinePass = new OutlinePass(new Vector2(this.w, this.h), this.scene, this.camera)
    // this.composer.addPass(this.outlinePass)

    const ambientLight = new AmbientLight("#fff", 0.75);
    this.scene.add(ambientLight);

    this.light = new DirectionalLight("#fff", 0.5);
    this.light.position.set(
      this.params.light.pos.x,
      this.params.light.pos.y,
      this.params.light.pos.z
    );
    this.light.target.position.set(
      this.params.light.target.x,
      this.params.light.target.y,
      this.params.light.target.z
    );
    this.light.intensity = this.params.light.intensity;
    this.scene.add(this.light);
    this.scene.add(this.light.target);

    this.raycaster = new Raycaster();

    this.controls = new OrbitControls(this.camera, canvas);

    this.clock = new Clock(true);
    this.clock.start();
    this.meshes = [];

    this.radio = new Radio(
      this.camera,
      this.raycaster,
      MouseController.mouseVec2,
      this.controls,
      this.pane,
      this.renderer,
      this.clock
    );

    this.resize(); //has to be done before Benchmark

    if (
      !store.state.devMode.enabled ||
      (store.state.devMode.enabled && store.state.devMode.benchmark)
    )
      this.Benchmark = new Benchmark({
        pane: this.pane,
        PARAMS: this.params,
        scene: this.scene,
        renderer: this.renderer,
      });
    else {
      this.Benchmark = null;
    }

    // if (
    //   !store.state.devMode.enabled ||
    //   (store.state.devMode.enabled && store.state.devMode.loader)
    // ) {
    //   this.Loader = new Loader(
    //     this.params.viewport,
    //     this.scene,
    //     this.camera,
    //     this.pane
    //   )
    // } else {
    //   this.Loader = null
    // }

    this.threeViews = new WeakMap();

    // Will be started in Vue
    for (const VIEW of VIEWS) {
      const { viewport, scene, camera, threeViews } = this;
      const ThreeViewObject = new ThreeView({
        viewport,
        scene,
        camera,
        viewData: VIEW,
      });

      threeViews.set(VIEW, ThreeViewObject);
    }

    this.tweaks();
  }

  tweaks = () => {
    if (!this.pane) return;

    const lightFolder = this.pane.addFolder({
      title: "Light",
      expanded: false,
    });
    const lightPosInput = lightFolder.addInput(this.params.light, "pos", {
      label: "Directional light position",
      min: -this.viewport.height / 2,
      max: this.viewport.height / 2,
    });
    const lightIntensityInput = lightFolder.addInput(
      this.params.light,
      "intensity",
      {
        label: "Directional light intensity",
        min: 0,
        max: this.params.light.intensity * 2,
      }
    );

    lightPosInput.on("change", (e: TpChangeEvent<Vector3>) => {
      this.light.position.set(e.value.x, e.value.y, e.value.z);
    });
    lightIntensityInput.on("change", (e: TpChangeEvent<number>) => {
      this.light.intensity = e.value;
    });

    const cameraFolder = this.pane.addFolder({
      title: "Camera",
      expanded: false,
    });
    const fov = cameraFolder.addInput(this.params.camera, "fov", {
      min: 1,
      max: 100,
    });
    const pos = cameraFolder.addInput(this.params.camera, "position");
    fov.on("change", (e: any) => {
      this.camera.fov = e.value;
      this.camera.updateProjectionMatrix();
    });
    pos.on("change", (e: any) => {
      this.camera.position.copy(e.value);
    });
  };

  start = () => {
    this.setEvents();

    if (
      !store.state.devMode.enabled ||
      (store.state.devMode.enabled && store.state.devMode.benchmark)
    )
      this.Benchmark?.tweaks();

    RAF.subscribe(RAFS.MAIN, this.render);

    store.commit("toggleIsThreeReady");
  };

  startRadiologist = () => {
    console.log("start radiologist game");
    this.radio.init();
    this.scene.add(this.radio.group);
  };

  destroyRadiologist = () => {
    this.scene.remove(this.radio.group);
    this.camera.position.copy(this.params.camera.position);
    RAF.unsubscribe("radioUpdate");
  };

  setEvents = () => {
    window.addEventListener("resize", this.resize);
    window.addEventListener("click", this.click);
  };

  resize = () => {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.camera.aspect = this.w / this.h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.w, this.h);
    this.renderer.setPixelRatio(clamp(window.devicePixelRatio, 1, 2));

    // this.composer.setSize(this.w, this.h)

    this.radio.onResize();

    this.viewport = getViewport(this.camera);

    // console.log(this.viewport.width)

    // if (this.Loader)
    //   this.Loader.fullScreenPlane.uniforms.uAspectHorizontal.value =
    //     window.innerWidth / window.innerHeight
  };

  click = () => {
    this.radio.onClick();
  };

  render = (dt = 0) => {
    this.renderer.render(this.scene, this.camera);
    this.Benchmark?.checkFPS(dt);
    MouseController.setFromViewport(this.viewport);
    // this.Loader && this.Loader.update(dt)
    // this.pane && this.pane.refresh()
  };
}

//TODO: on accept, check if class already instanced

// ^
// |
// wtf??
