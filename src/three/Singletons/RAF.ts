class RAF {
    callbacks: {
        name: string,
        callback: Function
    }[]
    time: number

    constructor() {
        this.bind()
        this.callbacks = []
        this.time = performance.now()
        this.render()
    }

    subscribe(name: string, callback: Function) {
        console.log('subscribe : ', name)
        this.callbacks.push({
            name: name,
            callback: callback
        })
    }

    unsubscribe(name: string) {
        console.log('unsubscribe : ', name)
        for (let i = 0; i < this.callbacks.length; i++) {
            if (this.callbacks[i].name == name) this.callbacks.splice(i, i + 1)
        }
    }

    render() {
        requestAnimationFrame(this.render)

        const deltaTime = performance.now() - this.time

        for (let i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i].callback(deltaTime)
        }

        this.time = performance.now()
    }

    bind() {
        this.subscribe = this.subscribe.bind(this)
        this.unsubscribe = this.unsubscribe.bind(this)
        this.render = this.render.bind(this)

    }
}

const instance = new RAF()
export default instance