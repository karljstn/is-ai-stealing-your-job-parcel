import {
  Color,
  MeshLambertMaterial,
  MeshStandardMaterial,
  ShaderMaterial,
  TextureLoader,
} from "three";
import { MODEL } from "~types";
import bakedFresnelFragment from "~shaders/bakedFresnelEven/fragment.glsl";
import bakedFresnelVertex from "~shaders/bakedFresnelEven/vertex.glsl";
import fresnelFragment from "~shaders/fresnel/fragment.glsl";
import fresnelVertex from "~shaders/fresnel/vertex.glsl";
import { MODELS } from "./MODELS";

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
    const tex = new TextureLoader().load(texPath)
    tex.flipY = false

    return new MeshStandardMaterial({ map: tex })
  }
};
