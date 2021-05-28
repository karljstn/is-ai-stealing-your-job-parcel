import { Color, ShaderMaterial, TextureLoader } from "three";
import { MODEL } from "~types";
import fragment from "~shaders/bakedFresnelEven/fragment.glsl";
import vertex from "~shaders/bakedFresnelEven/vertex.glsl";

export const MATERIALS = {
  GET_FRESNEL_BAKED: (MODEL: MODEL) => {
    if (!MODEL.TEXTURE) return undefined;

    const tex = new TextureLoader().load(MODEL.TEXTURE);
    tex.flipY = false;
    const mat = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uMap: { value: tex },
        uFresnelColor: {
          value: new Color("#fff"),
        },
        uFresnelWidth: {
          value: 0,
        },
      },
    });
    return mat;
  },
};
