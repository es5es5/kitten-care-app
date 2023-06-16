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

export type CatDirection = 'Left' | 'Right'

export enum CatState {
  IDLE = 'idle',
  IDLE_AGRO = 'idle_agro',
  WALK = 'walk',
  WALK_AGRO = 'walk_agro',
  SLEEP = 'sleep',
  SLEEP_AGRO = 'sleep_agro',
  HAWL = 'hawl',
  STANDING = 'standing',
  STANDING_WALK = 'standing_walk',
  EAT = 'eat',
  WAIT1 = 'wait1',
  WAIT2 = 'wait2',
  WAIT3 = 'wait3',
  DASH = 'dash',
}

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
  state: CatState
  isAgro: boolean
  isMovable: boolean
  direction: CatDirection

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = CatSettings.imageSrcLeft

    this.startX = FrameSettings.width / 2 - spriteWidth / 2
    this.startY =
      FrameSettings.height -
      CatSettings.height -
      BackgroundSettings.bottomPadding
    this.state = CatState.IDLE
    this.speed = 10
    this.isAgro = false
    this.isMovable = true
    this.direction = 'Left'

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
    state: CatState
    speed: number
    direction: CatDirection
  }) {
    this.startX = value.x
    this.startY = value.y
    this.speed = value.speed
    this.state = value.state
    this.direction = value.direction
    if (this.direction === 'Left') {
      this.image.src = CatSettings.imageSrcLeft
    } else {
      this.image.src = CatSettings.imageSrcRight
    }
  }

  getCat() {
    return this
  }

  setState(state: CatState) {
    this.state = state
  }

  setPosition(x: number, y: number) {
    this.startX = x
    this.startY = y
  }

  setMoving() {
    if (!this.isMovable) return
    let x = this.startX + this.getDirection()

    // if (x <= 0) {
    //   this.startX = 0
    //   this.setDirectionToggle()
    // } else if (x >= BackgroundSettings.width - CatSettings.width) {
    //   this.startX = BackgroundSettings.width - CatSettings.width
    //   this.setDirectionToggle()
    // } else {
    //   this.startX = x
    // }
    this.startX = x
  }

  setDirection(direction: CatDirection) {
    this.direction = direction
    if (this.direction === 'Left') {
      this.image.src = CatSettings.imageSrcLeft
    } else {
      this.image.src = CatSettings.imageSrcRight
    }
  }

  setDirectionToggle() {
    switch (this.direction) {
      case 'Left':
        this.setDirection('Right')
        break
      case 'Right':
        this.setDirection('Left')
        break
    }
  }

  getDirection(): -1 | 1 {
    switch (this.direction) {
      case 'Left':
        return -1
      case 'Right':
        return 1
    }
  }

  setAgro(isAgro: boolean) {
    this.isAgro = isAgro
  }

  getAgro() {
    return this.isAgro
  }

  checkAgro() {
    if (!this.isAgro) return

    switch (this.state) {
      case CatState.SLEEP:
        this.isMovable = false
        setTimeout(() => {
          this.setState(CatState.SLEEP_AGRO)
        }, 500)
        break
      case CatState.SLEEP_AGRO:
        this.isMovable = false
        setTimeout(() => {
          this.setState(CatState.WALK)
        }, 500)
        break
      case CatState.WALK:
        this.isMovable = true

        setTimeout(() => {
          this.setState(CatState.WALK_AGRO)
        }, 200)
        break
      case CatState.WALK_AGRO:
        this.isMovable = true
        setTimeout(() => {
          this.setState(CatState.STANDING)
        }, 500)
        break
      case CatState.STANDING:
        this.isMovable = true
        // setTimeout(() => {
        //   this.setState(CatState.STANDING_WALK)
        // }, 500)
        setTimeout(() => {
          this.setState(CatState.WALK_AGRO)
        }, 500)
        break
      case CatState.STANDING_WALK:
        this.isMovable = true
        break
      default:
        break
    }
  }

  feeding() {
    this.checkAgro()
    this.setMoving()
  }
}
