export const FrameSettings = {
  imageSrc: new URL('@/assets/map/frame.png', import.meta.url).href,
  padding: 4,
  titleBarHeight: 36,
  width: 328,
  height: 360,
}

export class Frame {
  ctx: CanvasRenderingContext2D
  image: HTMLImageElement
  width: number
  height: number

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = FrameSettings.imageSrc
    this.width = FrameSettings.width
    this.height = FrameSettings.height
  }

  draw() {
    this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
  }
}
