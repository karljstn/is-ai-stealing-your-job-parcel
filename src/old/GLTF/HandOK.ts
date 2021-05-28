import { MODELS } from "~/constants/MODELS";
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  LoopOnce,
  MeshLambertMaterial,
  Scene,
  Vector3,
} from "three";
import raf from "~singletons/RAF";
import { RAFS } from "~constants/RAFS";
import { ThreeGLTF } from "~interfaces/Three";
import store from "~store";
import MouseTweenGLTF from "../../three/Meshes/GLTF/abstract/MouseTweenGLTF";
import { Viewport } from "~types";
import { throttle } from "~util/_index";

class HandOK extends MouseTweenGLTF implements ThreeGLTF {
  params: { animation: { speed: number }; size: number; delay: { in: number } };
  origin: { position: Vector3 };
  world: { position: Vector3 };
  mixer: THREE.AnimationMixer | null;
  actions: AnimationAction[] | null;
  okayAction: AnimationAction | null;
  mat: MeshLambertMaterial;

  constructor(scene: Scene, viewport: Viewport) {
    super(scene, viewport);
    this.params = {
      animation: { speed: 0.002 },
      size: MODELS.HAND_OK.BASE_SCALE,
      delay: { in: 3000 },
    };
    this.origin = { position: new Vector3() };
    this.world = { position: new Vector3() };
    this.isLoaded = false;
    this.mixer = null;
    this.okayAction = null;
    this.mat = new MeshLambertMaterial({ color: "#F4933B" });
  }

  initialize = () => {
    setTimeout(() => {
      const target = new Vector3(0.66, 0, 0);
      this.origin.position.copy(target);
      this.group.position.copy(target);
      // this.group.rotation.y += Math.PI / 2
      this.scene.add(this.group);

      this.mixer = new AnimationMixer(this.group);
      this.mixer.timeScale = this.params.animation.speed;

      this.animations.forEach((anim) => {
        if (!this.mixer) return;

        const clipAction = this.mixer.clipAction(anim);
        clipAction.loop = LoopOnce;
        clipAction.clampWhenFinished = true;
        this.actions?.push(clipAction);
      });

      const clip = AnimationClip.findByName(
        this.animations,
        "ArmatureAction.002"
      );
      this.okayAction = this.mixer.clipAction(clip);
      this.okayAction.loop = LoopOnce;
      this.okayAction.clampWhenFinished = true;

      this.setTransition(MODELS.HAND_OK.BASE_SCALE, this.group.position);

      raf.subscribe(RAFS.HAND_OK, this.update);

      this.in();
      this.tweaks();

      setTimeout(this.ok, 1000);
    }, this.params.delay.in);
  };

  tweaks = () => {
    if (!store.state.tweakpane) return;

    const folder = store.state.tweakpane.addFolder({
      title: "Hand",
      expanded: false,
    });

    const speedInput = folder.addInput(this.params.animation, "speed", {
      label: "Wave speed",
      min: this.params.animation.speed * 0.33,
      max: this.params.animation.speed * 3,
    });
    const sizeInput = folder.addInput(this.params, "size", {
      label: "Hand size",
      min: MODELS.HAND_OK.BASE_SCALE * 0.33,
      max: MODELS.HAND_OK.BASE_SCALE * 3,
    });
    const btn = folder.addButton({ title: "Wave" });

    speedInput.on("change", (speed: any) => {
      if (this.mixer) this.mixer.timeScale = speed.value;
    });
    sizeInput.on("change", (size: any) => {
      this.group?.scale.set(size.value, size.value, size.value);
    });
    btn.on("click", () => {
      this.ok();
    });
  };

  ok = throttle(() => {
    if (!this.okayAction) return;

    this.okayAction.reset();
    this.okayAction.play();
  }, 1300);

  update = (dt = 0) => {
    if (this.isLoaded) {
      this.mixer && this.mixer.update(dt);

      if (this.mouse.current.distanceTo(this.group.position) <= 0.1) {
        // document.body.classList.add('cursor-grab')
        if (this.okayAction?.paused) {
          this.ok();
        }
      } else {
        // if (document.body.classList.contains('cursor-grab')) {
        // 	document.body.classList.remove('cursor-grab')
        // }
      }
    }
  };

  destroy = () => {
    // this.killTween()
    this.killUpdateMouse();
    this.scene.remove(this.group);
    raf.unsubscribe(RAFS.HAND_OK);
  };
}

export default HandOK;
