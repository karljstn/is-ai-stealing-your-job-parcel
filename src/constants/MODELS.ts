import hand from "~/assets/Models/hand/hand_30_03_v2.glb";
import trashcan from "~/assets/Models/trashcan/v4.glb";
import skull from "~/assets/Models/skull/skull.glb";
import clipboard from "~/assets/Models/clipboard/clipboard.glb";
import emoji from "~/assets/Models/emoji-love/emoji.glb";

export const MODELS = {
  HAND: {
    URL: hand,
    SCALE: 0.02,
  },
  TRASHCAN: {
    URL: trashcan,
    SCALE: 0.15,
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
    // BAKE: emojiBake,
  },
};
