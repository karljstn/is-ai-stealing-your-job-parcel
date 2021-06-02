import { Group, Vector3 } from "three";
import router from "~router";
import { GLTF_TYPE, VIEW, Viewport } from "~types";
import { MATERIALS } from "./MATERIALS";
import { MODELS } from "./MODELS";

export const VIEWS: VIEW[] = [
  {
    ROUTE_NAME: "LandingPage",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.TWEENED,
        MODEL: MODELS.TRASHCAN,
        IDLE: { enabled: false },
        ON_START: (group: Group, viewport: Viewport) => {
          group.rotateY(-Math.PI / 2);
          group.position.y = -viewport.height / 2.7;
        },
      },
    ],
  },
  {
    ROUTE_NAME: "IntroThreatened",
    LOTTIE: {
      URL: "~/assets/Lottie/6. AI IS.json",
      SCALE: 1,
    },
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.TWEENED,
        MODEL: MODELS.EMOJI_CRY,
        MATERIAL: MATERIALS.GET_FRESNEL_BAKED(MODELS.EMOJI_CRY),
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w / 1.35, y - h / 1.64, 0),
        DELAY: { in: 1.8, out: 0 },
      },
      {
        TYPE: GLTF_TYPE.MOUSED,
        MODEL: MODELS.HERE,
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w / 1.83, y - h / 10, 0),
        DELAY: { in: 0.5, out: 0 },
        ON_START: (group: Group, viewport: Viewport, binding: any) => {
          binding.playAllAnims();
        },
        ON_UPDATE: (binding: any) =>
          binding.group.lookAt(
            binding.mouse.current.x,
            binding.mouse.current.y,
            1
          ),
      },
    ],
  },
  {
    ROUTE_NAME: "DefinitionTwo",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.WRITING,
        MODEL: MODELS.PENCIL,
      },
    ],
  },
  {
    ROUTE_NAME: "GameOne",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.TWEENED,
        MODEL: MODELS.SLOT_MACHINE,
        IDLE: { enabled: false },
        ON_START: (group: Group, viewport: Viewport, binding: any) => {
          group.rotateY(-Math.PI / 2);
          group.rotateY(-Math.PI / 6);
          group.position.y = -viewport.height / 8;

          setTimeout(() => {
            binding.playAllAnims();
          }, 200);
        },
        ON_RAYCAST: (intersects) => {
          if (intersects.length) {
            document.querySelector("html").classList.add("cursor-pointer");
          } else {
            document.querySelector("html").classList.remove("cursor-pointer");
          }
        },
        ON_CLICK: (binding) => {
          if (binding.intersects.length) {
            router.push("13");
            document.querySelector("html").classList.remove("cursor-pointer");
          }
        },
      },
    ],
  },
];
