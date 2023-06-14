import { FrameSettings } from './Frame'

export const BackgroundSettings = {
  imageSrc: new URL('@/assets/map/background.png', import.meta.url).href,
  width: 320,
  height: 320,
  bottomPadding: 28,
}

export class Background {
  ctx: CanvasRenderingContext2D
  image: HTMLImageElement

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = BackgroundSettings.imageSrc
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      FrameSettings.padding,
      FrameSettings.titleBarHeight,
      BackgroundSettings.width,
      BackgroundSettings.height,
    )
  }
}
