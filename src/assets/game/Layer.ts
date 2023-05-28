export const LayerSettings = {}

export class Layer {
  ctx: CanvasRenderingContext2D
  image: HTMLImageElement
  width: number
  height: number

  constructor(
    ctx: CanvasRenderingContext2D,
    imageSrc: string,
    width: number,
    height: number,
  ) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = imageSrc
    this.image.width = width
    this.image.width = width
    this.width = width
    this.height = height
  }

  drawLayer() {
    this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
  }
}
