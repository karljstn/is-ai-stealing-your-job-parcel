import { Color, Material, Mesh, Vector3 } from "three";
import { InitGLTF, ThreeGLTF } from "~interfaces/Three";
import BaseGLTF from "~three/Meshes/GLTF/abstract/BaseGLTF";
import MouseTweenGLTF from "~three/Meshes/GLTF/abstract/MouseTweenGLTF";
import TweenGLTF from "~three/Meshes/GLTF/abstract/TweenGLTF";
import { GLTFConstructor, IDLE_TYPE, MODEL, onRect } from "~types";
import { PALETTE } from "~constants/PALETTE";
import RAF from "~singletons/RAF";
import { getViewport, rectToThree } from "~util";

export class BasedGLTF extends BaseGLTF implements ThreeGLTF {
  constructor({
    scene,
    viewport,
    camera,
    MODEL,
    MATERIAL,
    rectElement = null,
    onRect = null,
    delay = { in: 0, out: 0 },
    offset = { rotation: new Vector3(), position: new Vector3() },
    idle = { enabled: true, type: IDLE_TYPE.SINUS },
  }: GLTFConstructor) {
    super({ scene, viewport, camera, offset, MODEL, MATERIAL });
  }

  initialize() { }

  update() { }

  destroy() { }
}

export class TweenedGLTF extends TweenGLTF implements ThreeGLTF {
  constructor({
    scene,
    viewport,
    camera,
    MODEL,
    MATERIAL,
    rectElement = null,
    onRect = null,
    delay = { in: 0, out: 0 },
    offset = { rotation: new Vector3(), position: new Vector3() },
    idle = { enabled: true, type: IDLE_TYPE.SINUS },
  }: GLTFConstructor) {
    super({ scene, viewport, camera, offset, MODEL, MATERIAL });
  }

  initialize() { }

  update() { }

  destroy() { }
}

export class MousedGLTF extends MouseTweenGLTF implements ThreeGLTF {
  rectElement: HTMLElement;
  onRect: onRect;
  delay: { in: number; out: number };

  isMoving: boolean;
  mappedMouse: Vector3;

  constructor({
    scene,
    viewport,
    camera,
    MODEL,
    MATERIAL,
    rectElement = null,
    onRect = null,
    delay = { in: 0, out: 0 },
    offset = { rotation: new Vector3(), position: new Vector3() },
    idle = { enabled: true, type: IDLE_TYPE.SINUS },
  }: GLTFConstructor) {
    super({ scene, viewport, camera, offset, idle, MODEL, MATERIAL });

    this.params.sinus = {
      amplitude: 0.1,
      frequency: 0.00304,
    };
    this.params.fresnel = {
      width: 0.4,
      color: new Color(PALETTE.WHITE),
    };

    this.rectElement = rectElement;
    this.onRect = onRect;
    this.delay = delay;

    this.isMoving = false;

    this.mappedMouse = new Vector3();
  }

  initialize = ({
    rectElement,
    onRect }: InitGLTF
  ) => {
    this.rectElement = rectElement;
    this.onRect = onRect;

    if (this.rectElement) {
      this.manageRect();
    } else {
      this.setTransition(
        this.MODEL.BASE_SCALE,
        this.group.position,
        new Vector3(0, 0, 0),
        {
          in: this.delay.in,
          out: this.delay.out,
        }
      );
    }

    this.group.position.add(this.params.base.offset.position);
    this.originalPos.copy(this.group.position);
    this.group.rotation.setFromVector3(this.params.base.offset.rotation);

    this.setMaterial(this.MATERIAL);

    this.scene.add(this.group);
    RAF.subscribe(this.RAFKey, this.update);
    this.tweaks();
    window.addEventListener("resize", this.manageResize);

    this.in();
  };

  tweaks = () => { };

  update = (dt: number = 0) => {
    if (this.params.base.idle.enabled === false) return;
    this.group.rotation.z =
      this.params.base.offset.rotation.z +
      Math.sin(performance.now() * this.params.sinus.frequency) *
      this.params.sinus.amplitude;
  };

  destroy = () => {
    this.scene.remove(this.group);
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("resize", this.manageResize);
    RAF.unsubscribe(this.RAFKey);
  };

  private manageResize = () => {
    // Viewport from constructor seems to be cached, seem to need to resize here instead of parent
    this.viewport = getViewport(this.camera);
    this.manageRect();
  };

  private manageRect = () => {
    const { x, y, w, h } = rectToThree(
      this.viewport,
      this.rectElement.getBoundingClientRect()
    );

    const hasTransitioned =
      !this.transition.active && this.transition.factor > 0;

    if (hasTransitioned) this.group.scale.setScalar(this.MODEL.BASE_SCALE * h);
    else
      this.setTransition(
        this.MODEL.BASE_SCALE * h,
        this.group.position,
        new Vector3(0, 0, 0),
        { in: this.delay.in, out: this.delay.out }
      );

    if (typeof this.onRect !== "function") return;
    this.onRect(x, y, w, h, this.group, this.viewport);
  };
}
