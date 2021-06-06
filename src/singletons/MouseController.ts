import { Vector2, Vector3 } from "three";
import { Viewport } from "~types";

class MouseController {
  Vec3: Vector3; // Useful for distance and lookAt() logic
  Vec2: Vector2; // Useful for raycasts
  Vec3Viewport: Vector3; // Useful for responsive
  raw: { current: Vector2; previous: Vector2 }; // For the cursor in the game
  speed: number;

  constructor() {
    this.Vec3 = new Vector3();
    this.Vec2 = new Vector2();
    this.Vec3Viewport = new Vector3();
    this.raw = { current: new Vector2(), previous: new Vector2() };
    this.speed = 0;

    this.setEvents();
  }

  setFromViewport = (viewport: Viewport) => {
    this.Vec3Viewport.x = this.Vec3.x * (viewport.width / 2);
    this.Vec3Viewport.y = this.Vec3.y * (viewport.height / 2);
  };

  mousemove = (e: MouseEvent) => {
    this.Vec3.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.Vec3.y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.Vec2.x = this.Vec3.x;
    this.Vec2.y = this.Vec3.y;

    this.raw.previous.copy(this.raw.current);

    this.raw.current.x = e.clientX;
    this.raw.current.y = e.clientY;

    this.speed = this.raw.previous.distanceTo(this.raw.current);
  };

  setEvents = () => {
    window.addEventListener("mousemove", this.mousemove);
  };
}

const instance = new MouseController();
export default instance;
