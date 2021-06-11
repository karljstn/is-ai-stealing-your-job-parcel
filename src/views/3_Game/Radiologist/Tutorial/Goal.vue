<template>
    <div class="goal-container">
        <p>
            Each file has to be processed within a 45 second time limit. Failure to do so will incur penalties
            in your overall timer.
        </p>

        <p>
            In trouble? Click on the AI cursor icon to ask the AI for assistance. Read each patient files for
            clues.
        </p>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import store from "~/store"

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.goal-container {
    p {
        font-size: 1.2em;
        width: 75%;
        text-align: center;
        // margin: auto;
        margin: 25px auto;
    }
}
</style>
