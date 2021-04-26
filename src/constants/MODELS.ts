import hand from "~/assets/Models/hand/hand_30_03_v2.glb";
import trashcan from "~/assets/Models/trashcan/v5.glb";
import bakedTrashcan from "~/assets/Models/trashcan/bakedTrashcanV2.glb";
import bakedTrashcanTexture from "~/assets/Models/trashcan/bake2.jpg";
import clipboard from "~/assets/Games/Radiologist/Models/clipboard_1.glb";
import emoji from "~/assets/Models/emoji-smile/EMOJI2.glb";
import emojiBake from "~/assets/Models/emoji-smile/BAKEDFINAL.jpg";
import crystal from "~/assets/Models/crystalball/BOULE_VOYANTE.glb";
import pencil from "~/assets/Models/pencil/Stylo_export.glb";
import radiologistBackground from "~/assets/Models/radiologist/big-cube-bg.glb"

export const MODELS = {
  HAND: {
    URL: hand,
    SCALE: 0.02,
  },
  TRASHCAN: {
    URL: trashcan,
    SCALE: 0.15,
  },
  BAKED_TRASHCAN: {
    URL: bakedTrashcan,
    SCALE: 0.15,
    TEXTURE: bakedTrashcanTexture,
  },
  CLIPBOARD: {
    URL: clipboard,
    SCALE: 0.1,
  },
  EMOJI: {
    URL: emoji,
    SCALE: 0.1,
    BAKE: emojiBake,
  },
  CRYSTAL_BALL: {
    URL: crystal,
    SCALE: 0.075
  },
  PENCIL: {
    URL: pencil,
    SCALE: 0.04
  },
  RADIOLOGIST_BACKGROUND: {
    URL: radiologistBackground,
    SCALE: 1
  }
}
