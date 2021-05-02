import { Scene } from "three";
import { ThreeScene } from "~interfaces/Three";
import SlotMachine from "~three/Meshes/GLTF/SlotMachine";
import { Viewport } from "~types";

class SlotMachineScene implements ThreeScene {
	SlotMachine: SlotMachine

	constructor(viewport: Viewport, scene: Scene) {
		this.SlotMachine = new SlotMachine(scene, viewport)
	}

	start = () => {
		this.SlotMachine.load()
	}

	tweaks = () => {

	}

	update = (dt: number) => {
		this.SlotMachine.update(dt)
	}

	destroy = () => {
		this.SlotMachine.destroy()
	}
}

export default SlotMachineScene