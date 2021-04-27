import { Howl, Howler } from "howler"
import background from '~/assets/Sounds/icial.mp3'

export const SOUNDS = {
    background: new Howl({
        src: background
    })
}