import { Howl } from "howler";
import random from "canvas-sketch-util/random";
import AudioController from "~/singletons/AudioController";

// Music
import minigameMusic from "~/assets/Sounds/General/music/soft_with_tictoc_v2.mp3";
import backgroundMusic from "~/assets/Sounds/General/music/la_musique_du_jeu_ouais.mp3";

// FX
import confiant from "~/assets/Sounds/General/fx/Confiant.mp3";
import inquiet from "~/assets/Sounds/General/fx/Inquiet.mp3";
import trashcanScroll from "~/assets/Sounds/General/fx/Poubelle-scroll.mp3";
import trashcanDrop from "~/assets/Sounds/General/fx/Poubelle.mp3";
import slotMachine from "~/assets/Sounds/General/fx/Slot-Machine.mp3";
import pen from "~/assets/Sounds/General/fx/Stylo.mp3";
import wobble from "~/assets/Sounds/General/fx/Wobble.mp3";

// Voices
import scrollToThrowYourBiasesAway from "~/assets/Sounds/General/voices/ai/michael/1.scrollto_michael.mp3";
import scrollToThrowYourBiasesAwayBis from "~/assets/Sounds/General/voices/ai/michael/1bis_scrollto_michael.wav";
import scrollToThrowYourBiasesAwayTri from "~/assets/Sounds/General/voices/ai/michael/1tri_scrollto_michael.wav";
import helloThere from "~/assets/Sounds/General/voices/ai/michael/2_hellothere.wav";
import helloThereBis from "~/assets/Sounds/General/voices/ai/michael/2_hellothere.wav";
import letMeGuess from "~/assets/Sounds/General/voices/ai/michael/3_letmeguess.wav";
import letMeGuessBis from "~/assets/Sounds/General/voices/ai/michael/3bis_letmeguess.wav";
import youreHere from "~/assets/Sounds/General/voices/ai/michael/4_youreherebecauseyou.wav";
import youreHereBis from "~/assets/Sounds/General/voices/ai/michael/4bis_youreherebecauseyou.wav";
import amirite from "~/assets/Sounds/General/voices/ai/michael/5_amirite.wav";
import wellletmetellyou from "~/assets/Sounds/General/voices/ai/michael/6_wellletmetellyou.wav";
import firstandforemost from "~/assets/Sounds/General/voices/ai/michael/7_firstandforemost.wav";
import aiisthestudy from "~/assets/Sounds/General/voices/ai/michael/99_artificialintelligenceis.wav";
import aiisthestudybis from "~/assets/Sounds/General/voices/ai/michael/99bis_artificialintelligenceis.wav";
import ivealreadylostyouhaventi from "~/assets/Sounds/General/voices/ai/michael/999_ivealreadylostyouhaventi.wav";
import ivealreadylostyouhaventibis from "~/assets/Sounds/General/voices/ai/michael/999bis_ivealreadylostyouhaventi.wav";
import devicesthatperceivetheirenvironmentBis from "~/assets/Sounds/General/voices/ai/michael/8bis_devicesthatperceivetheirenvironment.wav";
import basically from "~/assets/Sounds/General/voices/ai/michael/9_basically.wav";
import itcanlearn from "~/assets/Sounds/General/voices/ai/michael/10_itcanlearn.wav";
import itcanlearnbis from "~/assets/Sounds/General/voices/ai/michael/10bis_itcanlearn.wav";
import isartificial from "~/assets/Sounds/General/voices/ai/michael/11_isartificialintelligence.wav";
import inyouropinion from "~/assets/Sounds/General/voices/ai/michael/12_inyouropinionisartificial.wav";
import inyouropinionbis from "~/assets/Sounds/General/voices/ai/michael/12bis_inyouropinionisartficial.wav";
import hardtobelieve from "~/assets/Sounds/General/voices/ai/michael/13_hardtobelieve.wav";
import hardtobelievebis from "~/assets/Sounds/General/voices/ai/michael/13bis_hardtobelieve.wav";
import thisisasimpleexample from "~/assets/Sounds/General/voices/ai/michael/14_thisisasimpleexample.wav";
import thisisasimpleexamplebis from "~/assets/Sounds/General/voices/ai/michael/14bis_thisisasimpleexample.wav";
import heresanarticle from "~/assets/Sounds/General/voices/ai/michael/15_heresanarticle.wav";
import heresanarticlebis from "~/assets/Sounds/General/voices/ai/michael/15bis_heresanarticle.wav";
import inrealitythefutureis from "~/assets/Sounds/General/voices/ai/michael/16_inrealitythefutureisuncertain.wav";
import inrealitythefutureisbis from "~/assets/Sounds/General/voices/ai/michael/16bis_inrealitythe.wav";
import infacteven from "~/assets/Sounds/General/voices/ai/michael/17_infacteven.wav";
import whatdoweknow from "~/assets/Sounds/General/voices/ai/michael/18_whatwedoknowisthttodays.wav";
import inaperfect from "~/assets/Sounds/General/voices/ai/michael/19_inaperfectworld.wav";
import whatsyourtake from "~/assets/Sounds/General/voices/ai/michael/20_whatsyourtakeonthistopic.wav";
import nowwhat from "~/assets/Sounds/General/voices/ai/michael/21_nowwhat.wav";

// Game
import timerend from "~/assets/Sounds/Radiologist/timer-end-1.mp3";
import penalty from "~/assets/Sounds/Radiologist/penalty-1.mp3";
import newfile from "~/assets/Sounds/Radiologist/new-file-1.mp3";

const rand = random;
const voices = { rate: rand.range(0.98, 1.02), volume: 0.8 };

export const musicVolume = { background: 0.28, minigame: 0.25 };

export const getSound = (id: string) => SOUNDS.find((SOUND) => SOUND.id === id);

export const getRandomSource = (sources: any[]) =>
  sources[rand.rangeFloor(0, sources.length)];

export type SOUND = {
  id: string;
  howl: typeof Howl;
  isUnique: boolean;
};

export const SOUNDS: SOUND[] = [
  // Music
  {
    id: "backgroundMusic",
    howl: new Howl({
      src: backgroundMusic,
      loop: true,
      volume: musicVolume.background,
    }),
    isUnique: true,
  },
  {
    id: "minigameMusic",
    howl: new Howl({
      src: minigameMusic,
      loop: true,
      volume: musicVolume.minigame,
    }),
    isUnique: true,
  },
  //FX
  {
    id: "confiant",
    howl: new Howl({
      src: confiant,
      loop: false,
      volume: 0.1,
    }),
    isUnique: false,
  },
  {
    id: "inquiet",
    howl: new Howl({
      src: inquiet,
      loop: false,
      volume: 0.1,
    }),
    isUnique: false,
  },
  {
    id: "trashcanScroll",
    howl: new Howl({
      src: trashcanScroll,
      loop: false,
      volume: 0.2,
    }),
    isUnique: true,
  },
  {
    id: "trashcanDrop",
    howl: new Howl({
      src: trashcanDrop,
      loop: false,
      rate: 0.6,
      volume: 0.3,
    }),
    isUnique: true,
  },
  {
    id: "slotMachine",
    howl: new Howl({
      src: slotMachine,
      loop: false,
      volume: 0.15,
      rate: 0.8,
    }),
    isUnique: true,
  },
  {
    id: "pen",
    howl: new Howl({
      src: pen,
      loop: false,
      volume: 0.6,
    }),
    isUnique: true,
  },
  {
    id: "wobble",
    howl: new Howl({
      src: wobble,
      loop: false,
      volume: 0.12,
    }),
    isUnique: false,
  },
  //Voices
  {
    id: "scrollToThrowYourBiasesAway",
    howl: new Howl({
      src: getRandomSource([
        scrollToThrowYourBiasesAway,
        scrollToThrowYourBiasesAwayBis,
        scrollToThrowYourBiasesAwayTri,
      ]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "helloThere",
    howl: new Howl({
      src: getRandomSource([helloThere, helloThereBis]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "letMeGuess",
    howl: new Howl({
      src: getRandomSource([letMeGuess, letMeGuessBis]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "youreHere",
    howl: new Howl({
      src: getRandomSource([youreHere, youreHereBis]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "amirite",
    howl: new Howl({
      src: amirite,
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "wellletmetellyou",
    howl: new Howl({
      src: wellletmetellyou,
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "firstandforemost",
    howl: new Howl({
      src: firstandforemost,
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "aiisthestudy",
    howl: new Howl({
      src: getRandomSource([aiisthestudy, aiisthestudybis]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "devicesthatperceivetheirenvironment",
    howl: new Howl({
      src: getRandomSource([devicesthatperceivetheirenvironmentBis]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "ivealreadylostyouhaventi",
    howl: new Howl({
      src: getRandomSource([
        ivealreadylostyouhaventi,
        ivealreadylostyouhaventibis,
      ]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "basically",
    howl: new Howl({
      src: basically,
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "itcanlearn",
    howl: new Howl({
      src: getRandomSource([itcanlearn, itcanlearnbis]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "isartificial",
    howl: new Howl({
      src: isartificial,
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "inyouropinion",
    howl: new Howl({
      src: getRandomSource([inyouropinion, inyouropinionbis]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "hardtobelieve",
    howl: new Howl({
      src: getRandomSource([hardtobelieve, hardtobelievebis]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "thisisasimpleexample",
    howl: new Howl({
      src: getRandomSource([thisisasimpleexample, thisisasimpleexamplebis]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "heresanarticle",
    howl: new Howl({
      src: getRandomSource([heresanarticle, heresanarticlebis]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "inrealitythefutureis",
    howl: new Howl({
      src: getRandomSource([inrealitythefutureis, inrealitythefutureisbis]),
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "infacteven",
    howl: new Howl({
      src: infacteven,
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "whatdoweknow",
    howl: new Howl({
      src: whatdoweknow,
      volume: voices.volume,
      rate: voices.rate,
      onend: () => {
        AudioController.play("inaperfect");
      },
    }),
    isUnique: true,
  },
  {
    id: "inaperfect",
    howl: new Howl({
      src: inaperfect,
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "whatsyourtake",
    howl: new Howl({
      src: whatsyourtake,
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  {
    id: "nowwhat",
    howl: new Howl({
      src: nowwhat,
      volume: voices.volume,
      rate: voices.rate,
    }),
    isUnique: true,
  },
  //Game
  {
    id: "penalty",
    howl: new Howl({
      src: penalty,
      volume: 0.5,
    }),
    isUnique: false,
  },
  {
    id: "timerend",
    howl: new Howl({
      src: timerend,
      volume: 0.5,
    }),
    isUnique: false,
  },
  {
    id: "newfile",
    howl: new Howl({
      src: newfile,
      volume: 0.5,
    }),
    isUnique: false,
  },
];
