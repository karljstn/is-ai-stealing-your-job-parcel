import { Viewport } from "~/types";
import { Scene } from "three";
import { MODELS } from "~constants/MODELS";
import { ThreeScene } from "~interfaces/Three";
import Tree from "~three/Meshes/GLTF/Tree";

class TreeScene implements ThreeScene {
	viewport: Viewport
	scene: Scene
	Tree: Tree

	constructor(viewport: Viewport, scene: Scene) {
		this.viewport = viewport
		this.scene = scene
	}

	start() {
		this.Tree = new Tree(this.scene, this.viewport)
		setTimeout(() => {
			this.Tree.start(MODELS.TREE.URL, this.Tree.initialize)
		}, 500);
	}

	destroy() {
		this.Tree.destroy()
		this.Tree = null
	}
}

export default TreeScene;
