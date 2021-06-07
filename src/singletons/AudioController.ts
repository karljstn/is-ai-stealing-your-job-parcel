import { SOUNDS, SOUND } from '~/constants/SOUNDS'
// import { Howl } from 'howler'

class AudioController{
    activeSounds: SOUND[]

    constructor(){
        this.activeSounds = []
    }

    play = (id: string) => {
        console.log('zebi');
        
        const sound = SOUNDS.find(SOUND => SOUND.id === id)
        if(!sound) return new Error('azy mec ton son id est pete')

        const active = this.activeSounds.find(activeSound => activeSound.id === sound.id)
        
        if(sound.isUnique && !!active) return null

        this.activeSounds.push(sound)
        sound.howl.play()
        console.log('play')
        
        sound.howl.on('end', () => {
            console.log(this.activeSounds)
            const activeIndex = this.activeSounds.findIndex(activeSound => activeSound.id === sound.id)

            if(activeIndex) this.activeSounds.splice(activeIndex, 1)

            console.log(this.activeSounds)
        });

        return null
    }
}

const instance = new AudioController()
export default instance