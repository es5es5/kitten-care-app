import { Menus } from '@/assets/game/Menus'
import { defineStore } from 'pinia'

interface GameState {
  canvas: any
  ctx: any
  menuList: Array<Menus>
  cursor: string
}

export const useGameStore = defineStore({
  id: 'Game',
  state: (): GameState => ({
    canvas: null,
    ctx: null,
    menuList: new Array<Menus>(),
    cursor: 'default',
  }),
  getters: {
    getCanvas: (state): HTMLCanvasElement => state.canvas,
    getCtx: (state): CanvasRenderingContext2D => state.ctx,
    getMenuList: (state) => state.menuList,
    getCursor: (state) => state.cursor,
  },
  actions: {
    setCanvas(canvas: HTMLCanvasElement) {
      this.canvas = canvas
      this.ctx = canvas.getContext('2d')
    },
    addMenuList(menu: Menus) {
      this.menuList.push(menu)
    },
    setCursor(cursor: string) {
      this.cursor = cursor
      this.canvas!.style.cursor = this.cursor
    },
  },
})
