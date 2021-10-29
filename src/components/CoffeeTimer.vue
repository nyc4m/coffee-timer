<script setup lang="ts">
import { ref } from 'vue'

const started = ref(false)

</script>

<template>
    <div v-if="started" class="timer">
        <p>Started</p>
        <button class="timer--button-stop" @click="started = false">Stop</button>
    </div>
    <div v-else class="timer">
        <button class="timer--button-start" @click="() => started = true">Start Timer</button>
    </div>
</template>

<style scoped lang="sass">

@mixin button
    font-size: 1.2rem
    padding: 0.3rem
    background-color: white
    border-color: lightgrey
    color: lightgrey
    border-radius: 6px
    border-style: solid
    border-width: 2px
    &:hover
        background-color: #f4f4f4
    &:active
        background-color: #f6f6f6


.timer
    display: flex
    flex-direction: column
    align-items: center
    &--button-start
        @include button
    &--button-stop
        @include button
        border-color: pink
        color: pink
</style>
