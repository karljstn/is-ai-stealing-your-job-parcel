import {
  Material,
  PerspectiveCamera,
  Scene,
  Vector3,
  LoopRepeat,
  LoopOnce,
  LoopPingPong,
  Group,
  Raycaster,
  Intersection,
} from "three";
import MainController from "~three/MainController";
import { CustomEase } from "gsap/all";
import Tweakpane from "tweakpane";
import BezierEasing from "bezier-easing";
import ThreeView from "~three/ThreeView";
import BaseGLTF from "~three/Meshes/GLTF/abstract/BaseGLTF";
import TweenGLTF from "~three/Meshes/GLTF/abstract/TweenGLTF";
import MouseTweenGLTF from "~three/Meshes/GLTF/abstract/MouseTweenGLTF";

export type Viewport = {
  height: number;
  width: number;
};

export type MainControllerParams = {
  maxFPS: number;
  readyFPS: boolean;
  averageFPS: number;
  arrFPS: number[];
  scoreFPS: number;
  light: {
    pos: Vector3;
    intensity: number;
    target: Vector3;
  };
  camera: {
    fov: number;
    position: Vector3;
  };
};

export type StoreState = {
  progression: number;
  devMode: {
    enabled: boolean;
    benchmark: boolean;
    loader: boolean;
    tweakpane: boolean;
    forceRadiologist: boolean;
  };
  load: {
    isVueReady: boolean;
    isThreeReady: boolean;
    isLoaderReady: boolean;
    minLoaderDuration: number;
    pauseBeforeLoaderDuration: number;
  };
  eases: Map<string, typeof CustomEase>;
  sceneManager: MainController | null;
  rects: Map<string, DOMRect>;
  tweakpane: Tweakpane | null;
  radiologist: {
    progress: number;
    confirm: boolean;
    confirmCallback: Function | null;
    penalty: Function;
    removeFolder: Function;
    addFolder: Function;
    updateCursor: Function;
    canvasClass: Function;
    gameEnded: boolean;
    results: {
      AIused: number;
      processedFiles: number;
      goodAnswers: number;
    };
  };
  hideScrollDownArrow: boolean;
  darkenScrollDownArrow: boolean;
  isPencilWriting: boolean;
  isPencilFinished: boolean;
  scrollNavigationDelay: number;
  hideLanding: boolean;
};

export enum GLTF_TYPE {
  MOUSED,
  TWEENED,
  WRITING,
}

export enum IDLE_TYPE {
  SINUS,
}

export type IDLE = { enabled: boolean; type?: IDLE_TYPE };

export type GET_OFFSET_FROM_RECT = ({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) => Vector3;

export type VIEW_GLTF = {
  TYPE: GLTF_TYPE;
  MODEL: MODEL;
  GET_OFFSET_FROM_RECT?: GET_OFFSET_FROM_RECT;
  DELAY?: { in: number; out: number };
  MATERIAL?: Material;
  IDLE?: IDLE;
  ON_START?: (
    group: Group,
    viewport: Viewport,
    binding: BaseGLTF | TweenGLTF | MouseTweenGLTF
  ) => void;
  ON_UPDATE?: (
    binding: BaseGLTF | TweenGLTF | MouseTweenGLTF,
    dt?: number
  ) => void;
  ON_RAYCAST?: (
    intersects: Intersection[],
    binding: BaseGLTF | TweenGLTF | MouseTweenGLTF
  ) => void;
  ON_CLICK?: (binding: BaseGLTF | TweenGLTF | MouseTweenGLTF) => void;
};

export type VIEW = {
  ROUTE_NAME: string;
  GLTF_MESHES: VIEW_GLTF[];
  LOTTIE?: { URL: string; SCALE: number };
  ON_START?: (view: ThreeView) => void;
  ON_DESTROY?: (view: ThreeView) => void;
};

export type MODEL = {
  URL: string;
  BASE_SCALE: number;
  TEXTURE?: string;
  ANIMATION_SPEED?: number;
  ANIMATION_LOOP?: typeof LoopRepeat | typeof LoopOnce | typeof LoopPingPong;
};

export type GLTFConstructor = {
  scene: Scene;
  viewport: Viewport;
  camera: PerspectiveCamera;
  GLTF: VIEW_GLTF;
  raycaster: Raycaster;
  offset?: {
    position: Vector3;
    rotation: Vector3;
  };
};

export type ThreeViewConstructor = {
  viewport: Viewport;
  scene: Scene;
  camera: PerspectiveCamera;
  VIEW: VIEW;
  rectElement?: HTMLElement;
  raycaster: Raycaster;
};

export type ThreeMeshTransition = {
  value: number;
  factor: number;
  target: {
    scale: Vector3;
  };
  speed: number;
  delay: {
    in: number;
    out: number;
  };
  duration: number;
  eases: {
    default: ReturnType<typeof BezierEasing>;
  };
  active: boolean;
  timeouts: NodeJS.Timeout[];
};
