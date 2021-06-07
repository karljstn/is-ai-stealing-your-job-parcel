import { Howl } from "howler";
import minigameMusic from "~/assets/Sounds/General/music/la_musique_du_jeu_ouais.mp3";
import backgroundMusic from "~/assets/Sounds/General/music/la_musique_du_site_ouais.mp3";
import scrollToThrowYourBiasesAway from "~/assets/Sounds/General/voices/ai/michael/1.scrollto_michael.mp3";

export type SOUND = {
  id: string,
  howl: typeof Howl,
  isUnique: boolean
}

export const SOUNDS : SOUND[] = [
  {
    id: 'backgroundMusic',
    howl: new Howl({
      src: backgroundMusic,
      loop: true,
      volume: 0.01
    }),
    isUnique: true
  },
  {
    id: 'minigameMusic',
    howl: new Howl({
      src: minigameMusic,
      loop: true
    }),
    isUnique: true
  },
  {
    id: 'scrollToThrowYourBiasesAway', 
    howl: new Howl({ 
      src: scrollToThrowYourBiasesAway
    }),
    isUnique: true
  },
]

