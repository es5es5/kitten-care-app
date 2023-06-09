import { MenuShowingState, Menus } from '@/assets/game/Menus'
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
    getActiveMenuIndex: (state) =>
      state.menuList.find(
        (menu) => menu.showingState === MenuShowingState.Active,
      )?.index || 0,
    getHeldMenuIndex: (state) =>
      state.menuList.find((menu) => menu.isHeld === true)?.index || 0,
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
    setCanvasEventListener() {
      this.canvas.addEventListener('pointermove', (e: PointerEvent) => {
        this.getMenuList.forEach((menu) => {
          menu.setActive(e)
          menu.setDragged(e)
        })

        if (this.getActiveMenuIndex) {
          switch (this.getActiveMenuIndex) {
            case 1:
              this.setCursor('grab')
              if (this.getHeldMenuIndex) this.setCursor('grabbing')
              break
            case 2:
              this.setCursor('grab')
              if (this.getHeldMenuIndex) this.setCursor('grabbing')
              break
            case 3:
              this.setCursor('pointer')
              break
            case 4:
              this.setCursor('pointer')
              break
            case 5:
              this.setCursor('pointer')
              break
          }
        }
      })

      this.canvas.addEventListener('pointerdown', (e: PointerEvent) => {
        this.getMenuList.forEach((menu) => {
          menu.setDragging(e)
        })
      })

      this.canvas.addEventListener('pointerup', (e: PointerEvent) => {
        this.getMenuList.forEach((menu) => {
          menu.setDropped(e)
        })
      })
    },
  },
})
