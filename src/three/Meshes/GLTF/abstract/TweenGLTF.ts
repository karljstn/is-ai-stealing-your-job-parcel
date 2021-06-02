import { Vector3 } from "three";
import { GLTFConstructor, ThreeMeshTransition } from "~types";
import { clamp, rectToThree } from "~util";
import BaseGLTF from "./BaseGLTF";
import BezierEasing from "bezier-easing";
import raf from "~singletons/RAF";

abstract class TweenGLTF extends BaseGLTF {
  tweenRAFKey: string;
  transition: ThreeMeshTransition;

  constructor({
    scene,
    viewport,
    camera,
    offset,
    GLTF,
    raycaster,
  }: GLTFConstructor) {
    super({
      scene,
      viewport,
      camera,
      offset,
      GLTF,
      raycaster,
    });

    this.tweenRAFKey = (performance.now() * Math.random()).toString();
    this.transition = {
      value: 0,
      factor: 0,
      target: {
        scale: new Vector3(),
      },
      speed: 0.04,
      delay: typeof GLTF.DELAY !== "undefined" ? GLTF.DELAY : { in: 0, out: 0 },
      duration: 0.3,
      eases: { default: new BezierEasing(0.42, 0, 0.58, 1) },
      active: false,
      timeouts: [],
    };

    raf.subscribe(this.tweenRAFKey, this.tween);
  }

  setTransition = (scaleScalar: number, duration = 0.3) => {
    if (!this.group) return;

    this.transition.target.scale.setScalar(scaleScalar);
    this.transition.duration = duration;
  };

  in = () => {
    this.transition.timeouts.push(
      setTimeout(() => {
        this.transition.factor = this.transition.speed;
      }, this.transition.delay.in * 1000)
    );
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
      this.tweenScale();
    }

    if (value === 0 || value === 1) {
      this.transition.active = false;
    }
  };

  tweenScale = () => {
    const eased = this.transition.eases.default(this.transition.value);
    this.group.scale.set(
      this.transition.target.scale.x * eased,
      this.transition.target.scale.y * eased,
      this.transition.target.scale.z * eased
    );
  };

  manageTweenRect = (h: number) => {
    const hasTransitioned =
      !this.transition.active && this.transition.factor > 0;

    if (hasTransitioned) this.group.scale.setScalar(this.MODEL.BASE_SCALE * h);
    else this.setTransition(this.MODEL.BASE_SCALE * h);
  };

  killTimeouts = () => {
    for (const timeout of this.transition.timeouts) {
      clearTimeout(timeout);
    }
  };

  killTween = () => {
    this.killTimeouts();
    raf.unsubscribe(this.tweenRAFKey);
  };
}

export default TweenGLTF;
