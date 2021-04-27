import skeleton1 from "~/assets/Games/Radiologist/Models/skeleton_1.glb"
import skeletonBaseTex1 from "~/assets/Games/Radiologist/Textures/skeleton_1.jpg"

import skeleton2 from "~/assets/Games/Radiologist/Models/skeleton_2-5.glb"
import skeletonBaseTex2 from "~/assets/Games/Radiologist/Textures/skeleton_2-5.jpg"

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
        BAKE: skeletonBaseTex1,
        HEART_SCALE: 22
    },
    SKELETON2: {
        URL: skeleton2,
        SCALE: 1.5,
        BAKE: skeletonBaseTex2,
        HEART_SCALE: 100
    },
    SKELETON3: {
        URL: skeleton3,
        SCALE: 1.5,
        BAKE: skeletonBaseTex3,
        HEART_SCALE: 100
    },
    SKELETON4: {
        URL: skeleton4,
        SCALE: 1.5,
        BAKE: skeletonBaseTex4,
        HEART_SCALE: 100
    },
    SKELETON5: {
        URL: skeleton5,
        SCALE: 1.5,
        BAKE: skeletonBaseTex5,
        HEART_SCALE: 100
    },
    CLIPBOARD: {
        URL: clipboard,
        SCALE: 1,
        BAKE: clipboardTex,
    }
}
