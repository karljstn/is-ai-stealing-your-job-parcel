import { Vector3 } from "three";
import { GLTFConstructor } from "~types";
import TweenGLTF from "./TweenGLTF";
import raf from "~singletons/RAF";
import MouseController from "~singletons/MouseController";

abstract class MouseTweenGLTF extends TweenGLTF {
  mouseRAFKey: string;
  mouse: {
    current: Vector3;
    target: Vector3;
    lerp: number;
    offset: Vector3;
    scalar: number;
  };

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

    this.mouseRAFKey = (performance.now() * Math.random()).toString();
    this.mouse = {
      current: new Vector3(),
      target: new Vector3(),
      lerp: 0.2,
      offset: new Vector3(),
      scalar: 1,
    };

    raf.subscribe(this.mouseRAFKey, this.updateMouse);
  }

  setUpdateMouse = (lerp: number, offset: Vector3, scalar: number) => {
    this.mouse.lerp = lerp;
    this.mouse.offset.copy(offset);
    this.mouse.scalar = scalar;
  };

  updateMouse = () => {
    if (this.isLoaded) {
      this.mouse.target.copy(MouseController.mouseVec3Viewport);
      this.mouse.current.lerp(this.mouse.target, this.mouse.lerp);
      this.mouse.current.add(this.mouse.offset);
      this.mouse.current.multiplyScalar(this.mouse.scalar);
    }
  };

  killUpdateMouse = () => {
    raf.unsubscribe(this.mouseRAFKey);
  };
}

export default MouseTweenGLTF;
