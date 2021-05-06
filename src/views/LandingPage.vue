<template>
	<!-- <transition appear name="landing" v-bind:css="false" v-on:enter="enter" v-on:leave="leave"> -->
		<div>
			<section>
				<div class="container">
					<div :class="getLetsBeginClass">
							<p>Let's begin !</p>
					</div>
					<div :class="getParagraphsClass">
						<save-rect :rectName="rect">
							<SplitText ref="scroll" text="Scroll"></SplitText>
							<span>&nbsp;</span>
							<SplitText ref="to" text="to"></SplitText>
							<span>&nbsp;</span>
							<SplitText ref="throw" text="throw"></SplitText>
							<SplitText ref="your" text="your"></SplitText>
							<span>&nbsp;</span>
							<SplitText ref="biases" text="biases"></SplitText>
							<span>&nbsp;</span>
							<SplitText ref="away" text="away"></SplitText>
						</save-rect>
					</div>
			</section>
		</div>
	<!-- </transition> -->
</template>

<script lang="ts">
import { RECTS } from '~/constants/RECTS';
import Button from '~/components/UI/Button.vue';
import QuestionForm from '~/components/UI/QuestionForm.vue';
import SaveRect from '~/components/Common/SaveRect.vue';
import Autoskip from '~components/Common/Autoskip.vue';
import SplitText from '~components/Common/SplitText.vue';
import Vue from 'vue';
import store from '~/store';
import gsap from 'gsap';
import { fadeBackground } from '~util';

export default Vue.extend({
	name: 'landing-page',
	data() {
		return {
			rect: RECTS.LANDING,
			show: true,
		};
	},
	computed:{
		getLetsBeginClass(){
			return !store.state.hideScrollDownArrow ? "begin" : "begin fadeOut"
		},
		getParagraphsClass(){
			return !store.state.hideScrollDownArrow ? "landing-paragraphs" : "landing-paragraphs fadeOut"
		}
	},
	methods: {
		enter(){
			// console.log('hey')
			store.state.scene?.TrashcanScene.Trashcan.in()
		},
		leave(el:any, done:any){			
			// store.state.scene?.TrashcanScene.Trashcan.drop().then(done)

			store.state.scene?.TrashcanScene.Trashcan.drop()?.then(()=>{
				done()
			});

			// store.commit("toggleHideScrollDownArrow")
			// fadeBackground({ color: PALETTE.YELLOW });
		}
	},
	mounted() {
		// Three
		store.state.scene?.TrashcanScene.start();
		store.state.scene?.TrashcanScene.Trashcan.in()

		// Text animations
		const refs: any[] = Object.values(this.$refs);
		const elements: HTMLElement[] = refs.map(ref => ref.$refs.container);
		const timelineSettings = {
			staggerValue: 0.1,
		};

		const timeline = gsap.timeline({ paused: true, repeat: -1 });
		timeline.addLabel('show').set(elements, { opacity: 1, stagger: timelineSettings.staggerValue });
		timeline.addLabel('hide').set(elements, { opacity: 0, stagger: timelineSettings.staggerValue });
		setTimeout(() => {
			refs[0].wobble();
			timeline.tweenFromTo('show', 'hide');
		}, 500);

		// Tweaks
		const folder = store.state.tweakpane?.addFolder({ title: 'Text', expanded: false });
		const button = folder?.addButton({ title: 'Toggle' });
		button?.on('click', () => {
			this.show = !this.show;
			this.show ? timeline.tweenFromTo('show', 'hide') : timeline.tweenFromTo('hide', 'show');
		});

		fadeBackground({ routeName: 'LandingPage' });
	},
	destroyed() {
		store.state.scene?.TrashcanScene.destroy();
	},
	components: {
		QuestionForm,
		Button,
		SaveRect,
		Autoskip,
		SplitText,
	},
});
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	.begin{
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		top: -17%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 100;
		font-style: italic;
		transition: opacity 0.3s ease-in;

		&.fadeOut{
			opacity: 0;
		}
	}
	.landing-paragraphs {
		display: flex;
		flex-direction: column;
		height: 50vh;
		justify-content: center;
		align-items: center;
		transition: opacity 0.2s ease-in-out;

		&.fadeOut{
			opacity: 0;
		}

		.hello,
		.threatened,
		.amiright {
			width: fit-content;
		}
		.hello {
			margin-right: 6rem;
			font-size: 6rem;
		}
	}
	.form {
		transition: opacity 0.2s ease-in-out;
		margin: 2rem 0 0 0;
	}
	.hide {
		display: none;
		opacity: 0;
	}
}
</style>

<style lang="scss">
.landing-paragraphs {
	> div {
		display: flex;
		flex-wrap: wrap;
		width: 50vh;
		justify-content: center;
		align-items: center;
		
		span {
			font-size: 5.7vh;
			text-align: center;
		}
	}
}
</style>
