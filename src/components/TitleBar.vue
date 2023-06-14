<script lang="ts" setup>
import { reactive, onMounted } from 'vue'

const data = reactive({})
const electron = require('electron')

onMounted(() => {})

const minimizeApp = () => {
  electron.ipcRenderer.send('minimizeApp')
}

const maximizeApp = () => {
  electron.ipcRenderer.send('maximizeApp')
}
const closeApp = () => {
  electron.ipcRenderer.send('closeApp')
}
</script>

<template>
  <div class="container">
    <button type="button" id="minimize" @click="minimizeApp">_</button>
    <!-- <button type="button" id="maximize" @click="maximizeApp">ㅁ</button> -->
    <button type="button" id="close" @click="closeApp">X</button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  -webkit-app-region: drag;
  background-color: #6c395c;

  height: 24px;
  max-width: 328px;
  display: flex;

  padding: 4px;
  line-height: 1;

  border-radius: 4px 4px 0 0;

  * {
    -webkit-app-region: no-drag;
  }
}
</style>
