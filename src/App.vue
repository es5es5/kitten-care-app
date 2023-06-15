<script lang="ts" setup>
import { reactive } from 'vue'
import { RouterView } from 'vue-router'
const data = reactive({})
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
