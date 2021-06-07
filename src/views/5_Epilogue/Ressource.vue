<template>
<div class="ressource-wrapper">
    <div class="ressource" v-on:click="active = !active">
        <span class="subtitle">{{data.name}}</span>
        <span class="toggle" :class="active ? 'toggle-active' : ''"></span>
    </div>
    <div class="content" v-if="active">
        <a
        v-for="(item, index) in data.data"
        :key="index"
        :href="item.link"
        target="_blank"
        >
        {{item.title}}
        </a>
    </div>
</div>

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props:["data"],
  data(){
      return{
          active: false
      }
  }
})
</script>

<style lang="scss" scoped>
    .ressource-wrapper{
        border-bottom: solid white 1px;
            padding: 10px 0;

        .ressource{
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            position: relative;

           .subtitle{
                color: white;
           }

            .toggle{
                // position: relative;
                &:after, 
                &:before{
                    content: '';
                    height: 20px;
                    width: 4px;
                    background-color: white;
                    position: absolute;
                    right: 10px;
                    bottom: 0;
                    top: 0;
                    margin: auto;
                    transition: all .2s;
                }

                &:after{
                    // transform: rotate(45deg);
                }

                &:before{
                    transform: rotate(90deg);
                }
            }

            .toggle-active{
                &:after, &:before{
                    transform: rotate(90deg);
                }
            }
        }

        .content{
            padding: 10px;
            padding-left: 50px;
            padding-right: 0;

            a{
                display: block;
                color: white;
                font-weight: lighter;
                font-size: 1.2em;
                padding: 15px 0;
                transform: translate3d(0, 0, 0);
                transition: all .2s;
                position: relative;
                user-select: none;

                &:hover{
                    transform: translate3d(20px, 0px, 0px);
                    // font-weight: bold;
                    
                    &:after{
                        opacity: 1;
                    }
                }

                &:after{
                    content: '';
                    width: 39px;
                    height: 50px;
                    background-image: url("~/assets/Images/Remedy/arrow-orange.png");
                    background-position: center;
                    background-size: contain;
                    background-repeat: no-repeat;
                    position: absolute;
                    left: -50px;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    opacity: 0;
                    transition: all .2s;
                }

                
            }

//               .arrow {
//     margin: auto;
//     margin-right: 350px;
//     margin-bottom: 100px;
//     display: block;
//     background-image: url("~/assets/Images/Remedy/arrow.svg");
//     background-position: center;
//     background-size: contain;
//     background-repeat: no-repeat;
//     width: 100px;
//     height: 50px;
//   }
        }
    }
    
</style>