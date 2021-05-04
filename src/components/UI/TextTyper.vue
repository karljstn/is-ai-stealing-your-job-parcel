<template>
	<p>
		<span>{{ typedText }}</span
		><span class="cursor"></span>
	</p>
</template>

<script lang="ts">
import Vue from 'vue';
import { RAFS } from '~constants/RAFS';
import raf from '~singletons/RAF';

let displayRatio = 0;
let needUpdate = false;
let needWriting = false;

export default Vue.extend({
	mounted() {
		needUpdate = true;
		needWriting = true;
		raf.subscribe(RAFS.TYPER, this.update);
	},
	data() {
		return {
			speed: 1,
			typedText: '',
		};
	},
	props: ['a'],
	methods: {
		write(dt: number) {
			displayRatio += this.speed * (dt / 1000);

			if (displayRatio >= 1) {
				displayRatio = 1;
				needWriting = false;
			}

			const nbChar = Math.floor(displayRatio * this.$props.a.length);
			this.typedText = this.$props.a.substring(0, nbChar);

			// console.log(this.textToType.substring(0, nbChar))
		},
		update(deltaTime = 0) {
			// console.log(deltaTime)

			if (needUpdate) {
				if (needWriting) {
					this.write(deltaTime);
				} else {
					// this.erase(deltaTime)
				}
			}
		},
	},
});
</script>

<style scoped lang="scss">
p {
	color: white;
}

span {
	color: white;
}

.cursor {
	position: absolute;
	width: 2px;
	height: 15px;
	background-color: white;
	animation: cursor-pulse 1s infinite;
}

@keyframes cursor-pulse {
	0% {
		opacity: 1;
	}

	50% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
}
</style>
