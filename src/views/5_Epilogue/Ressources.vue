<template>
  <section>
      <h1>Ressources</h1>
      <div class="ressources-container">
        <Ressource
        v-for="ressource in this.ressources"
        :key="ressource.name"
        :data="ressource"
        ></Ressource>
      </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { fadeBackground } from '~util';
import Ressource from './Ressource.vue'
import ressourcesData from '~/assets/ressources.js'

export default Vue.extend({
    data(){
        return{
            ressources: ressourcesData
        }
    },
    mounted() {
		 fadeBackground({ color: "#052F36" });
	},
    components:{
        Ressource
    }
})
</script>

<style lang="scss" scoped>
    section{
        height: initial;
        padding: initial;
        display: initial;
        color: initial;
    }

    h1{
        color: white;
        font-size: 3.5em;
        font-weight: normal;
        width: 350px;
        margin: 110px;
    }

    .ressources-container{
        width: 1100px;
        display: flex;
        flex-direction: column;
        margin: auto;


    }
</style>