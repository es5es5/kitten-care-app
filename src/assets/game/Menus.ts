import { FrameSettings } from './Frame'

export const MenusSettings = {
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

  constructor(ctx: CanvasRenderingContext2D, imageSrc: string, index: number) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = imageSrc
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

  setActive(x: number, y: number): boolean {
    if (this.isStatic) return false

    if (
      x > this.startX &&
      x < this.startX + MenusSettings.width &&
      y > this.startY &&
      y < this.startY + MenusSettings.height
    ) {
      this.isActive = true
    } else {
      this.isActive = false
    }
    return this.isActive
  }

  setDragged(x: number, y: number, state: boolean) {
    if (this.isStatic) return

    if (!state) {
      this.isHeld = false
      this.isActive = false
    }
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
}
