import skeleton1 from "~/assets/Games/Radiologist/Models/skeleton_1-2.glb"
import skeletonBaseTex1 from "~/assets/Games/Radiologist/Textures/skeleton_1-2.jpg"

import skeleton2 from "~/assets/Games/Radiologist/Models/skeleton_2-6.glb"
import skeletonBaseTex2 from "~/assets/Games/Radiologist/Textures/skeleton_2-6.jpg"

import skeleton3 from "~/assets/Games/Radiologist/Models/skeleton_3-2.glb"
import skeletonBaseTex3 from "~/assets/Games/Radiologist/Textures/skeleton_3-2.jpg"

import skeleton4 from "~/assets/Games/Radiologist/Models/skeleton_4-3.glb"
import skeletonBaseTex4 from "~/assets/Games/Radiologist/Textures/skeleton_4-3.jpg"

import skeleton5 from "~/assets/Games/Radiologist/Models/skeleton_5-3.glb"
import skeletonBaseTex5 from "~/assets/Games/Radiologist/Textures/skeleton_5-3.jpg"

import clipboard from '~/assets/Games/Radiologist/Models/clipboard_2.glb'
import clipboardTex1 from "~/assets/Games/Radiologist/Textures/clipboard_1.jpg"
import clipboardTex2 from "~/assets/Games/Radiologist/Textures/clipboard_2.jpg"
import clipboardTex3 from "~/assets/Games/Radiologist/Textures/clipboard_3.jpg"
import clipboardTex4 from "~/assets/Games/Radiologist/Textures/clipboard_4.jpg"
import clipboardTex5 from "~/assets/Games/Radiologist/Textures/clipboard_5.jpg"

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
        SCALE: 5,
        BAKE1: clipboardTex1,
        BAKE2: clipboardTex2,
        BAKE3: clipboardTex3,
        BAKE4: clipboardTex4,
        BAKE5: clipboardTex5,
    }
}
