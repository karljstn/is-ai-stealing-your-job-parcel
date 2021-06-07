import { Howl } from "howler";
import minigameMusic from "~/assets/Sounds/General/music/la_musique_du_jeu_ouais.mp3";
import backgroundMusic from "~/assets/Sounds/General/music/la_musique_du_site_ouais.mp3";
import scrollToThrowYourBiasesAway from "~/assets/Sounds/General/voices/ai/michael/1.scrollto_michael.mp3";

export const SOUNDS = {
  backgroundMusic: new Howl({
    src: backgroundMusic,
  }),
  minigameMusic: new Howl({
    src: minigameMusic,
  }),
  scrollToThrowYourBiasesAway: new Howl({ src: scrollToThrowYourBiasesAway }),
};
