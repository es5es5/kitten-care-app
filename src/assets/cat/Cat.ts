import { BackgroundSettings } from '../game/Background'
import { FrameSettings } from '../game/Frame'
import { SpriteStateListItem, SpriteSettings } from '../models'

export const CatSettings = {
  imageSrcLeft: new URL('@/assets/cat/cat_left.png', import.meta.url).href,
  imageSrcRight: new URL('@/assets/cat/cat_right.png', import.meta.url).href,
  width: 128,
  height: 128,
}

export const catSpriteAnimations = {} as any

export const animationStates = [
  {
    name: 'idle',
    frames: 5,
    speed: 10,
  },
  {
    name: 'idle_agro',
    frames: 3,
    speed: 10,
  },
  {
    name: 'walk',
    frames: 6,
    speed: 10,
  },
  {
    name: 'walk_agro',
    frames: 3,
    speed: 10,
  },
  {
    name: 'sleep',
    frames: 8,
    speed: 10,
  },
  {
    name: 'sleep_agro',
    frames: 3,
    speed: 10,
  },
  {
    name: 'hawl',
    frames: 8,
    speed: 10,
  },
  {
    name: 'standing',
    frames: 3,
    speed: 10,
  },
  {
    name: 'standing_walk',
    frames: 8,
    speed: 10,
  },
  {
    name: 'eat',
    frames: 8,
    speed: 10,
  },
  {
    name: 'wait1',
    frames: 4,
    speed: 10,
  },
  {
    name: 'wait2',
    frames: 1,
    speed: 10,
  },
  {
    name: 'wait3',
    frames: 1,
    speed: 10,
  },
  {
    name: 'dash',
    frames: 3,
    speed: 10,
  },
] as Array<SpriteStateListItem>

const spriteWidth = CatSettings.width
const spriteHeight = CatSettings.height

export const setCatAnimationStates = () => {
  animationStates.forEach((state: SpriteStateListItem, index) => {
    let frames = {
      loc: [] as Array<{ x: number; y: number }>,
    }
    for (let j = 0; j < state.frames; j++) {
      let positionX = j * spriteWidth
      let positionY = index * spriteHeight
      frames.loc.push({ x: positionX, y: positionY })
    }
    catSpriteAnimations[state.name] = frames
    catSpriteAnimations[state.name].speed = state.speed
  })
}

export class Cat {
  ctx: CanvasRenderingContext2D
  image: HTMLImageElement
  startX: number
  startY: number
  speed: number
  state: string
  direction: -1 | 1

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = CatSettings.imageSrcLeft

    this.startX = FrameSettings.width / 2 - spriteWidth / 2
    this.startY =
      FrameSettings.height -
      CatSettings.height -
      BackgroundSettings.bottomPadding
    this.state = 'idle'
    this.speed = 10
    this.direction = 1

    setCatAnimationStates()
    return this
  }

  draw(gameFrame: number) {
    let framePosition =
      Math.floor(Number(gameFrame) / catSpriteAnimations[this.state].speed) %
      catSpriteAnimations[this.state].loc.length
    let frameX = spriteWidth * framePosition
    let frameY = catSpriteAnimations[this.state].loc[framePosition].y

    this.ctx.drawImage(
      this.image,

      frameX, // Sprite Frame X Start
      frameY, // Sprite Frame Y Start
      CatSettings.width, // Sprite Frame X End
      CatSettings.height, // Sprite Frame Y End

      this.startX, // Drawing Position X Start
      this.startY, // Drawing Position Y Start
      CatSettings.width, // Drawing Position X End
      CatSettings.height, // Drawing Position Y End
    )
  }

  setCat(value: {
    x: number
    y: number
    state: string
    speed: number
    direction: -1 | 1
  }) {
    this.startX = value.x
    this.startY = value.y
    this.speed = value.speed
    this.state = value.state
    this.direction = value.direction
    if (this.direction === 1) {
      this.image.src = CatSettings.imageSrcLeft
    } else {
      this.image.src = CatSettings.imageSrcRight
    }
  }

  getCat() {
    return this
  }

  setState(state: string) {
    this.state = state
  }

  setPosition(x: number, y: number) {
    this.startX = x
    this.startY = y
  }
}
