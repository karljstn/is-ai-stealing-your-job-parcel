import { Howl, Howler } from "howler"
import background from '~/assets/Sounds/bg_v2.mp3'
import scrollTo from '~/assets/Sounds/scrollto_v2.mp3'

export const SOUNDS = {
    background: new Howl({
        src: background
    }),
    scrollTo: new Howl({
        src: scrollTo
    })
}