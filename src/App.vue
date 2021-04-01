<template>
	<div>
		<router-view />
	</div>
</template>

<script lang="js">
import './styles/_global.scss'

import Vue from "vue"

import store from "~/store"
import CustomEase from "~/lib/CustomEase/esm/CustomEase.js"
import gsap from "gsap"

gsap.registerPlugin(CustomEase)

const name = "custom"
const ease = "M0,0,C0.126,0.382,0.218,0.566,0.376,0.714,0.46,0.793,0.58,0.894,0.684,0.924,0.818,0.962,0.898,1,1,1"
const testEase = CustomEase.create(
  name,
  ease
)

store.commit("setEase", { name: "test", ease: testEase })

if(store.state.devMode.enabled && store.state.devMode.goToProgression) store.commit("setProgression", store.state.devMode.goToProgression)

export default Vue.extend({
    name: "Home",
})
</script>

<style lang="scss"></style>
