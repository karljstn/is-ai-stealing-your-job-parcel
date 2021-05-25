import handWave from "~assets/Models/hand-wave/Hand-anim-v4.glb";
import handOkay from "~assets/Models/hand-ok/HAND_OK_ANIM_V2.glb";
import trashcan from "~assets/Models/trashcan/v10_POUBELLE_4.glb";
import bakedTrashcan from "~assets/Models/trashcan/bakedTrashcanV2.glb";
import bakedTrashcanTexture from "~assets/Models/trashcan/bake2.jpg";
import clipboard from "~assets/Games/Radiologist/Models/clipboard_1.glb";
import emojiSmile from "~assets/Models/emoji-smile/EMOJI2.glb";
import emojiSmileBake from "~assets/Models/emoji-smile/BAKEDFINAL.jpg";
import emojiGlasses from "~assets/Models/emoji-glasses/EMOJI.glb";
import emojiGlassesBake from "~assets/Models/emoji-glasses/EMOJI1_bake_light.jpg";
import emojiSad from "~assets/Models/emoji-sad/EMOJI_2.glb";
import emojiSadBake from "~assets/Models/emoji-sad/EMOJI2_bake2.jpg";
import emojiDistraught from "~assets/Models/emoji-distraught/EMOJI STUPEUR.glb";
import emojiDistraughtBake from "~assets/Models/emoji-distraught/bake2.jpg";
import emojiCry from "~assets/Models/emoji-cry/EMOJI_larme.glb"
import emojiCryBake from "~assets/Models/emoji-cry/bake_2.jpg"
import crystal from "~assets/Models/crystalball/BOULE_VOYANTE.glb";
import pencil from "~assets/Models/pencil/pencil.glb";
import radiologistBackground from "~assets/Models/radiologist/big-cube-bg.glb"
import arrow from "~assets/Images/fleche.svg"
import slotMachine from "~assets/Models/slot-machine/slot_machine_9.glb"
import here from "~assets/Models/here/HERE.glb"
import questionMark from "~assets/Models/question-mark/QUESTION_MARK.glb"
import penPaper from "~assets/Models/pen-paper/Stylo.glb"
import penPaperBake from "~assets/Models/pen-paper/bake.jpg"
import tree from "~assets/Models/tree/TREE.glb"

export type MODEL = { URL: string, SCALE: number, TEXTURE?: string }
type MODELS = { [name: string]: MODEL }

export const MODELS: MODELS = {
  HAND_WAVE: {
    URL: handWave,
    SCALE: 0.0285,
  },
  TRASHCAN: {
    URL: trashcan,
    SCALE: 0.12,
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
    TEXTURE: emojiSmileBake,
  },
  EMOJI_GLASSES: {
    URL: emojiGlasses,
    SCALE: 0.1,
    TEXTURE: emojiGlassesBake,
  },
  EMOJI_SAD: {
    URL: emojiSad,
    SCALE: 0.1,
    TEXTURE: emojiSadBake,
  },
  EMOJI_DISTRAUGHT: {
    URL: emojiDistraught,
    SCALE: 0.1,
    TEXTURE: emojiDistraughtBake
  },
  EMOJI_CRY: {
    URL: emojiCry,
    SCALE: 0.06,
    TEXTURE: emojiCryBake
  },
  CRYSTAL_BALL: {
    URL: crystal,
    SCALE: 0.075
  },
  PENCIL: {
    URL: pencil,
    SCALE: 0.04,
  },
  RADIOLOGIST_BACKGROUND: {
    URL: radiologistBackground,
    SCALE: 1
  },
  ARROW: {
    URL: arrow,
    SCALE: 1
  },
  SLOT_MACHINE: {
    URL: slotMachine,
    SCALE: 0.15
  },
  HAND_OK: {
    URL: handOkay,
    SCALE: 0.04
  },
  HERE: {
    URL: here,
    SCALE: 0.08
  },
  QUESTION_MARK: {
    URL: questionMark,
    SCALE: 0.1
  },
  PEN_PAPER: {
    URL: penPaper,
    SCALE: 0.02,
    TEXTURE: penPaperBake
  },
  TREE: {
    URL: tree,
    SCALE: 0.03
  }
}
