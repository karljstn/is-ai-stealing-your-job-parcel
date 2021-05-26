import { Scene } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeScene } from "~interfaces/Three";
import SlotMachine from "~three/Meshes/GLTF/SlotMachine";
import { Viewport } from "~types";

class SlotMachineScene implements ThreeScene {
	viewport: Viewport
	scene: Scene
	SlotMachine: SlotMachine

	constructor(viewport: Viewport, scene: Scene) {
		this.viewport = viewport
		this.scene = scene
	}

	start = () => {
		this.SlotMachine = new SlotMachine(this.scene, this.viewport)
		this.SlotMachine.start(MODELS.SLOT_MACHINE.URL, this.SlotMachine.initialize)
	}

	destroy = () => {
		this.SlotMachine.destroy()
		this.SlotMachine = null
	}
}

export default SlotMachineScene