import { Route } from "vue-router";
import { SOUND, getSound, musicVolume } from "~/constants/SOUNDS";
import { getCurrentRoute } from "~router";

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

  manageInitialMusic = () => {
    const currentRoute = getCurrentRoute();

    if (currentRoute.name === "LandingPage") return;
    else if (currentRoute.name !== "GameTwo") {
      // console.log("started from somewhere else than game");
      this.play("backgroundMusic");
    } else {
      // console.log("started from game");
      this.play("minigameMusic");
    }
  };

  manageRouteMusic = (to: Route, from: Route) => {
    // console.log(to, from);
    if (to.name === "LandingPage") {
      // console.log("going to Home");
      getSound("backgroundMusic").howl.fade(musicVolume.background, 0, 1000);
      getSound("minigameMusic").howl.fade(musicVolume.minigame, 0, 1000);
    } else if (to.name === "GameTwo") {
      // console.log("going to to game");
      getSound("backgroundMusic").howl.fade(musicVolume.background, 0, 1000);
      this.play("minigameMusic");
      if (getSound("minigameMusic").howl.volume() === 0)
        getSound("minigameMusic").howl.fade(0, musicVolume.minigame, 1000);
    } else if (to.name !== "GameTwo") {
      // console.log("going to somewhere else than game");
      this.play("backgroundMusic");
      if (getSound("backgroundMusic").howl.volume() === 0)
        getSound("backgroundMusic").howl.fade(0, musicVolume.background, 1000);

      if (
        getSound("minigameMusic").howl.playing() &&
        getSound("minigameMusic").howl.volume() != 0
      ) {
        getSound("minigameMusic").howl.fade(musicVolume.minigame, 0, 500);
      }
    }
  };
}

const instance = new AudioController();
export default instance;
