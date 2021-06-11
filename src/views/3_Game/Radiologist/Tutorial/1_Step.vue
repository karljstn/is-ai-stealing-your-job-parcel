<template>
    <div class="explanation-container">
        <img src="~/assets/Games/Radiologist/Icons/Box/05-box.png" alt="" />
        <p>
            Each file has to be processed within a 45 second time limit. Failure to do so will incur penalties
            in your overall timer.
        </p>
    </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.explanation-container {
    img {
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 160px;
        height: 150px;
    }

    p {
        width: 77%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.2em;
        text-align: center;
        line-height: 130%;
    }
}
</style>
