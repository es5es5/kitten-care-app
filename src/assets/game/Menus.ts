import { FrameSettings } from './Frame'

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

  constructor(ctx: CanvasRenderingContext2D, index: number) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = MenusSettings.imageSrc
    this.image.width = MenusSettings.width
    this.image.height = MenusSettings.height
    this.index = index
    this.startX = getMenusStartX(this.index)
    this.startY = getMenusStartY()
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
    const Element = e.target as HTMLCanvasElement
    if (this.isStatic) return
    if (this.isHeld) return

    if (
      e.offsetX > this.startX &&
      e.offsetX < this.startX + MenusSettings.width &&
      e.offsetY > this.startY &&
      e.offsetY < this.startY + MenusSettings.height
    ) {
      this.isActive = true
      Element.style.cursor = 'pointer'
    } else {
      this.isActive = false
      Element.style.cursor = 'default'
      e.preventDefault
      return
    }
  }

  setDragging(x: number, y: number) {
    if (this.isStatic) return

    if (
      x > getMenusStartX(this.index) &&
      x < getMenusStartX(this.index) + MenusSettings.width &&
      y > getMenusStartY() &&
      y < getMenusStartY() + MenusSettings.height
    ) {
      this.isHeld = true
      this.isActive = true
    }
  }

  setDragged(x: number, y: number) {
    this.startX = x
    this.startY = y
  }
}
