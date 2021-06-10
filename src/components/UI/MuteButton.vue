<template>
    <div class="bottom">
        <span ref="mute" class="mute-button" v-bind:class="{ activeMute: isMute }" v-on:click="this.mute"
            >mute</span
        >
    </div>
</template>

<script lang="ts">
import { Howler } from "howler"
export default {
    data(): { isMute: Boolean } {
        return {
            isMute: false
        }
    },
    mounted() {
        if (localStorage.getItem("volume") === "0") this.isMute = true
        this.setMute()
    },
    methods: {
        mute() {
            this.isMute = !this.isMute
            this.setMute()
        },
        setMute() {
            if (this.isMute) localStorage.setItem("volume", "0")
            else localStorage.setItem("volume", "1")

            Howler.volume(parseInt(localStorage.getItem("volume")))
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/styles/_variables.scss";
.white-nav .bottom span {
    color: $white;

    &:after {
        background-color: $white;
    }
}
.bottom {
    position: fixed;
    bottom: 0;
    padding: $menu-padding;
    z-index: $menus;

    .mute-button {
        transition: color 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19);
        font-weight: 200;
        cursor: pointer;
        position: relative;

        &:hover {
            &:after {
                width: 43px;
            }
        }

        &:after {
            content: "";
            width: 0px;
            height: 1px;
            background-color: $black;
            position: absolute;
            top: 13px;
            left: -2px;
            transition: all 0.3s;
        }
    }

    .activeMute {
        &:after {
            width: 43px;
            top: 13px;
        }
    }
}
</style>
