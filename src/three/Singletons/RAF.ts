class RAF {
    callbacks: Map<string, (dt: number) => void>
    time: number
    rafID: number

    constructor() {
        this.callbacks = new Map<string, (dt: number) => void>()
        this.time = performance.now()
        this.rafID = 0;
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

    render = () => {
        this.rafID = requestAnimationFrame(this.render) //TODO: check native time value

        const dt = performance.now() - this.time //TODO: instance performance.now()

        this.callbacks.forEach((cb) => cb(dt))

        this.time = performance.now()
    }
}

const instance = new RAF()
export default instance

// module.hot.dispose(() => {
//     cancelAnimationFrame(instance.rafID)
// })