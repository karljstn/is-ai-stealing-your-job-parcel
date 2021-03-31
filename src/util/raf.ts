class RAF {

    callbacks: {
        name: string,
        callback: Function
    }[]

    constructor() {
        this.bind()
        this.callbacks = []
        this.render()

    }

    subscribe(name: string, callback: Function) {
        console.log('subscribe')

        this.callbacks.push({
            name: name,
            callback: callback
        })
    }

    unsubscribe(name: string) {
        for (let i = 0; i < this.callbacks.length; i++) {
            if (this.callbacks[i].name == name) this.callbacks.splice(i, i + 1)
        }
    }

    render() {
        requestAnimationFrame(this.render)
        for (let i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i].callback()
        }
    }

    bind() {
        console.log('binding')

        this.subscribe = this.subscribe.bind(this)
        this.unsubscribe = this.unsubscribe.bind(this)
        this.render = this.render.bind(this)

    }
}

const _instance = new RAF()
export default _instance