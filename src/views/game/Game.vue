<script lang="ts" setup>
import { Cat } from '@/assets/cat/Cat'
import { Background } from '@/assets/game/Background'
import { Frame, FrameSettings } from '@/assets/game/Frame'
import { Menu } from '@/assets/game/Menu'
import { useGameStore } from '@/store/game'
import { onMounted, reactive } from 'vue'

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
  gameStore.initGame(document.getElementById('canvas1') as HTMLCanvasElement)
  const canvas = gameStore.getCanvas!
  const ctx = gameStore.getCtx!
  gameStore.setCanvasEventListener()

  canvas.width = FrameSettings.width
  canvas.height = FrameSettings.height

  const frame = new Frame(ctx)

  const background = new Background(ctx)

  for (let index = 1; index <= 5; index++) {
    gameStore.addMenuList(new Menu(ctx, index))
  }

  const cat = new Cat(ctx)
  gameStore.initCat(cat)

  function animate() {
    // ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Drawing Frame
    frame.draw()

    // Drawing Background
    background.draw()

    // Drawing Menu
    gameStore.getMenuList.forEach((menu) => {
      menu.drawStatic()
      menu.draw()
    })

    // Drawing Cat
    cat.draw(gameStore.getGameFrame)

    gameStore.intervalGameFrame()
    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<template>
  <div class="wrap">
    <canvas id="canvas1"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  width: 100%;
}
#canvas1 {
  max-width: 328px;
  max-height: 328px;
}
</style>
