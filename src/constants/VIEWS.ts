import { GLTF_TYPE, VIEW } from '~types'
import { MODELS } from './MODELS'

export const VIEWS: VIEW[] = [
	{
		ROUTE_NAME: "IntroThreatened",
		LOTTIE: {
			URL: '~/assets/Lottie/6. AI IS.json',
			SCALE: 1
		},
		MESHES: [
			{
				TYPE: GLTF_TYPE.MOUSED,
				MODEL: MODELS.EMOJI_CRY
			}
		]
	}
]