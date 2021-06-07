import { SOUNDS, SOUND, getSound } from "~/constants/SOUNDS";

//TODO: factorize get sound and unique check
class AudioController {
  activeSounds: SOUND[];

  constructor() {
    this.activeSounds = [];
  }

  play = (id: string) => {
    const sound = getSound(id);
    if (!sound) return new Error("wrong sound id");

    const active = this.activeSounds.find(
      (activeSound) => activeSound.id === sound.id
    );
    if (sound.isUnique && !!active) return null; // Already playing and is tagged as isUnique

    this.activeSounds.push(sound);
    sound.howl.play();
    sound.howl.on("end", () => {
      const activeIndex = this.activeSounds.findIndex(
        (activeSound) => activeSound.id === sound.id
      );

      if (activeIndex) this.activeSounds.splice(activeIndex, 1);
    });
  };

  stop = (id: string) => {
    const sound = getSound(id);
    if (!sound) return new Error("wrong sound id");

    const active = this.activeSounds.find(
      (activeSound) => activeSound.id === sound.id
    );
    if (!active) return; // Not playing

    active.howl.stop();
  };
}

const instance = new AudioController();
export default instance;
