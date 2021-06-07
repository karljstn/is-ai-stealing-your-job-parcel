import { MODELS as Models } from "~constants/MODELS";
import { MATERIALS as materials } from "~constants/MATERIALS";
import { PALETTE as colors } from "~constants/PALETTE";
import ThreeView from "~three/ThreeView";
import {
  GET_OFFSET_FROM_RECT,
  GLTF_TYPE,
  IDLE,
  MODEL,
  VIEW_GLTF,
} from "~types";
import { Material, MeshLambertMaterial, Vector3 } from "three";
import BaseGLTF from "~three/Meshes/GLTF/abstract/BaseGLTF";
import TweenGLTF from "~three/Meshes/GLTF/abstract/TweenGLTF";
import MouseTweenGLTF from "~three/Meshes/GLTF/abstract/MouseTweenGLTF";

type RouterViews = {
  [name: string]: {
    meshes: RouterViewMesh[];
    lottie?: {
      url: string;
      baseScale?: number;
      loop?: boolean;
    };
    onStart?: (view: ThreeView) => void;
    onDestroy?: (view: ThreeView) => void;
  };
};

type RouterViewMesh = {
  type: RouterViewMeshType;
  gltfModel?: MODEL;
  transitionDelay?: { in: number; out: number };
  material?: Material;
  idleAnimation?: IDLE;
  getOffsetFromRect?: GET_OFFSET_FROM_RECT;
  onStart?: (binding: BaseGLTF | TweenGLTF | MouseTweenGLTF) => void;
  onUpdate?: (
    binding: BaseGLTF | TweenGLTF | MouseTweenGLTF,
    dt?: number
  ) => void;
  onRaycast?: (binding: BaseGLTF | TweenGLTF | MouseTweenGLTF) => void;
  onClick?: (binding: BaseGLTF | TweenGLTF | MouseTweenGLTF) => void;
};

enum RouterViewMeshType {
  LOOK_AT_MOUSE,
}

const RouterViews: RouterViews = {
  IntroHello: {
    lottie: {url: },
    meshes: [
      {
        type: RouterViewMeshType.LOOK_AT_MOUSE,
        gltfModel: Models.handWave,
        material: new MeshLambertMaterial({ color: colors.orange }),
        getOffsetFromRect: ({ x, y, w, h }) => new Vector3(x + w, y - h, 0),
        transitionDelay: { in: 2, out: 0 },
        onRaycast: (routerViewMesh) => {
          if (!!routerViewMesh.intersects) routerViewMesh.playAllAnims();
        },
      },
    ],
  },
};
