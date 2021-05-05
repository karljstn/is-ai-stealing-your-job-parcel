import { Scene } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeScene } from "~interfaces/Three";
import SlotMachine from "~three/Meshes/GLTF/SlotMachine";
import { Viewport } from "~types";

class SlotMachineScene implements ThreeScene {
	SlotMachine: SlotMachine

	constructor(viewport: Viewport, scene: Scene) {
		this.SlotMachine = new SlotMachine(scene, viewport)
		this.SlotMachine.load(MODELS.SLOT_MACHINE.URL)
	}

	start = () => {
		this.SlotMachine.start(MODELS.SLOT_MACHINE.URL, this.SlotMachine.initialize)
	}

	destroy = () => {
		this.SlotMachine.destroy()
	}
}

export default SlotMachineScene