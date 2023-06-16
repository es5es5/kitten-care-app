import { FrameSettings } from '@/assets/game/Frame'
import { defineStore } from 'pinia'

export const CatSettings = {
  imageSrcLeft: new URL('@/assets/cat/cat_left.png', import.meta.url).href,
  imageSrcRight: new URL('@/assets/cat/cat_right.png', import.meta.url).href,
  width: 128,
  height: 128,
}

interface CatState {
  imageSrc: string
  startX: number
  startY: number
  width: number
  height: number
  speed: number
  direction: -1 | 1
  state: string
}

export const useCatStore = defineStore({
  id: 'Cat',
  state: (): CatState => ({
    imageSrc: '',
    startX: 0,
    startY: 0,
    width: 128,
    height: 128,
    speed: 10,
    direction: 1,
    state: 'sleep',
  }),
  getters: {
    getCatState: (
      state,
    ): {
      startX: number
      startY: number
      speed: number
      state: string
      direction: -1 | 1
    } => {
      return {
        startX: state.startX,
        startY: state.startY,
        speed: state.speed,
        state: state.state,
        direction: state.direction,
      }
    },
  },
  actions: {
    initCatState() {
      this.imageSrc = CatSettings.imageSrcLeft
      this.startX = FrameSettings.width / 2 - CatSettings.width / 2
      this.startY =
        FrameSettings.height -
        CatSettings.height -
        FrameSettings.titleBarHeight +
        FrameSettings.padding * 2
      this.state = 'idle'
      this.direction = 1
      this.speed = 10
    },
    setCatState(value: {
      x: number
      y: number
      speed: number
      state: string
      direction: -1 | 1
    }) {
      this.startX = value.x
      this.startY = value.y
      this.speed = value.speed
      this.state = value.state
      this.direction = value.direction
    },
  },
})
