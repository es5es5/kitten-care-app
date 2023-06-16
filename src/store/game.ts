import { Cat, CatState } from '@/assets/cat/Cat'
import { Menu, MenuShowingState, HeldMenu } from '@/assets/game/Menu'
import { defineStore } from 'pinia'
interface GameState {
  canvas: any
  ctx: any
  gameFrame: number
  menuList: Array<Menu>
  cursor: string
  cat: Cat
  heldMenu: HeldMenu | null
}

export const useGameStore = defineStore({
  id: 'Game',
  state: (): GameState => ({
    canvas: null,
    ctx: null,
    gameFrame: 0,
    menuList: new Array<Menu>(),
    cursor: 'default',
    cat: {} as Cat,
    heldMenu: {} as HeldMenu,
  }),
  getters: {
    getCanvas: (state): HTMLCanvasElement => state.canvas,
    getCtx: (state): CanvasRenderingContext2D => state.ctx,
    getGameFrame: (state): number => state.gameFrame,
    getMenuList: (state) => state.menuList,
    getCursor: (state) => state.cursor,
    getActiveMenu: (state): Menu | null =>
      state.menuList.find(
        (menu) => menu.showingState === MenuShowingState.Active,
      ) ?? null,
    getHeldMenu: (state): HeldMenu | null => state.heldMenu,
    getCat: (state) => state.cat,
  },
  actions: {
    initGame(canvas: HTMLCanvasElement) {
      this.canvas = canvas
      this.ctx = canvas.getContext('2d')
      this.gameFrame = 0
      this.heldMenu = null
    },
    intervalGameFrame() {
      this.gameFrame++
    },
    initCat(cat: Cat) {
      this.cat = cat
      this.cat.setState(CatState.SLEEP)
    },
    addMenuList(menu: Menu) {
      this.menuList.push(menu)
    },
    setCursor(cursor: string) {
      this.cursor = cursor
      this.canvas!.style.cursor = this.cursor
    },
    setHeldMenu(heldMenu: HeldMenu | null) {
      this.heldMenu = heldMenu
    },
    setCanvasEventListener() {
      this.canvas.addEventListener('pointermove', (e: PointerEvent) => {
        this.getMenuList.forEach((menu) => {
          menu.setActive(e)
          menu.setDragged(e)
        })

        this.heldMenu?.setHeldMenuPosition(e.offsetX, e.offsetY)

        if (this.getActiveMenu) {
          switch (this.getActiveMenu.index) {
            case 1:
              this.setCursor('grab')
              if (this.getHeldMenu) {
                this.setCursor('grabbing')
                console.log(
                  'this.cat.startX <= this.getHeldMenu.heldX',
                  this.cat.startX,
                  this.getHeldMenu.heldX,
                )
                if (this.cat.startX <= this.getHeldMenu.heldX) {
                  this.cat.setDirection('Right')
                } else {
                  this.cat.setDirection('Left')
                }
                this.cat.setAgro(true)
                this.cat.feeding()
              }
              break
            case 2:
              this.setCursor('grab')
              if (this.getHeldMenu) {
                this.setCursor('grabbing')
              }
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
        this.setHeldMenu(
          new HeldMenu(
            this.getActiveMenu!.ctx,
            this.getActiveMenu!.index,
            e.offsetX,
            e.offsetY,
          ),
        )

        if (this.cat.isAgro) {
          this.cat.setAgro(false)
        }
      })

      this.canvas.addEventListener('pointerup', (e: PointerEvent) => {
        this.getMenuList.forEach((menu) => {
          menu.setDropped(e)
        })
      })
    },
  },
})
