import { Vector3 } from "three";
import { ThreeGLTF } from "~interfaces/Three";
import MouseTweenGLTF from "~three/Meshes/GLTF/abstract/MouseTweenGLTF";
import TweenGLTF from "~three/Meshes/GLTF/abstract/TweenGLTF";
import { GLTFConstructor } from "~types";
import RAF from "~singletons/RAF";

export class TweenedGLTF extends TweenGLTF {
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

  initRect = (rectElement: HTMLElement) => {
    this.rectElement = rectElement;
    this.manageRect();
    window.addEventListener("resize", this.manageRect);
  };

  initGLTF = () => {
    RAF.subscribe(this.RAFKey, this.update);
    this.setEvents();
    this.in();
    this.playAllAnims();

    if (!this.rectElement) {
      this.manageNoRect();
      window.addEventListener("resize", this.manageNoRect);
    }

    this.ON_START(this.group, this.viewport);
  };

  destroy() {
    this.scene.remove(this.group);
    this.killTween();
    RAF.unsubscribe(this.RAFKey);
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("resize", this.manageRect);
    window.removeEventListener("resize", this.manageNoRect);
  }

  private update = (dt: number = 0) => {
    this.mixer.update(dt);

    if (this.params.base.idle.enabled === false) return;
    this.group.rotation.z =
      this.params.base.offset.rotation.z +
      Math.sin(performance.now() * this.params.sinus.frequency) *
        this.params.sinus.amplitude;
  };

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

  initRect = (rectElement: HTMLElement) => {
    this.rectElement = rectElement;
    this.manageRect();
    window.addEventListener("resize", this.manageRect);
  };

  initGLTF = () => {
    RAF.subscribe(this.RAFKey, this.update);
    this.setEvents();
    this.in();
    this.playAllAnims();
  };

  destroy = () => {
    this.scene.remove(this.group);
    this.killUpdateMouse();
    this.killTween();
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("resize", this.manageRect);
    RAF.unsubscribe(this.RAFKey);
  };

  private update = (dt: number = 0) => {
    this.mixer.update(dt);

    if (this.params.base.idle.enabled === false) return;
    this.group.rotation.z =
      this.params.base.offset.rotation.z +
      Math.sin(performance.now() * this.params.sinus.frequency) *
        this.params.sinus.amplitude;
  };

  private manageRect = () => {
    this.setFromRect();
    this.manageTweenRect(this.getFromRect().h);
  };
}

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
