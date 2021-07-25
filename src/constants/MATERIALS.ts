import {
  Color,
  MeshStandardMaterial,
  ShaderMaterial,
  TextureLoader,
} from "three";
import { MODEL } from "~types";
import bakedFresnelFragment from "~shaders/bakedFresnelEven/fragment.glsl";
import bakedFresnelVertex from "~shaders/bakedFresnelEven/vertex.glsl";
import matcapFragment from "~shaders/matcap/fragment.glsl";
import matcapVertex from "~shaders/matcap/vertex.glsl";

export const MATERIALS = {
  GET_FRESNEL_BAKED: (MODEL: MODEL) => {
    if (!MODEL.TEXTURE) return undefined;

    const tex = new TextureLoader().load(MODEL.TEXTURE);
    tex.flipY = false;

    return new ShaderMaterial({
      vertexShader: bakedFresnelVertex,
      fragmentShader: bakedFresnelFragment,
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
  },
  GET_FRESNEL: (color = "#fff") =>
    new ShaderMaterial({
      vertexShader: bakedFresnelVertex,
      fragmentShader: bakedFresnelFragment,
      uniforms: {
        uFresnelColor: {
          value: new Color(color),
        },
        uFresnelWidth: {
          value: 0,
        },
      },
    }),
  GET_BAKED_STANDARD: (texPath: string) => {
    const map = new TextureLoader().load(texPath)
    map.flipY = false

    return new MeshStandardMaterial({ map })
  },
  GET_MATCAP: (matcapPath: string) =>
    new ShaderMaterial({
      vertexShader: matcapVertex,
      fragmentShader: matcapFragment,
      uniforms: {
        uMatcapTexture: { value: new TextureLoader().load(matcapPath) }
      },
    }),
};
