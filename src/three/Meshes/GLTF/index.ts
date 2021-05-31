import { Color, Vector3 } from "three";
import { InitGLTF, ThreeGLTF } from "~interfaces/Three";
import BaseGLTF from "~three/Meshes/GLTF/abstract/BaseGLTF";
import MouseTweenGLTF from "~three/Meshes/GLTF/abstract/MouseTweenGLTF";
import TweenGLTF from "~three/Meshes/GLTF/abstract/TweenGLTF";
import { GLTFConstructor, IDLE_TYPE } from "~types";
import { PALETTE } from "~constants/PALETTE";
import RAF from "~singletons/RAF";
import { rectToThree } from "~util";

export class BasedGLTF extends BaseGLTF implements ThreeGLTF {
  constructor({
    scene,
    viewport,
    camera,
    GLTF,
    offset = { rotation: new Vector3(), position: new Vector3() },
  }: GLTFConstructor) {
    super({
      scene,
      viewport,
      camera,
      offset,
      GLTF,
    });
  }

  initRectGLTF() {}

  update() {}

  destroy() {}
}

export class TweenedGLTF extends TweenGLTF implements ThreeGLTF {
  constructor({
    scene,
    viewport,
    camera,
    GLTF,
    offset = { rotation: new Vector3(), position: new Vector3() },
  }: GLTFConstructor) {
    super({
      scene,
      viewport,
      camera,
      offset,
      GLTF,
    });
  }

  initRectGLTF() {}

  update() {}

  destroy() {}
}

export class MousedTweenedGLTF extends MouseTweenGLTF implements ThreeGLTF {
  delay: { in: number; out: number };

  isMoving: boolean;
  mappedMouse: Vector3;

  constructor({
    scene,
    viewport,
    camera,
    GLTF,
    rectElement = null,
    onRect = null,
    offset = { rotation: new Vector3(), position: new Vector3() },
    idle = { enabled: true, type: IDLE_TYPE.SINUS },
  }: GLTFConstructor) {
    super({
      scene,
      viewport,
      camera,
      offset,
      idle,
      GLTF,
    });

    this.params.sinus = {
      amplitude: 0.12,
      frequency: 0.004,
    };
    this.params.fresnel = {
      width: 0.4,
      color: new Color(PALETTE.WHITE),
    };

    this.rectElement = rectElement;
    this.onRect = onRect;
    this.delay =
      typeof GLTF.DELAY !== "undefined" ? GLTF.DELAY : { in: 0, out: 0 };

    this.isMoving = false;

    this.mappedMouse = new Vector3();
  }

  initRectGLTF = ({ rectElement, onRect }: InitGLTF) => {
    this.rectElement = rectElement;
    this.onRect = onRect;

    this.manageRect();

    RAF.subscribe(this.RAFKey, this.update);

    this.tweaks();
    window.addEventListener("resize", this.manageRect);

    this.in();
    this.playAllAnims();
  };

  tweaks = () => {};

  destroy = () => {
    this.scene.remove(this.group);
    this.killUpdateMouse();
    this.killTween();
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("resize", this.manageRect);
    RAF.unsubscribe(this.RAFKey);
  };

  update = (dt: number = 0) => {
    this.mixer.update(dt);
    if (this.params.base.idle.enabled === false) return;
    this.group.rotation.z =
      this.params.base.offset.rotation.z +
      Math.sin(performance.now() * this.params.sinus.frequency) *
        this.params.sinus.amplitude;
  };

  private manageRect = () => {
    const { x, y, w, h } = rectToThree(
      this.viewport,
      this.rectElement.getBoundingClientRect()
    );

    this.group.position.copy(this.GET_OFFSET_FROM_RECT({ x, y, w, h }));

    const hasTransitioned =
      !this.transition.active && this.transition.factor > 0;

    if (hasTransitioned) this.group.scale.setScalar(this.MODEL.BASE_SCALE * h);
    else
      this.setTransition(this.MODEL.BASE_SCALE * h, {
        in: this.delay.in,
        out: this.delay.out,
      });

    if (typeof this.onRect !== "function") return;

    this.onRect(x, y, w, h, this.group, this.viewport);
  };
}
