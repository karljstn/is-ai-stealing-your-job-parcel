import { Vector3 } from "three";
import { ThreeGLTF } from "~interfaces/Three";
import MouseTweenGLTF from "~three/Meshes/GLTF/abstract/MouseTweenGLTF";
import TweenGLTF from "~three/Meshes/GLTF/abstract/TweenGLTF";
import { GLTFConstructor } from "~types";
import RAF from "~singletons/RAF";
import { MODELS } from "~constants/MODELS";
import store from "~store";
import { TpChangeEvent } from "tweakpane/dist/types/api/tp-event";
import { clamp } from "~util";
import BezierEasing from "bezier-easing";
import MouseController from "~singletons/MouseController";

export class TweenedGLTF extends TweenGLTF {
  constructor({
    scene,
    viewport,
    camera,
    GLTF,
    raycaster,
    offset = { rotation: new Vector3(), position: new Vector3() },
  }: GLTFConstructor) {
    super({
      scene,
      viewport,
      camera,
      offset,
      GLTF,
      raycaster,
    });
  }

  initRect = (rectElement: HTMLElement) => {
    this.rectElement = rectElement;
    this.manageRect();
    window.addEventListener("resize", this.manageRect);
  };

  initGLTF = () => {
    RAF.subscribe(this.RAFKey, this.update);
    this.setEvents();
    this.in();

    if (!this.rectElement) {
      this.manageNoRect();
      window.addEventListener("resize", this.manageNoRect);
    }

    if (this.ON_START) this.ON_START(this.group, this.viewport, this);
  };

  destroy() {
    this.scene.remove(this.group);
    this.killTween();
    RAF.unsubscribe(this.RAFKey);
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("click", this.click);
    window.removeEventListener("resize", this.manageRect);
    window.removeEventListener("resize", this.manageNoRect);
  }

  private manageRect = () => {
    this.setFromRect();
    this.manageTweenRect(this.getFromRect().h);
  };

  private manageNoRect = () => {
    this.setTransition(this.MODEL.BASE_SCALE);
  };
}

export class MousedTweenedGLTF extends MouseTweenGLTF implements ThreeGLTF {
  constructor({
    scene,
    viewport,
    camera,
    GLTF,
    raycaster,
    offset = { rotation: new Vector3(), position: new Vector3() },
  }: GLTFConstructor) {
    super({
      scene,
      viewport,
      camera,
      offset,
      GLTF,
      raycaster,
    });
  }

  initRect = (rectElement: HTMLElement) => {
    this.rectElement = rectElement;
    this.manageRect();
    window.addEventListener("resize", this.manageRect);
  };

  initGLTF = () => {
    RAF.subscribe(this.RAFKey, this.update);
    this.setEvents();
    this.in();

    if (!this.rectElement) {
      this.manageNoRect();
      window.addEventListener("resize", this.manageNoRect);
    }

    if (this.ON_START) this.ON_START(this.group, this.viewport, this);
  };

  destroy = () => {
    this.scene.remove(this.group);
    this.killUpdateMouse();
    this.killTween();
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("click", this.click);
    window.removeEventListener("resize", this.manageRect);
    RAF.unsubscribe(this.RAFKey);
  };

  private manageRect = () => {
    this.setFromRect();
    this.manageTweenRect(this.getFromRect().h);
  };

  private manageNoRect = () => {
    this.setTransition(this.MODEL.BASE_SCALE);
  };
}

export class WritingGLTF extends TweenGLTF {
  params: any;
  mouse: Vector3;
  hasTweened: boolean;

  constructor({
    scene,
    viewport,
    camera,
    GLTF,
    raycaster,
    offset = { rotation: new Vector3(), position: new Vector3() },
  }: GLTFConstructor) {
    super({
      scene,
      viewport,
      camera,
      offset,
      GLTF,
      raycaster,
    });

    this.mouse = MouseController.mouseVec3;
    this.params.rotation = {
      resting: new Vector3(Math.PI, 0, Math.PI * 0.3),
      writing: new Vector3(Math.PI * 1.2, 0, Math.PI * 0.2),
      target: new Vector3(),
      factor: 0,
    };
    this.params.eventData = {
      mouseDown: {
        factor: 0,
        speed: 0.05,
      },
    };
    (this.params.eases = {
      rotation: new BezierEasing(0.61, 0.27, 0.78, 0.99),
    }),
      (this.hasTweened = false);
  }

  initRect = () => {};

  initGLTF = () => {
    RAF.subscribe(this.RAFKey, this.update);
    RAF.subscribe("PENCIL", this.updatePencil);
    this.setEvents();

    this.group.rotation.setFromVector3(this.params.rotation.resting);
    // this.tweaks();
    this.setPencilEvents();
    this.manageNoRect();

    if (this.ON_START) this.ON_START(this.group, this.viewport, this);
  };

  updatePencil = (dt: number) => {
    const mouse = new Vector3(
      (this.mouse.x * this.viewport.width) / 2,
      (this.mouse.y * this.viewport.height) / 2,
      0
    );

    this.group.position.lerp(mouse, 0.8);

    const f = this.params.rotation.factor;
    if (f >= 0 && f <= 1)
      this.params.rotation.factor = clamp(
        f + this.params.eventData.mouseDown.factor,
        0,
        1
      );

    const prev: Vector3 = this.params.rotation.resting;
    const current: Vector3 = this.params.rotation.writing;
    const target: Vector3 = this.params.rotation.target
      .copy(prev)
      .lerp(current, this.params.eases.rotation(this.params.rotation.factor));

    this.group.rotation.setFromVector3(target);

    if (this.params.base.idle.enabled === true) {
      this.group.rotation.z +=
        Math.sin(performance.now() * this.params.sinus.frequency) *
        this.params.sinus.amplitude;
    }

    if (f === 1 && !store.state.isPencilWriting)
      store.commit("setPencilWriting", true);
    else if (store.state.isPencilWriting)
      store.commit("setPencilWriting", false);
  };

  tweaks = () => {
    const folder = store.state.tweakpane?.addFolder({
      title: "Pencil",
      expanded: false,
    });

    const rotationInput = folder?.addInput(this.params.rotation, "resting", {
      label: "Rotation",
    });
    const sizeInput = folder?.addInput(this.params, "size", {
      label: "Hand size",
      min: MODELS.PENCIL.BASE_SCALE * 0.2,
      max: MODELS.PENCIL.BASE_SCALE * 2,
    });

    rotationInput?.on("change", (rotation: TpChangeEvent<Vector3>) => {
      this.group?.rotation.setFromVector3(rotation.value);
    });
    sizeInput?.on("change", (size: any) => {
      this.group?.scale.set(size.value, size.value, size.value);
    });
  };

  onMouseDown = (e: MouseEvent) => {
    this.params.eventData.mouseDown.factor = this.params.eventData.mouseDown.speed;
  };

  onMouseUp = (e: MouseEvent) => {
    this.params.eventData.mouseDown.factor =
      -this.params.eventData.mouseDown.speed * 1.3;
  };

  onMouseMove = () => {
    if (this.group.scale.length() === 0 && !this.hasTweened) {
      this.in();
      this.hasTweened = true;
    }
  };

  setPencilEvents = () => {
    window.addEventListener("mousedown", this.onMouseDown);
    window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("mousemove", this.onMouseMove);
  };

  destroy() {
    this.scene.remove(this.group);
    this.killTween();
    RAF.unsubscribe(this.RAFKey);
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("click", this.click);
    window.removeEventListener("mousedown", this.onMouseDown);
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("mousemove", this.onMouseMove);
    this.hasTweened = false;
  }

  private manageNoRect = () => {
    this.setTransition(this.MODEL.BASE_SCALE);
  };
}

export default WritingGLTF;

// export class BasedGLTF extends BaseGLTF {
//   constructor({
//     scene,
//     viewport,
//     camera,
//     GLTF,
//     offset = { rotation: new Vector3(), position: new Vector3() },
//   }: GLTFConstructor) {
//     super({
//       scene,
//       viewport,
//       camera,
//       offset,
//       GLTF,
//     });
//   }

//   initRect = (rectElement: HTMLElement) => {
//     this.rectElement = rectElement;
//     this.setFromRect();
//   };

//   initGLTF = () => {
//     RAF.subscribe(this.RAFKey, this.update);
//     this.playAllAnims();
//   };

//   destroy() {
//     this.scene.remove(this.group);
//     window.removeEventListener("resize", this.resize);
//     RAF.unsubscribe(this.RAFKey);
//   }

//   private update = (dt: number = 0) => {
//     this.mixer.update(dt);
//   };
// }
