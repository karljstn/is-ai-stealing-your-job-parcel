<template>
    <div class="folder">
        <div class="bar-background">
            <div class="bar">
                <div
                    class="progress"
                    :style="{ width: 100 - (this.progress / this.duration) * 100 + '%' }"
                ></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import store from "~/store"

export default Vue.extend({
    props: ["duration", "index", "removeFolder"],
    data(): {
        progress: number
        interval: any
        show: boolean
    } {
        return {
            progress: 0,
            interval: 0,
            show: false
        }
    },
    mounted() {
        if (this.progress === this.duration) {
            this.removeFolder(this.index)
            clearInterval(this.interval)
        }
        this.progress++

        this.interval = setInterval(() => {
            // console.log(this.progress + "/" + this.duration, this.index);

            if (this.progress === this.duration) {
                store.state.radiologist.penalty()
                this.removeFolder(this.index)
                clearInterval(this.interval)
            }
            this.progress++
        }, 1000)
    },
    destroyed() {
        clearInterval(this.interval)
    }
})
</script>

<style lang="scss" scoped>
.folder {
    width: 90px;
    height: 70px;
    background-image: url("~/assets/Games/Radiologist/Icons/File/01-files.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    bottom: 15px;
    margin-right: 10px;

    //transition enter
    transition: all 1s;

    .bar-background {
        width: 43px;
        height: 17px;
        position: absolute;
        background-color: #4f4f7e;
        border-radius: 5px;
        bottom: 10px;
        right: 5px;

        .bar {
            background-color: #f1b832;
            width: 30px;
            height: 5px;
            border-radius: 5px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            .progress {
                background-color: #e4cef6;
                transition: all 0.5s;
                border-radius: 20px;
                height: 5px;
                width: 100%;
                transition: all 0.3s;
            }
        }
    }
}
</style>
