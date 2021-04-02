import { Howl, Howler } from "howler"
import background from '~/assets/Sounds/gotye.mp3'

export const SOUNDS = {
    background: new Howl({
        src: background
    })
}