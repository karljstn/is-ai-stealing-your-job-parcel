class RAF {
    callbacks: Map<string, (dt: number) => void>
    prevTime: number
    rafID: number

    constructor() {
        this.callbacks = new Map<string, (dt: number) => void>()
        this.prevTime = 0
        this.rafID = 0
        this.render()
    }

    subscribe = (name: string, callback: (dt: number) => void) => {
        // console.log('subscribe : ', name)
        this.callbacks.set(
            name,
            callback
        )
    }

    unsubscribe = (name: string) => {
        // console.log('unsubscribe : ', name)
        this.callbacks.delete(name)
    }

    render = (time = 0) => {
        this.rafID = requestAnimationFrame(this.render) //TODO: check native time value

        const dt = time - this.prevTime
        this.callbacks.forEach((cb) => cb(dt))

        this.prevTime = time
    }
}

const instance = new RAF()
export default instance

// module.hot.dispose(() => {
//     cancelAnimationFrame(instance.rafID)
// })