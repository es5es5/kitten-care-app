import { FrameSettings } from './Frame'
import { useGameStore } from '@/store/game'

const gameStore = useGameStore()

export const MenusSettings = {
  imageSrc: new URL('@/assets/map/menus.png', import.meta.url).href,
  width: 56,
  height: 56,
  paddingHorizontal: 4,
  paddingVertical: 8,
}

function getMenusStartX(index: number) {
  let result =
    FrameSettings.padding +
    MenusSettings.paddingHorizontal +
    (MenusSettings.width + MenusSettings.paddingHorizontal) * (index - 1)
  return result + 10
}

function getMenusStartY() {
  return FrameSettings.titleBarHeight + MenusSettings.paddingVertical
}

export class Menus {
  ctx: CanvasRenderingContext2D
  image: HTMLImageElement
  index: number // 메뉴 순서
  startX: number
  startY: number
  isActive = false
  isHeld = false
  isStatic = false
  isFalling = false

  constructor(ctx: CanvasRenderingContext2D, index: number) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = MenusSettings.imageSrc
    this.image.width = MenusSettings.width
    this.image.height = MenusSettings.height
    this.index = index
    this.startX = getMenusStartX(this.index)
    this.startY = getMenusStartY()

    return this
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      /**
       * 0 None Active
       * 1 Active
       */
      this.isActive ? MenusSettings.width : 0,
      MenusSettings.height * (this.index - 1),
      MenusSettings.width,
      MenusSettings.height,
      this.startX,
      this.startY,
      MenusSettings.width,
      MenusSettings.height,
    )
    this.isStatic = false
    if (this.isFalling) {
      this.startY += 1
    }
  }

  drawStatic() {
    this.ctx.drawImage(
      this.image,
      /**
       * 0 None Active
       * 1 Active
       */
      0,
      MenusSettings.height * (this.index - 1),
      MenusSettings.width,
      MenusSettings.height,
      getMenusStartX(this.index),
      getMenusStartY(),
      MenusSettings.width,
      MenusSettings.height,
    )
    this.isStatic = true
  }

  setActive(e: PointerEvent) {
    if (this.isStatic) return
    if (this.isHeld) return

    if (
      e.offsetX > this.startX &&
      e.offsetX < this.startX + MenusSettings.width &&
      e.offsetY > this.startY &&
      e.offsetY < this.startY + MenusSettings.height
    ) {
      this.isActive = true
    } else {
      this.isActive = false
      return
    }
  }

  setDragging(e: PointerEvent) {
    if (this.isStatic) return

    if (
      e.offsetX > this.startX &&
      e.offsetX < this.startX + MenusSettings.width &&
      e.offsetY > this.startY &&
      e.offsetY < this.startY + MenusSettings.height
    ) {
      this.isHeld = true
    }
  }

  setDragged(e: PointerEvent) {
    if (this.isHeld) {
      this.startX = e.offsetX - MenusSettings.width / 2
      this.startY = e.offsetY - MenusSettings.height / 2
    }
  }

  setDropped(e: PointerEvent) {
    if (this.isHeld) {
      this.isHeld = false
      this.isFalling = true
    }
    e.preventDefault()
  }
}
