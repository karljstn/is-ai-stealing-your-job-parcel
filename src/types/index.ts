import { Group, Material, PerspectiveCamera, Scene, Vector3 } from "three";
import MainScene from "~three/MainController";
import { CustomEase } from "gsap/all";
import Tweakpane from "tweakpane";

export type Viewport = {
  height: number;
  width: number;
};

export type MainSceneParams = {
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
  sceneManager: MainScene | null;
  rects: Map<string, DOMRect>;
  tweakpane: Tweakpane | null;
  radiologist: {
    progress: number;
    confirm: boolean;
    confirmCallback: Function | null;
    penalty: Function;
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
  BASE,
  MOUSED,
  TWEENED,
}

export enum IDLE_TYPE {
  SINUS,
}
export type VIEW_MESH = {
  TYPE: GLTF_TYPE
  MODEL: MODEL
  MATERIAL?: Material
};

export type VIEW = {
  ROUTE_NAME: string;
  LOTTIE: { URL: string; SCALE: number };
  MESHES: VIEW_MESH[];
};

export type MODEL = { URL: string; BASE_SCALE: number; TEXTURE?: string };

export type onRect = (
  x: number,
  y: number,
  w: number,
  h: number,
  group: Group,
  viewport: Viewport
) => void;

export type GLTFConstructor = {
  scene: Scene;
  viewport: Viewport;
  camera: PerspectiveCamera;
  MODEL: MODEL;
  MATERIAL: Material;
  rectElement?: HTMLElement;
  onRect?: onRect;
  delay?: { in: number; out: number };
  offset?: {
    position: Vector3;
    rotation: Vector3;
  };
  idle?: { enabled: boolean; type: IDLE_TYPE };
};
