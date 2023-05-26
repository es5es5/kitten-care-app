import { SpriteStateListItem, SpriteSettings } from '../models'

export const catSpriteAnimations = {} as any

export const spriteSettings = {
  initialState: 'idle',
  spriteWidth: 128,
  spriteHeight: 128,
} as SpriteSettings

export const animationStates = [
  {
    name: 'idle',
    frames: 5,
    speed: 10,
  },
  {
    name: 'walk',
    frames: 6,
    speed: 10,
  },
  {
    name: 'sleep',
    frames: 8,
    speed: 10,
  },
  {
    name: 'wakeUp',
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
] as Array<SpriteStateListItem>

const spriteWidth = spriteSettings.spriteWidth
const spriteHeight = spriteSettings.spriteHeight
let currentState = spriteSettings.initialState

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
