<script lang="ts" setup>
import { reactive } from 'vue'
import { RouterView } from 'vue-router'
import TitleBar from './TitleBar.vue'

const data = reactive({})
</script>

<template>
  <div class="layout">
    <TitleBar />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 328px;
  height: 360px;
}
</style>
