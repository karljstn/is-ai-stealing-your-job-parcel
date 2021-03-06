import { Vector2, Vector3 } from "three"
import { Viewport } from "~types"

class MouseController {
  callbacks: Map<string, (e: MouseEvent) => void>
  Vec3: Vector3 // Useful for distance and lookAt() logic
  Vec2: Vector2 // Useful for raycasts
  Vec3Viewport: Vector3 // Useful for responsive
  raw: { current: Vector2; previous: Vector2 } // For the cursor in the game
  speed: number
  hoveredNodeName: string
  hasMoved: boolean

  constructor() {
    this.callbacks = new Map<string, (e: MouseEvent) => void>()

    this.Vec3 = new Vector3()
    this.Vec2 = new Vector2()
    this.Vec3Viewport = new Vector3()
    this.raw = { current: new Vector2(), previous: new Vector2() }
    this.speed = 0
    this.hoveredNodeName = ""
    this.hasMoved = false

    this.setEvents()
  }

  subscribe = (key: string, callback: (e: MouseEvent) => void) => {
    // console.log("subscribe : ", key);
    if (this.callbacks.has(key)) console.error(`Duplicate MOUSEMOVE FUNCTION : ${key}`)

    this.callbacks.set(key, callback)
  }

  unsubscribe = (key: string) => {
    // console.log("unsubscribe : ", key);
    if (!this.callbacks.has(key)) console.error(`No such MOUSEMOVE FUNCTION to delete : ${key}`)

    this.callbacks.delete(key)
  }

  setFromViewport = (viewport: Viewport) => {
    this.Vec3Viewport.x = this.Vec3.x * (viewport.width / 2)
    this.Vec3Viewport.y = this.Vec3.y * (viewport.height / 2)
  }

  mousemove = (e: MouseEvent) => {
    if (this.hasMoved === false) this.hasMoved = true

    this.Vec3.x = (e.clientX / window.innerWidth) * 2 - 1
    this.Vec3.y = -(e.clientY / window.innerHeight) * 2 + 1

    this.Vec2.x = this.Vec3.x
    this.Vec2.y = this.Vec3.y

    this.raw.previous.copy(this.raw.current)

    this.raw.current.x = e.clientX
    this.raw.current.y = e.clientY

    this.speed = this.raw.previous.distanceTo(this.raw.current)

    const target = e.target as HTMLElement
    this.hoveredNodeName = target.nodeName

    this.callbacks.forEach(cb => cb(e))
  }

  setEvents = () => {
    window.addEventListener("mousemove", this.mousemove)
  }
}

const instance = new MouseController()
export default instance
