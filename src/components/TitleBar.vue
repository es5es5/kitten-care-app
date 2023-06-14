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
    <img src="@/assets/map/icon.png" alt="icon" class="windowButton icon" />
    <img
      src="@/assets/map/minimize.svg"
      alt="minimize"
      class="windowButton minimize"
      @click="minimizeApp"
    />
    <img
      src="@/assets/map/close.svg"
      alt="close"
      class="windowButton close"
      @click="closeApp"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  -webkit-app-region: drag;
  background-color: #6c395c;

  height: 24px;
  max-width: 328px;
  display: flex;
  // justify-content: space-between;
  // align-items: center;

  padding: 4px 5px 4px 4px;
  line-height: 1;

  border-radius: 4px 4px 0 0;

  * {
    -webkit-app-region: no-drag;
  }

  .windowButton {
    padding: 2px;
    // flex-direction: row;
    &.icon {
      margin-right: auto;
    }
    &.minimize {
      margin-right: 5px;
    }
    &.close {
      // padding: 2px 4px;
      // border: 1px solid white;
    }
  }
}
</style>
