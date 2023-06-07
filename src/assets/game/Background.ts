import { FrameSettings } from './Frame'

export const BackgroundSettings = {}

export class Background {
  ctx: CanvasRenderingContext2D
  image: HTMLImageElement

  constructor(ctx: CanvasRenderingContext2D, imageSrc: string) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = imageSrc
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      FrameSettings.padding,
      FrameSettings.titleBarHeight,
      FrameSettings.width - FrameSettings.padding * 2,
      FrameSettings.height -
        FrameSettings.titleBarHeight -
        FrameSettings.padding,
    )
  }
}
