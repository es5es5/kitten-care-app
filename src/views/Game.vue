<script lang="ts" setup>
import {
  animationStates as CatAnimationStates,
  catSpriteAnimations,
  spriteSettings as CatSpriteSettings,
} from '@/assets/cat/states'
import { onMounted, reactive } from 'vue'
import { Layer } from '@/assets/game/Layer.ts'

const cat = reactive({
  sprite: {
    width: 0,
    height: 0,
  },
  init: {
    state: 'idle',
    x: 0,
    y: 0,
  },
  current: {
    state: 'idle',
    x: 0,
    y: 0,
  },
})

onMounted(() => {
  const canvas = document.getElementById('canvas1') as HTMLCanvasElement

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const CANVAS_WIDTH = (canvas.width = 360)
  const CANVAS_HEIGHT = (canvas.height = 370)

  const frameImage = new Image()
  frameImage.src = new URL('@/assets/map/frame.png', import.meta.url).href
  const TITLE_BAR_HEIGHT = 37
  const FRAME_PADDING = 4
  const FRAME_WIDTH = (frameImage.width = CANVAS_WIDTH)
  const FRAME_HEIGHT = (frameImage.height = CANVAS_HEIGHT)

  const Frame = new Layer(
    ctx,
    new URL('@/assets/map/frame.png', import.meta.url).href,
    FRAME_WIDTH,
    FRAME_HEIGHT,
  )

  const backgroundImage = new Image()
  backgroundImage.src = new URL(
    '@/assets/map/background.png',
    import.meta.url,
  ).href
  const BACKGROUND_WIDTH = FRAME_WIDTH - FRAME_PADDING * 2
  const BACKGROUND_HEIGHT = FRAME_HEIGHT - TITLE_BAR_HEIGHT - FRAME_PADDING

  const menusImage = new Image()
  menusImage.src = new URL('@/assets/map/menus.png', import.meta.url).href
  const MENUS_WIDTH = 55
  const MENUS_HEIGHT = 55

  const catImage = new Image()
  catImage.src = new URL('@/assets/cat/cat.png', import.meta.url).href

  const spriteWidth = CatSpriteSettings.spriteWidth
  const spriteHeight = CatSpriteSettings.spriteHeight

  cat.init.x = CANVAS_WIDTH / 2 - spriteWidth / 2
  cat.init.y =
    CANVAS_HEIGHT - spriteHeight - TITLE_BAR_HEIGHT + FRAME_PADDING * 2
  cat.init.state = CatSpriteSettings.initialState
  cat.current.x = cat.init.x
  cat.current.y = cat.init.y
  cat.current.state = cat.init.state

  let gameFrame = 0

  CatAnimationStates.forEach((state, index) => {
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

  function animate() {
    // ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let framePosition =
      Math.floor(gameFrame / catSpriteAnimations[cat.current.state].speed) %
      catSpriteAnimations[cat.current.state].loc.length
    let frameX = spriteWidth * framePosition
    let frameY = catSpriteAnimations[cat.current.state].loc[framePosition].y

    // Drawing Frame
    // ctx?.drawImage(frameImage, 0, 0, FRAME_WIDTH, FRAME_HEIGHT)
    Frame.drawLayer()

    // Drawing Background
    ctx?.drawImage(
      backgroundImage,
      FRAME_PADDING,
      TITLE_BAR_HEIGHT,
      BACKGROUND_WIDTH,
      BACKGROUND_HEIGHT,
    )

    // Drawing Menus 1
    ctx?.drawImage(
      menusImage,
      MENUS_WIDTH * 0,
      MENUS_HEIGHT * 0,
      MENUS_WIDTH,
      MENUS_HEIGHT,
      FRAME_PADDING + FRAME_PADDING + MENUS_WIDTH * 0,
      TITLE_BAR_HEIGHT,
      MENUS_WIDTH,
      MENUS_HEIGHT,
    )

    // Drawing Menus 2
    ctx?.drawImage(
      menusImage,
      MENUS_WIDTH * 0,
      MENUS_HEIGHT * 1,
      MENUS_WIDTH,
      MENUS_HEIGHT,
      FRAME_PADDING + FRAME_PADDING + MENUS_WIDTH * 1,
      TITLE_BAR_HEIGHT,
      MENUS_WIDTH,
      MENUS_HEIGHT,
    )

    // Drawing Menus 3
    ctx?.drawImage(
      menusImage,
      MENUS_WIDTH * 0,
      MENUS_HEIGHT * 2,
      MENUS_WIDTH,
      MENUS_HEIGHT,
      FRAME_PADDING + FRAME_PADDING + MENUS_WIDTH * 2,
      TITLE_BAR_HEIGHT,
      MENUS_WIDTH,
      MENUS_HEIGHT,
    )
    // Drawing Menus 4
    ctx?.drawImage(
      menusImage,
      MENUS_WIDTH * 0,
      MENUS_HEIGHT * 3,
      MENUS_WIDTH,
      MENUS_HEIGHT,
      FRAME_PADDING + FRAME_PADDING + MENUS_WIDTH * 3,
      TITLE_BAR_HEIGHT,
      MENUS_WIDTH,
      MENUS_HEIGHT,
    )

    // Drawing Menus 5
    ctx?.drawImage(
      menusImage,
      MENUS_WIDTH * 0,
      MENUS_HEIGHT * 4,
      MENUS_WIDTH,
      MENUS_HEIGHT,
      FRAME_PADDING + FRAME_PADDING + MENUS_WIDTH * 4,
      TITLE_BAR_HEIGHT,
      MENUS_WIDTH,
      MENUS_HEIGHT,
    )

    // Drawing Cat
    ctx?.drawImage(
      catImage,

      frameX, // Sprite Frame X Start
      frameY, // Sprite Frame Y Start
      spriteWidth, // Sprite Frame X End
      spriteHeight, // Sprite Frame Y End

      cat.current.x, // Drawing Position X Start
      cat.current.y, // Drawing Position Y Start
      spriteWidth, // Drawing Position X End
      spriteHeight, // Drawing Position Y End
    )

    gameFrame++
    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<template>
  <div>
    <canvas id="canvas1"></canvas>
    <div class="controls">
      <label for="animations">Choose Animation:</label>
      <select name="animations" id="animations" v-model="cat.current.state">
        <option v-for="item in CatAnimationStates" :value="item.name">
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#canvas1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}
</style>
