import { spriteSettings as CatSpriteSettings } from './states'

export class Cat {
  x: number
  y: number
  width: number
  height: number
  speed: number
  state: string
  image: HTMLImageElement

  constructor(x: number, y: number, state: string) {
    this.x = x
    this.y = y
    this.width = CatSpriteSettings.spriteWidth
    this.height = CatSpriteSettings.spriteHeight
    this.state = state
    this.speed = 10
    this.image = new Image()
    this.image.src = './cat.png'
  }

  update() {
    this.x = this.x + this.speed
    this.y = this.y + this.speed
  }

  draw() {
    // const canvas = document.getElementById('canvas1') as HTMLCanvasElement
    // const ctx = canvas.getContext('2d')!
  }
}
