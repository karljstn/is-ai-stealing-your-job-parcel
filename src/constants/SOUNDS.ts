import { Howl, Howler } from "howler"
import background from '~/assets/Sounds/icial.mp3'
import scrollTo from '~/assets/Sounds/scrollto.mp3'

export const SOUNDS = {
    background: new Howl({
        src: background
    }),
    scrollTo: new Howl({
        src: scrollTo
    })
}