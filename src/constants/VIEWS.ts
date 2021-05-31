import { Vector3 } from "three";
import { GLTF_TYPE, VIEW } from "~types";
import { MATERIALS } from "./MATERIALS";
import { MODELS } from "./MODELS";

export const VIEWS: VIEW[] = [
  {
    ROUTE_NAME: "IntroThreatened",
    LOTTIE: {
      URL: "~/assets/Lottie/6. AI IS.json",
      SCALE: 1,
    },
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.MOUSED,
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
      },
    ],
  },
];
