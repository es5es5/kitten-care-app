export interface SpriteSettings {
  initialState: string
  spriteWidth: number
  spriteHeight: number
}

export interface SpriteStateListItem {
  name: string
  frames: number
  speed: number // 1 ~ 10
}
