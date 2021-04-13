import hand from "~/assets/Models/hand/hand_30_03_v2.glb"
import trashcan from "~/assets/Models/trashcan/v4.glb"
import skeleton from "~/assets/Models/radiologist/skeleton.glb"
import skeletonBaseTex from '~/assets/Games/Radiologist/base.jpg'
import clipboard from "~/assets/Models/radiologist/clipboard.glb"
import radiologistBackground from "~/assets/Models/radiologist/big-cube-bg.glb"
import emoji from "~/assets/Models/emoji-love/emoji.glb"

export const MODELS = {
  HAND: {
    URL: hand,
    SCALE: 0.02,
  },
  TRASHCAN: {
    URL: trashcan,
    SCALE: 0.15,
  },
  SKELETON: {
    URL: skeleton,
    SCALE: 1.5,
    BAKE: skeletonBaseTex
  },
  CLIPBOARD: {
    URL: clipboard,
    SCALE: 0.1,
  },
  EMOJI: {
    URL: emoji,
    SCALE: 0.1,
    // BAKE: emojiBake,
  },
  RADIOLOGIST_BACKGROUND: {
    URL: radiologistBackground,
    SCALE: 1
  }
}
