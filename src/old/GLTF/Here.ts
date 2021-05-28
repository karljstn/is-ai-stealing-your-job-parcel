import { PointLight, Scene, Vector3 } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeGLTF } from "~interfaces/Three";
import store from "~store";
import { Viewport } from "~types";
import MouseTweenGLTF from "~three/Meshes/GLTF/abstract/MouseTweenGLTF";

class Here extends MouseTweenGLTF implements ThreeGLTF {
  params: any;

  constructor(scene: Scene, viewport: Viewport) {
    super(scene, viewport);
    this.params = { position: new Vector3(0.05, 0.2, 0) };
  }

  initialize = () => {
    const light = new PointLight(0xffffff, 100);
    light.position.set(
      this.params.position.x + 0.05,
      this.params.position.y + 0.1,
      0
    );
    light.intensity = 0.5;
    this.scene.add(light);

    this.group.position.copy(this.params.position);
    this.scene.add(this.group);
    this.setTransition(MODELS.HERE.BASE_SCALE, new Vector3(0.2, 0, 0));
    this.in();
    this.tweaks();
  };

  tweaks = () => {
    if (!store.state.tweakpane) return;

    const folder = store.state.tweakpane.addFolder({
      title: "Here",
      expanded: false,
    });

    const positionInput = folder.addInput(this.params, "position");
    positionInput.on("change", (position: any) => {
      this.group.position.copy(position.value);
    });
  };

  update = () => {};

  destroy = () => {
    this.scene.remove(this.group);
  };
}

export default Here;
