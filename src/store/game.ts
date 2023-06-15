import { Cat } from '@/assets/cat/Cat'
import { MenuShowingState, Menus } from '@/assets/game/Menus'
import { defineStore } from 'pinia'
interface GameState {
  canvas: any
  ctx: any
  gameFrame: number
  menuList: Array<Menus>
  cursor: string
  cat: Cat
}

export const useGameStore = defineStore({
  id: 'Game',
  state: (): GameState => ({
    canvas: null,
    ctx: null,
    gameFrame: 0,
    menuList: new Array<Menus>(),
    cursor: 'default',
    cat: {} as Cat,
  }),
  getters: {
    getCanvas: (state): HTMLCanvasElement => state.canvas,
    getCtx: (state): CanvasRenderingContext2D => state.ctx,
    getGameFrame: (state): number => state.gameFrame,
    getMenuList: (state) => state.menuList,
    getCursor: (state) => state.cursor,
    getActiveMenu: (state): Menus | null =>
      state.menuList.find(
        (menu) => menu.showingState === MenuShowingState.Active,
      ) ?? null,
    getHeldMenu: (state): Menus | null =>
      state.menuList.find((menu) => menu.isHeld === true) ?? null,
    getCat: (state) => state.cat,
  },
  actions: {
    initGame(canvas: HTMLCanvasElement) {
      this.canvas = canvas
      this.ctx = canvas.getContext('2d')
      this.gameFrame = 0
    },
    intervalGameFrame() {
      this.gameFrame++
    },
    initCat(cat: Cat) {
      this.cat = cat
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

        if (this.getActiveMenu) {
          switch (this.getActiveMenu.index) {
            case 1:
              this.setCursor('grab')
              if (this.getHeldMenu?.index) this.setCursor('grabbing')
              this.cat.setState('walk')
              this.cat.setMoving(e.offsetX - this.cat.startX > 0 ? 1 : -1)
              break
            case 2:
              this.setCursor('grab')
              if (this.getHeldMenu?.index) this.setCursor('grabbing')
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
        } else {
          this.setCursor('default')
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
