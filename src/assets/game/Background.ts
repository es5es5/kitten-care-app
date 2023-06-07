import { FrameSettings } from './Frame'

export const BackgroundSettings = {
  width: 320,
  height: 320,
}

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
      // FrameSettings.width - FrameSettings.padding * 2,
      BackgroundSettings.width,
      // FrameSettings.height -
      //   FrameSettings.titleBarHeight -
      //   FrameSettings.padding,
      BackgroundSettings.height,
    )
  }
}
