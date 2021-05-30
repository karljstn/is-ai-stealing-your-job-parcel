import { Vector3 } from "three";
import { GLTFConstructor } from "~types";
import { clamp } from "~util";
import BaseGLTF from "./BaseGLTF";
import BezierEasing from "bezier-easing";
import raf from "~singletons/RAF";

type ThreeMeshTransition = {
  value: number;
  factor: number;
  target: {
    // position: Vector3,
    // offset: Vector3,
    scale: Vector3;
  };
  speed: number;
  delay: {
    in: number;
    out: number;
  };
  duration: number;
  eases: {
    default: ReturnType<typeof BezierEasing>;
  };
  active: boolean;
};

abstract class TweenGLTF extends BaseGLTF {
  tweenRAFKey: string;
  transition: ThreeMeshTransition;

  constructor({
    scene,
    viewport,
    camera,
    offset,
    idle,
    MODEL,
    MATERIAL,
  }: GLTFConstructor) {
    super({ scene, viewport, camera, offset, idle, MODEL, MATERIAL });

    this.tweenRAFKey = (performance.now() * Math.random()).toString();
    this.transition = {
      value: 0,
      factor: 0,
      target: {
        // position: new Vector3(),
        // offset: new Vector3(),
        scale: new Vector3(),
      },
      speed: 0.04,
      delay: { in: 0, out: 0 },
      duration: 0.3,
      eases: { default: new BezierEasing(0.42, 0, 0.58, 1) },
      active: false,
    };

    raf.subscribe(this.tweenRAFKey, this.tween);
  }

  setTransition = (
    scaleScalar: number,
    // position: Vector3,
    // offset: Vector3 = new Vector3(),
    delay = { in: 0, out: 0 },
    duration = 0.3
  ) => {
    if (!this.group) return;

    this.transition.target.scale.setScalar(scaleScalar);

    //TODO: implement offset
    // this.transition.target.position.copy(position)
    // this.transition.target.offset.copy(offset)

    this.transition.delay = delay;
    this.transition.duration = duration;
  };

  in = () => {
    setTimeout(() => {
      this.transition.factor = this.transition.speed;
    }, this.transition.delay.in * 1000);
  };

  out = () => {
    setTimeout(() => {
      this.transition.factor = -this.transition.speed;
    }, this.transition.delay.out * 1000);
  };

  tween = () => {
    const value = this.transition.value;

    if (value >= 0 && value <= 1) {
      this.transition.value = clamp(value + this.transition.factor, 0, 1);
    }

    if (value > 0 && value < 1) {
      this.transition.active = true;
      const eased = this.transition.eases.default(value);
      this.group.scale.set(
        this.transition.target.scale.x * eased,
        this.transition.target.scale.y * eased,
        this.transition.target.scale.z * eased
      );
    }

    if (value === 0 || value === 1) {
      this.transition.active = false;
    }
  };

  killTween = () => {
    raf.unsubscribe(this.tweenRAFKey);
  };
}

export default TweenGLTF;
