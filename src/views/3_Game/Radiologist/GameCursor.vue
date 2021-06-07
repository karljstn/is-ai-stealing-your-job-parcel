<template>
  <div class="cursor" :class="this.currentState" ref="cursor"></div>
</template>

<script lang="ts">
import Vue from "vue";
import MouseController from "~/singletons/MouseController";
import RAF from "~/singletons/RAF";
import store from "~/store";
import {Vector2} from 'three'

const cursor = {
  target: new Vector2(),
  current: new Vector2(),
}

export default Vue.extend({
	props:["timerPause"],
  data(){
    return{
      currentState: ''
    }
  },
  mounted() {
    store.commit("setUpdateCursor", this.updateCursor);
    RAF.subscribe("cursor", this.update);
  },
  destroyed() {
    RAF.unsubscribe("cursor");
  },
  methods: {
    updateCursor(mode: number) {
      const newState = this.check(mode)
	  
	  if(MouseController.hoveredNodeName === 'CANVAS'){
			if(this.currentState !== newState) {
				this.currentState = newState
			}
	  }else{
		  this.currentState = ''
	  }
     
    },
	check(mode: number){
	    switch (mode) {
      case -1:
			case 0:
				return 'rotate'
      case 1:
        return 'dolly'
      case 2:
        return 'pan'
      case -5:
        return 'click'
      default:
			  	return ''
        }
	},
    update() {
      cursor.target.copy(MouseController.raw.current)
      cursor.current.lerp(cursor.target, 0.8)

      const x = cursor.current.x
      const y = cursor.current.y - this.$refs.cursor.offsetHeight/2

      this.$refs.cursor.style.transform = `translate3d(${x}px, ${y}px, 0px)`
    },
  },
});
</script>

<style lang="scss" scoped>
.cursor {
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: absolute;
  z-index: 100;
  pointer-events: none;
  user-select: none;
}
.dolly{
	background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/zoom.svg");
  background-color: green;
}
.rotate {
  background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/rotate.svg");
  background-color: red;
}
.click {
  background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/select.svg");
}
.pan {
	 background-color: white;
  background-image: url("~/assets/Games/Radiologist/Icons/Tutorial/move.svg");
}
</style>