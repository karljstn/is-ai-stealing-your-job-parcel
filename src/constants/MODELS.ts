import hand from "~/assets/Models/hand/hand_30_03_v2.glb";
import trashcan from "~/assets/Models/trashcan/v5.glb";
import bakedTrashcan from "~/assets/Models/trashcan/bakedTrashcanV2.glb";
import bakedTrashcanTexture from "~/assets/Models/trashcan/bake2.jpg";
import clipboard from "~/assets/Games/Radiologist/Models/clipboard_1.glb";
import emojiSmile from "~/assets/Models/emoji-smile/EMOJI2.glb";
import emojiSmileBake from "~/assets/Models/emoji-smile/BAKEDFINAL.jpg";
import emojiGlasses from "~/assets/Models/emoji-glasses/EMOJI.glb";
import emojiGlassesBake from "~/assets/Models/emoji-glasses/EMOJI1_bake_light.jpg";
import emojiSad from "~/assets/Models/emoji-sad/EMOJI_2.glb";
import emojiSadBake from "~/assets/Models/emoji-sad/EMOJI2_bake2.jpg";
import crystal from "~/assets/Models/crystalball/BOULE_VOYANTE.glb";
import pencil from "~/assets/Models/pencil/pencil.glb";
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
  EMOJI_SMILE: {
    URL: emojiSmile,
    SCALE: 0.1,
    BAKE: emojiSmileBake,
  },
  EMOJI_GLASSES: {
    URL: emojiGlasses,
    SCALE: 0.1,
    BAKE: emojiGlassesBake,
  },
  EMOJI_SAD: {
    URL: emojiSad,
    SCALE: 0.1,
    BAKE: emojiSadBake,
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
