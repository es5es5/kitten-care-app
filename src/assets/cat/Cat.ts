export const CatSettings = {
  imageSrcLeft: new URL('@/assets/cat/cat_left.png', import.meta.url).href,
  width: 128,
  height: 128,
}

export class Cat {
  ctx: CanvasRenderingContext2D
  image: HTMLImageElement
  startX: number
  startY: number
  width: number
  height: number
  speed: number
  state: string

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    state: string,
  ) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = CatSettings.imageSrcLeft

    this.startX = x
    this.startY = y
    this.width = CatSettings.width
    this.height = CatSettings.height
    this.state = state
    this.speed = 10

    return this
  }

  draw() {}
}
