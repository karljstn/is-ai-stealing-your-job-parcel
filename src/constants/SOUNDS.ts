import { Howl } from "howler";
import background from "~/assets/Sounds/bg_music_begin.mp3";
import scrollTo from "~/assets/Sounds/scrollto.mp3";

export const SOUNDS = {
  background_begin: new Howl({
    src: background,
  }),
  scrollTo: new Howl({
    src: scrollTo,
  }),
};
