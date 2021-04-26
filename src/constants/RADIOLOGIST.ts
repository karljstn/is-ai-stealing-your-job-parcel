import skeleton1 from "~/assets/Games/Radiologist/Models/skeleton_1.glb"
import skeletonBaseTex1 from "~/assets/Games/Radiologist/Textures/skeleton_1.jpg"

import skeleton2 from "~/assets/Games/Radiologist/Models/skeleton_2-4.glb"
import skeletonBaseTex2 from "~/assets/Games/Radiologist/Textures/skeleton_2-4.jpg"

import skeleton3 from "~/assets/Games/Radiologist/Models/skeleton_3-2.glb"
import skeletonBaseTex3 from "~/assets/Games/Radiologist/Textures/skeleton_3-2.jpg"

import skeleton4 from "~/assets/Games/Radiologist/Models/skeleton_4-3.glb"
import skeletonBaseTex4 from "~/assets/Games/Radiologist/Textures/skeleton_4-3.jpg"

import skeleton5 from "~/assets/Games/Radiologist/Models/skeleton_5-3.glb"
import skeletonBaseTex5 from "~/assets/Games/Radiologist/Textures/skeleton_5-3.jpg"

import clipboard from '~/assets/Games/Radiologist/Models/clipboard_1.glb'
import clipboardTex from "~/assets/Games/Radiologist/Textures/clipboard_1.jpg"

export const RADIOLOGIST = {
    SKELETON1: {
        URL: skeleton1,
        SCALE: 1.5,
        BAKE: skeletonBaseTex1
    },
    SKELETON2: {
        URL: skeleton2,
        SCALE: 1.5,
        BAKE: skeletonBaseTex2
    },
    SKELETON3: {
        URL: skeleton3,
        SCALE: 1.5,
        BAKE: skeletonBaseTex3
    },
    SKELETON4: {
        URL: skeleton4,
        SCALE: 1.5,
        BAKE: skeletonBaseTex4
    },
    SKELETON5: {
        URL: skeleton5,
        SCALE: 1.5,
        BAKE: skeletonBaseTex5
    },
    CLIPBOARD: {
        URL: clipboard,
        SCALE: 1,
        BAKE: clipboardTex,
    }
}
