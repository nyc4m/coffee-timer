<script setup lang="ts">
import { ref, onUnmounted, computed } from 'vue'
import { useClock } from '../composables/useClock'

const started = ref(false)
const { clock: mainClock, start: startMainTimer, stop: stopMainTimer } = useClock()
const { clock: secondaryTimer, start: startSecondaryTimer, stop: stopSecondaryTimer, reset: resetSecondaryTimer } = useClock()

onUnmounted(() => {
    if (started.value) {
        stopMainTimer()
    }
})

function onStart(): void {
    started.value = true
    startMainTimer()
    startSecondaryTimer()
}

function onStop(): void {
    started.value = false
    stopMainTimer()
    stopSecondaryTimer();
}

function prefixWith0(value: number) {
    return value < 10 ? `0${value}` : value
}

const mainSeconds = computed(() => prefixWith0(mainClock.s))
const mainMinutes = computed(() => prefixWith0(mainClock.m))

</script>

<template>
    <div class="main-container">
        <h1 class="main-container--title">Cofee Timer</h1>
        <div v-if="started" class="timer">
            <p class="timer--time">{{ mainMinutes }} : {{ mainSeconds }}</p>
            <div
                class="timer--time"
                :class="{ 'timer--time-red': secondaryTimer.s >= 45 }"
            >{{ secondaryTimer.s }}</div>
            <button class="timer--button-reset" @click="resetSecondaryTimer">Reset</button>
            <button class="timer--button-stop" @click="onStop()">Stop</button>
        </div>
        <div v-else class="timer">
            <button class="timer--button-start" @click="onStart()">Start Timer</button>
        </div>
    </div>
</template>

<style scoped lang="sass">
@use "../globals"

.main-container
    @include globals.flex-column
    
    @media (min-width: 200px)
        padding: 1rem 2rem
    @media (min-width: 1200px)
        padding: 6rem 10rem
    @media (min-width: 2500px)
        padding: 6rem 30rem

    &--title
        font-size: 3rem


.timer
    @include globals.flex-column
    align-items: center
    gap: 2rem
    &--time
        font-size: 2rem
        &-red
            color: red
    &--button-start
        @include globals.button
    &--button-stop
        @include globals.button
        border-color: pink
        color: pink
    &--button-reset
        @include globals.button
        border-color: orange
        color: orange
</style>
