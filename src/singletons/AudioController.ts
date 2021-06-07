import { SOUNDS, SOUND, getSound } from "~/constants/SOUNDS";
import router from "~router";

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

  manageMusic = () => {
    const getCurrentRoute = () => {
      if (location.hash === "#/") {
        return router.getRoutes().find((route) => route.name === "LandingPage");
      } else {
        return router
          .getRoutes()
          .find((route) => route.path === location.hash.substring(1));
      }
    };

    const currentRoute = getCurrentRoute();

    if (currentRoute.name === "LandingPage") return;

    this.play("backgroundMusic");
  };
}

const instance = new AudioController();
export default instance;
