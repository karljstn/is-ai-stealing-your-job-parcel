class RAF {
    callbacks: Map<string, (dt: number) => void>
    time: number

    constructor() {
        this.callbacks = new Map<string, (dt: number) => void>()
        this.time = performance.now()
        this.render()
    }

    subscribe = (name: string, callback: (dt: number) => void) => {
        console.log('subscribe : ', name)
        this.callbacks.set(
            name,
            callback
        )
    }

    unsubscribe = (name: string) => {
        console.log('unsubscribe : ', name)
        this.callbacks.delete(name)
    }

    render = () => {
        requestAnimationFrame(this.render)

        const dt = performance.now() - this.time

        this.callbacks.forEach((cb) => cb(dt))

        this.time = performance.now()
    }
}

const instance = new RAF()
export default instance