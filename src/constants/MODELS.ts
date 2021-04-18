import hand from "~/assets/Models/hand/hand_30_03_v2.glb";
import trashcan from "~/assets/Models/trashcan/v5.glb";
import bakedTrashcan from "~/assets/Models/trashcan/bakedTrashcanV2.glb";
import bakedTrashcanTexture from "~/assets/Models/trashcan/bake2.jpg";
import skull from "~/assets/Models/skull/skull.glb";
import clipboard from "~/assets/Models/clipboard/clipboard.glb";
import emoji from "~/assets/Models/emoji-smile/EMOJI2.glb";
import emojiBake from "~/assets/Models/emoji-smile/BAKEDFINAL.jpg";
import crystal from "~/assets/Models/crystalball/BOULE_VOYANTE.glb";

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
  SKULL: {
    URL: skull,
    SCALE: 3,
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
    SCALE: 0.1
  }
};
