<template>
    <div class="toolbar-container">
        <div class="cases-to-come">
            <transition-group name="cases">
                <Folder
                    v-for="casesInfo in casesPending"
                    :key="casesInfo.index"
                    :duration="casesInfo.duration"
                    :index="casesInfo.index"
                    :removeFolder="removeFolder"
                    :help="help"
                ></Folder>
            </transition-group>
        </div>
        <img src="~/assets/Games/Radiologist/Icons/loop.png" class="loop" alt="" />
        <div class="files-processed">
            <img src="~/assets/Games/Radiologist/Icons/Box/05-box.png" alt="" />
            <div class="wrapper">
                <span class="cases">{{ this.progress }}</span>
                <span class="processed"
                    >file{{ this.progress < 2 ? "" : "s" }} <br />
                    processed</span
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import Folder from "./Folder.vue"
import AudioController from "~/singletons/AudioController"
import store from "~/store"

const notifications = [
    "A new file just arrived, hurry and finish the one you are treating!",
    "And one more file!",
    `Wow, that's a lot of files accumulating...`
]

export default Vue.extend({
    props: ["timerCanStart", "help"],
    data(): {
        casesPending: Object[]
        duration: number
        intervalDuration: number
        index: number
        interval: any
        ticker: any
        timeElapsed: number
        notification: number
    } {
        return {
            casesPending: [],
            duration: 45,
            intervalDuration: 24,
            index: 0,
            interval: 0,
            ticker: 0,
            timeElapsed: 0,
            notification: 0
        }
    },
    mounted() {
        store.commit("setRemoveFolder", this.removeFolder)
        store.commit("setAddFolder", this.addFolder)
    },
    watch: {
        timerCanStart(newVal) {
            if (newVal) this.start()
        },
        index(newVal) {
            if (newVal === 5) clearInterval(this.interval)
        },
        help(newVal) {
            if (newVal) {
                clearInterval(this.ticker)
                clearInterval(this.interval)
            } else {
                const timer = (this.intervalDuration - this.timeElapsed) * 1000

                // console.log("new timer is", timer);

                this.ticker = setInterval(() => {
                    this.timeElapsed++
                }, 1000)

                this.interval = setTimeout(() => {
                    // console.log("setTimeOut with the remaining seconds");
                    if (this.index < 5) this.addFolder()
                    this.timeElapsed = 0
                    // clearInterval(this.interval);
                    // console.log("set the new timer with 24 seconds");
                    this.interval = setInterval(() => {
                        // console.log("test here");
                        if (this.index < 5) this.addFolder()
                        this.timeElapsed = 0
                    }, this.intervalDuration * 1000)
                }, timer)
            }
        }
    },
    computed: {
        progress() {
            return store.state.radiologist.progress
        }
    },
    methods: {
        start() {
            this.addFolder()

            this.ticker = setInterval(() => {
                this.timeElapsed++
            }, 1000)

            this.interval = setInterval(() => {
                if (this.index < 5) {
                    this.addFolder()
                }
            }, this.intervalDuration * 1000)
        },
        addFolder() {
            if (this.index < 5) {
                this.casesPending.push({
                    duration: this.duration,
                    index: this.index++
                })

                AudioController.play("newfile")

                setTimeout(() => {
                    if (this.notification < notifications.length && this.casesPending.length > 1) {
                        store.state.radiologist.addNotification(5000, notifications[this.notification])
                        this.notification++
                    }
                }, 500)
            }
        },
        removeFolder(index: number) {
            const i = this.casesPending.findIndex((elem: any) => elem.index === index)
            this.casesPending.splice(i, 1)
        }
    },
    components: {
        Folder
    }
})
</script>

<style lang="scss" scoped>
.toolbar-container {
    width: 580px;
    height: 50px;
    // width: 40%;
    // height: 5vh;
    background-color: #dedcdc;
    // background-image: url("~/assets/Games/Radiologist/files-bar.png");
    // background-repeat: no-repeat;
    // background-size: contain;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    position: absolute;
    bottom: 5%;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .loop {
        width: 30px;
        height: 30px;
    }

    .cases-to-come {
        width: 50%;
        height: 100%;

        span {
            display: flex;
        }

        .cases-enter,
        .cases-leave-to {
            opacity: 0;
            transform: translateX(100px);
        }
        .cases-leave-active {
            //set transition duration when leaving
            //position absolute is required i guess
            position: absolute;
            transition: all 0.5s;
        }
    }

    .files-processed {
        width: 40%;
        display: flex;

        img {
            width: 108px;
            position: relative;
            bottom: 10px;
            right: 10px;
            -webkit-filter: drop-shadow(1px 1px 1px #000);
            filter: drop-shadow(1px 1px 1px #000);
        }

        .wrapper {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: relative;
            left: 5px;

            .cases {
                font-size: 2em;
                margin-right: 7.5px;
            }

            .processed {
                line-height: 15px;
                font-weight: lighter;
                font-size: initial;
            }
        }
    }
}
</style>
