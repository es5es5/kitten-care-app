<script lang="ts" setup>
import {
  animationStates as CatAnimationStates,
  catSpriteAnimations,
  spriteSettings as CatSpriteSettings,
} from '@/assets/cat/states'
import { onMounted, reactive } from 'vue'
import { Background } from '@/assets/game/Background'
import { Menus } from '@/assets/game/Menus'
import { Frame, FrameSettings } from '@/assets/game/Frame'

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
  canvas.width = FrameSettings.width
  canvas.height = FrameSettings.height

  canvas.addEventListener('pointermove', (e) => {
    menu1.setActive(e)
    menu2.setActive(e)
    menu3.setActive(e)
    menu4.setActive(e)
    menu5.setActive(e)
  })

  canvas.addEventListener('pointerdown', ({ offsetX, offsetY }) => {
    // menu1.setDragging(offsetX, offsetY)
    // menu2.setDragging(offsetX, offsetY)
    // menu3.setDragging(offsetX, offsetY)
    // menu4.setDragging(offsetX, offsetY)
    // menu5.setDragging(offsetX, offsetY)
  })

  canvas.addEventListener('pointerup', ({ offsetX, offsetY }) => {
    // menu1.setDragged(offsetX, offsetY)
    // menu2.setDragged(offsetX, offsetY)
    // menu3.setDragged(offsetX, offsetY)
    // menu4.setDragged(offsetX, offsetY)
    // menu5.setDragged(offsetX, offsetY)
  })

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  const frame = new Frame(ctx)

  const background = new Background(ctx)

  const menu1 = new Menus(ctx, 1)
  const menu2 = new Menus(ctx, 2)
  const menu3 = new Menus(ctx, 3)
  const menu4 = new Menus(ctx, 4)
  const menu5 = new Menus(ctx, 5)

  const catImage = new Image()
  catImage.src = new URL('@/assets/cat/cat.png', import.meta.url).href

  const spriteWidth = CatSpriteSettings.spriteWidth
  const spriteHeight = CatSpriteSettings.spriteHeight

  cat.init.x = FrameSettings.width / 2 - spriteWidth / 2
  cat.init.y =
    FrameSettings.height -
    spriteHeight -
    FrameSettings.titleBarHeight +
    FrameSettings.padding * 2
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
    frame.draw()

    // Drawing Background
    background.draw()

    // Drawing Menus
    menu1.drawStatic()
    menu2.drawStatic()
    menu3.drawStatic()
    menu4.drawStatic()
    menu5.drawStatic()
    menu1.draw()
    menu2.draw()
    menu3.draw()
    menu4.draw()
    menu5.draw()

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
}
</style>
