import skeleton1 from "~/assets/Games/Radiologist/Models/skeleton_1.glb"
import skeletonBaseTex1 from '~/assets/Games/Radiologist/Textures/skeleton_1.jpg'

import skeleton2 from "~/assets/Games/Radiologist/Models/skeleton_1.glb"
import skeletonBaseTex2 from '~/assets/Games/Radiologist/Textures/skeleton_2.jpg'

export const SKELETONS = {
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
}