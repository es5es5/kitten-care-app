<script lang="ts" setup>
import { reactive, onMounted, onUnmounted } from 'vue'

const data = reactive({
  isOpenSettings: false,
  isAlwaysOnTop: false,
})
const electron = require('electron')

onMounted(() => {
  window.addEventListener('blur', () => {
    data.isOpenSettings = false
  })
})

onUnmounted(() => {
  window.removeEventListener('blur', () => {})
})

const openSettings = () => {
  data.isOpenSettings = !data.isOpenSettings
}

const minimizeApp = () => {
  electron.ipcRenderer.send('minimizeApp')
}

const maximizeApp = () => {
  electron.ipcRenderer.send('maximizeApp')
}

const setAlwaysOnTop = () => {
  electron.ipcRenderer.send('setAlwaysOnTop')
}

const closeApp = () => {
  electron.ipcRenderer.send('closeApp')
}

const vClickOutsideHandler = (event: PointerEvent): void => {
  const element = event.target as HTMLElement
  if (element.id === 'canvas1') {
    data.isOpenSettings = false
  }
}

electron.ipcRenderer.on(
  'setAlwaysOnTopResponse',
  (event: Event, isAlwaysOnTop: boolean) => {
    data.isAlwaysOnTop = isAlwaysOnTop
  },
)

electron.ipcRenderer.on('blur', (event: Event, isAlwaysOnTop: boolean) => {
  console.log('blur')
})
</script>

<template>
  <div class="container" v-click-outside="vClickOutsideHandler">
    <div class="titlebar">
      <img
        src="@/assets/map/icon.png"
        alt="icon"
        class="windowButton icon"
        @click="openSettings"
      />
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
    <transition name="fade">
      <ul class="setting_wrap" v-if="data.isOpenSettings">
        <li @click="setAlwaysOnTop">
          <img
            class="icon"
            src="@/assets/map/uncheck.svg"
            alt="uncheck"
            v-if="!data.isAlwaysOnTop"
          />
          <img class="icon" src="@/assets/map/check.svg" alt="check" v-else />
          항상 위
        </li>
      </ul>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
}
.titlebar {
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

.setting_wrap {
  position: absolute;
  top: 15px;
  left: 0;
  background-color: #82426e;
  width: 100px;
  padding: 5px;

  border-radius: 4px;

  li {
    display: flex;
    color: white;
    font-size: 12px;
    padding: 4px 10px 4px 0;
    font-weight: normal;
    line-height: 12px;
    vertical-align: middle;

    .icon {
      width: 14px;
      height: 14px;
      margin-right: 4px;
    }

    &:hover {
      border-radius: 2px;
      background-color: #6c395c;
    }
  }
}
</style>
