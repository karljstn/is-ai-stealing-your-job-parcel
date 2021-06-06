import {
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  PointLight,
  Vector3,
} from "three";
import router from "~router";
import store from "~store";
import { GLTF_TYPE, VIEW, Viewport } from "~types";
import { clamp } from "~util";
import { MATERIALS } from "./MATERIALS";
import { MODELS } from "./MODELS";
import MouseController from "~singletons/MouseController";
import gsap from "gsap";
import { PALETTE } from "./PALETTE";

export const VIEWS: VIEW[] = [
  {
    ROUTE_NAME: "LandingPage",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.TWEENED,
        MODEL: MODELS.TRASHCAN,
        IDLE: { enabled: false },
        ON_START: (group: Group, viewport: Viewport) => {
          group.rotateY(-Math.PI / 2);
          group.position.y = -viewport.height / 2.7;
        },
        ON_RAYCAST: (intersections, binding) => {
          if (!!intersections[0]) {
            const object = intersections[0].object;
            const name = object.name;
            const position = object.position;

            if (
              name === "POUBELLE" ||
              name.indexOf("Text") > -1 ||
              object.userData.tweens[0] ||
              object.userData.tweens[1] ||
              binding.isResetting
            )
              return;

            const factor = clamp((MouseController.speed - 0.95) * 3, 0, 3.5);
            const duration = clamp(0.25 * factor, 0.25, 3);

            object.userData.tweens[0] = gsap.to(position, {
              x: Math.random() * factor * 0.5,
              duration,
              onComplete: () => {
                object.userData.tweens[0] = null;
              },
            });

            object.userData.tweens[1] = gsap.to(object.rotation, {
              duration,
              x: Math.random() * factor,
              y: Math.random() * factor,
              onComplete: () => {
                object.userData.tweens[1] = null;
              },
            });
          }
        },
        ON_UPDATE: (binding) => {
          if (binding.isResetting) return;

          binding.group.traverse((obj) => {
            if (
              obj.name === "Scene" ||
              obj.name === "POUBELLE" ||
              obj.name.indexOf("Text") > -1
            )
              return;

            obj.rotation.z =
              Math.sin(
                performance.now() *
                  binding.params.sinus.frequency *
                  binding.params.sinus.factor
              ) *
              binding.params.sinus.amplitude *
              binding.params.sinus.factor;

            // These are due to the .glb having wonky base rotations
            if (obj.name.indexOf("MAGIC") === 0) {
              obj.rotation.z -= Math.PI / 2;
            }
          });

          // These are due to the .glb having wonky base rotations
          // For some reason, need to split this from the above reverse
          for (const obj of binding.group.children) {
            if (obj.name.indexOf("MATRIX") === 0) {
              obj.rotation.z -= Math.PI / 2;
            }
          }
        },
      },
    ],
  },
  {
    ROUTE_NAME: "IntroHello",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.MOUSED,
        MODEL: MODELS.HAND_WAVE,
        // MATERIAL: MATERIALS.GET_LAMBERT(),
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) => new Vector3(x + w, y - h, 0),
        DELAY: { in: 2, out: 0 },
        ON_START: (group) => {
          group.traverse((obj) => {
            const mesh = obj as Mesh;
            const material = mesh.material as MeshStandardMaterial;

            if (material) material.color = new Color(PALETTE.ORANGE);
          });
        },
        ON_UPDATE: (binding: any) => {
          binding.group.lookAt(
            binding.mouse.current.x,
            binding.mouse.current.y,
            1
          );
        },
        ON_RAYCAST: (intersects, binding) => {
          if (intersects.length) {
            binding.playAllAnims();
          }
        },
      },
    ],
  },
  {
    ROUTE_NAME: "IntroGuess",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.TWEENED,
        MODEL: MODELS.CRYSTAL_BALL,
        IDLE: { enabled: false },
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w / 1.9, y - h, 0),
        DELAY: { in: 0.1, out: 0 },
        ON_START: (group, viewport, binding) => {
          binding.params.sinus.frequency *= 0.8;
          binding.params.sinus.amplitude *= 0.8;
        },
        ON_UPDATE: (binding) => {
          binding.group.rotation.x =
            binding.params.base.offset.rotation.z +
            Math.sin(
              performance.now() *
                binding.params.sinus.frequency *
                binding.params.sinus.factor
            ) *
              binding.params.sinus.amplitude *
              binding.params.sinus.factor;

          binding.group.rotation.z =
            binding.params.base.offset.rotation.z +
            Math.sin(
              performance.now() *
                binding.params.sinus.frequency *
                binding.params.sinus.factor
            ) *
              binding.params.sinus.amplitude *
              binding.params.sinus.factor;
        },
      },
    ],
    ON_START: (view) => {
      const light = new PointLight();
      light.position.x = 0.1;
      light.position.y = 0.1;
      light.position.z = 0.1;
      light.intensity = 10;
      view.scene.add(light);
      view.objects.push(light);
    },
    ON_DESTROY: (view) => {
      for (const object of view.objects) {
        view.scene.remove(object);
      }
    },
  },
  {
    ROUTE_NAME: "IntroThreatened",
    LOTTIE: {
      URL: "~/assets/Lottie/6. AI IS.json",
      SCALE: 1,
    },
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.TWEENED,
        MODEL: MODELS.EMOJI_CRY,
        MATERIAL: MATERIALS.GET_FRESNEL_BAKED(MODELS.EMOJI_CRY),
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w / 1.35, y - h / 1.64, 0),
        DELAY: { in: 1.8, out: 0 },
      },
      {
        TYPE: GLTF_TYPE.MOUSED,
        MODEL: MODELS.HERE,
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w / 1.83, y - h / 10, 0),
        DELAY: { in: 0.5, out: 0 },
        ON_START: (group: Group, viewport: Viewport, binding: any) => {
          binding.playAllAnims();
        },
        ON_UPDATE: (binding: any) =>
          binding.group.lookAt(
            binding.mouse.current.x,
            binding.mouse.current.y,
            1
          ),
      },
    ],
  },
  {
    ROUTE_NAME: "IntroQuestion",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.MOUSED,
        MODEL: MODELS.EMOJI_GLASSES,
        MATERIAL: MATERIALS.GET_FRESNEL_BAKED(MODELS.EMOJI_GLASSES),
        DELAY: { in: 0.0, out: 0 },
        ON_START: (group, viewport) => {
          group.position.x -= viewport.width / 6.5;
          group.position.y -= viewport.height / 10;
        },
        ON_RAYCAST: (intersects, binding) => {
          if (intersects.length) {
            //for some reason this needs to be different that the other raycast
            document.querySelector("html").style.cursor = "pointer";
            binding.hoverFresnel(true);
          } else {
            document.querySelector("html").style.cursor = "";
            binding.hoverFresnel(false);
          }
        },
        ON_CLICK: (binding) => {
          if (binding.intersects.length) {
            router
              .getRoutes()
              .find((route) => route.name === "IntroQuestion")
              .meta.transition.out();

            setTimeout(() => {
              router.push("5");
            }, 700);
          }
        },
      },
      {
        TYPE: GLTF_TYPE.MOUSED,
        MODEL: MODELS.EMOJI_SAD,
        MATERIAL: MATERIALS.GET_FRESNEL_BAKED(MODELS.EMOJI_SAD),
        DELAY: { in: 0.5, out: 0 },
        ON_START: (group, viewport) => {
          group.position.x += viewport.width / 5.8;
          group.position.y -= viewport.height / 10;
        },
        ON_RAYCAST: (intersects, binding) => {
          if (intersects.length) {
            document.querySelector("html").classList.add("cursor-pointer");
            binding.hoverFresnel(true);
          } else {
            document.querySelector("html").classList.remove("cursor-pointer");
            binding.hoverFresnel(false);
          }
        },
        ON_CLICK: (binding) => {
          if (binding.intersects.length) {
            router
              .getRoutes()
              .find((route) => route.name === "IntroQuestion")
              .meta.transition.out();

            setTimeout(() => {
              router.push("5");
            }, 700);
          }
        },
      },
    ],
  },
  {
    ROUTE_NAME: "DefinitionOne",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.TWEENED,
        MODEL: MODELS.EMOJI_SMILE,
        MATERIAL: MATERIALS.GET_FRESNEL_BAKED(MODELS.EMOJI_SMILE),
        DELAY: { in: 4, out: 0 },
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w - w / 8, y - h + h / 8, 0),
        ON_START: (group, viewport, binding) => {
          // binding.params.sinus.frequency *= 0.5;
          // binding.params.sinus.amplitude *= 0.5;
        },
      },
    ],
  },
  {
    ROUTE_NAME: "DefinitionTwo",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.WRITING,
        MODEL: MODELS.PENCIL,
        ON_START: (group, viewport, binding) => {
          binding.params.sinus.frequency *= 0.5;
          binding.params.sinus.amplitude *= 0.5;
        },
      },
    ],
  },
  {
    ROUTE_NAME: "DefinitionThree",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.MOUSED,
        MODEL: MODELS.PEN_PAPER,
        MATERIAL: MATERIALS.GET_FRESNEL_BAKED(MODELS.PEN_PAPER),
        DELAY: { in: 1, out: 0 },
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w - w / 4.5, y - h / 5, 0),
        ON_START: (group, viewport, binding) => {
          binding.params.sinus.frequency *= 0.5;
          binding.params.sinus.amplitude *= 0.5;
        },
        ON_UPDATE: (binding: any) => {
          binding.group.lookAt(
            binding.mouse.current.x,
            binding.mouse.current.y,
            1
          );
        },
      },
    ],
  },
  {
    ROUTE_NAME: "DefinitionFour",
    ON_START: (view) => {
      const light = new PointLight();
      light.position.x = 0.1;
      light.position.y = 0.1;
      light.position.z = 0.1;
      light.intensity = 6.5;
      view.scene.add(light);
      view.objects.push(light);
    },
    ON_DESTROY: (view) => {
      for (const object of view.objects) {
        view.scene.remove(object);
      }
    },
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.MOUSED,
        MODEL: MODELS.TREE,
        DELAY: { in: 2, out: 0 },
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w - w / 3.75, y - h, 0),
        ON_UPDATE: (binding: any) => {
          binding.group.lookAt(
            binding.mouse.current.x,
            binding.mouse.current.y,
            1
          );
        },
      },
    ],
  },
  {
    ROUTE_NAME: "DefinitionFive",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.TWEENED,
        MODEL: MODELS.QUESTION_MARK,
        DELAY: { in: 1, out: 0 },
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w, y - h / 4, 0),
      },
      {
        TYPE: GLTF_TYPE.MOUSED,
        MODEL: MODELS.QUESTION_MARK,
        DELAY: { in: 1.6, out: 0 },
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w / 40, y - h + h / 5, 0),
      },
    ],
  },
  {
    ROUTE_NAME: "DefinitionSeven",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.MOUSED,
        MODEL: MODELS.HAND_OK,
        DELAY: { in: 3, out: 0 },
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w / 2 + w / 40, 0, 0),
        // ON_START: (group) => {
        //   group.traverse((obj) => {
        //     const mesh = obj as Mesh;
        //     const material = mesh.material as MeshStandardMaterial;

        //     if (material) material.color = new Color(PALETTE.WHITE);
        //   });
        // },
        ON_UPDATE: (binding: any) => {
          binding.group.lookAt(
            binding.mouse.current.x,
            binding.mouse.current.y,
            1
          );
        },
        ON_RAYCAST: (intersects, binding) => {
          if (intersects.length) {
            binding.playAllAnims();
          }
        },
      },
    ],
  },
  {
    ROUTE_NAME: "GameOne",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.TWEENED,
        MODEL: MODELS.SLOT_MACHINE,
        IDLE: { enabled: false },
        ON_START: (group: Group, viewport: Viewport, binding: any) => {
          group.rotateY(-Math.PI / 2);
          group.rotateY(-Math.PI / 6);
          group.position.y = -viewport.height / 8;

          setTimeout(() => {
            binding.playAllAnims();
          }, 200);
        },
        ON_RAYCAST: (intersects) => {
          if (intersects.length) {
            document.querySelector("html").classList.add("cursor-pointer");
          } else {
            document.querySelector("html").classList.remove("cursor-pointer");
          }
        },
        ON_CLICK: (binding) => {
          if (binding.intersects.length) {
            router.push("13");
            document.querySelector("html").classList.remove("cursor-pointer");
          }
        },
      },
    ],
  },
  {
    ROUTE_NAME: "EndOne",
    GLTF_MESHES: [
      {
        TYPE: GLTF_TYPE.TWEENED,
        MODEL: MODELS.EMOJI_DISTRAUGHT,
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w / 2 + w / 3.5, y - h + h / 4, 0),
        MATERIAL: MATERIALS.GET_FRESNEL_BAKED(MODELS.EMOJI_DISTRAUGHT),
      },
    ],
  },
  {
    ROUTE_NAME: "EndTwo",
    ON_START: (view) => {
      const light = new PointLight();
      light.position.x = 0.1;
      light.position.y = 0.1;
      light.position.z = 0.1;
      light.intensity = 1.4;
      view.scene.add(light);
      view.objects.push(light);
    },
    ON_DESTROY: (view) => {
      for (const object of view.objects) {
        view.scene.remove(object);
      }
    },
    GLTF_MESHES: [
      {
        DELAY: { in: 3, out: 0 },
        TYPE: GLTF_TYPE.MOUSED,
        MODEL: MODELS.HAND_SMALL,
        GET_OFFSET_FROM_RECT: ({ x, y, w, h }) =>
          new Vector3(x + w / 2 + w / 2.8, y - h / 1.2, 0),
        ON_START: (g, v, b) => {
          b.params.sinus.frequency *= 0.5;
          b.params.sinus.amplitude *= 0.5;
        },
        ON_UPDATE: (binding: any) => {
          binding.group.lookAt(
            binding.mouse.current.x,
            binding.mouse.current.y,
            1
          );
        },
        ON_RAYCAST: (intersects, binding) => {
          if (intersects.length) {
            binding.playAllAnims();
          }
        },
      },
    ],
  },
];
