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

  constructor(ctx: CanvasRenderingContext2D, imageSrc: string, index: number) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = imageSrc
    this.image.width = MenusSettings.width
    this.image.height = MenusSettings.height
    this.index = index
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      /**
       * 0 None Active
       * 1 Active
       */
      MenusSettings.width * 0,
      MenusSettings.height * (this.index - 1),
      MenusSettings.width,
      MenusSettings.height,
      getMenusStartX(this.index),
      getMenusStartY(),
      MenusSettings.width,
      MenusSettings.height,
    )
  }
}