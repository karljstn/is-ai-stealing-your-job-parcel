import { Color, IUniform, PerspectiveCamera } from "three";
import { PALETTE } from "~constants/PALETTE";
import { Viewport } from "~types";
import FullScreenPlane from "./FullScreenPlane";

class Background extends FullScreenPlane {
	uniforms: { [name: string]: IUniform }

	constructor(viewport: Viewport, camera: PerspectiveCamera) {
		super(viewport, camera)
		this.uniforms = {
			uTime: { value: 0 },
			uAlpha: { value: 1 },
			uMixFactor: { value: 0 },
			uColorInitial: { value: new Color(PALETTE.VIOLET) },
			uColorFinal: { value: new Color(PALETTE.WHITE) },
		}
	}
}

export default Background