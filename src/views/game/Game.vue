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
import { useGameStore } from '@/store/game'

const gameStore = useGameStore()

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
  gameStore.setCanvas(document.getElementById('canvas1') as HTMLCanvasElement)
  const canvas = gameStore.getCanvas!
  const ctx = gameStore.getCtx!

  canvas.width = FrameSettings.width
  canvas.height = FrameSettings.height

  canvas.addEventListener('pointermove', (e) => {
    gameStore.getMenuList.forEach((menu) => {
      menu.setActive(e)
      menu.setDragged(e)
    })

    if (gameStore.getMenuList.some((menu) => menu.isActive)) {
      gameStore.setCursor('grab')
      if (gameStore.getMenuList.some((menu) => menu.isHeld)) {
        gameStore.setCursor('grabbing')
      }
    } else {
      gameStore.setCursor('default')
    }
  })

  canvas.addEventListener('pointerdown', (e) => {
    gameStore.getMenuList.forEach((menu) => {
      menu.setDragging(e)
    })
    console.log('pointerdown', e)
  })

  canvas.addEventListener('pointerup', (e) => {
    gameStore.getMenuList.forEach((menu) => {
      menu.setDropped(e)
    })
  })

  const frame = new Frame(ctx)

  const background = new Background(ctx)

  for (let index = 1; index <= 5; index++) {
    gameStore.addMenuList(new Menus(ctx, index))
  }

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
    gameStore.getMenuList.forEach((menu) => {
      menu.drawStatic()
      menu.draw()
    })

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
