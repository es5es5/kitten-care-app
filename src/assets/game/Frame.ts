export const FrameSettings = {
  padding: 4,
  titleBarHeight: 37,
  width: 360,
  height: 370,
}

export class Frame {
  ctx: CanvasRenderingContext2D
  image: HTMLImageElement
  width: number
  height: number

  constructor(ctx: CanvasRenderingContext2D, imageSrc: string) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = imageSrc
    this.width = FrameSettings.width
    this.height = FrameSettings.height
  }

  draw() {
    this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
  }
}
