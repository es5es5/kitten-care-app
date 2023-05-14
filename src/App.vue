<script setup lang="ts">
import { onMounted, reactive } from 'vue'
// import { getFrameCoordinates } from './assets/sprites'
const data = reactive({
  state: 'idle',
})

const drawSpriteFrame = (
  ctx: CanvasRenderingContext2D,
  sprite: HTMLImageElement,
  frameX: number,
  frameY: number,
  canvasX: number,
  canvasY: number,
  width: number,
  height: number,
) => {
  ctx.drawImage(
    sprite,
    frameX * width,
    frameY * height,
    width,
    height,
    canvasX,
    canvasY,
    width,
    height,
  )
}

let CANVAS_FRAME = 0
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let cat = null
let catFrame = 5

onMounted(() => {
  canvas = document.getElementById('canvas') as HTMLCanvasElement
  ctx = canvas.getContext('2d')!
  cat = new Image()
  cat.src = new URL('@/assets/sprites/cat.png', import.meta.url).toString()
  cat.width = 32
  cat.height = 32

  draw(cat, catFrame)
})

const draw = (sprite: HTMLImageElement, spriteFrame: number) => {
  // 현재 프레임 그리기
  console.log('CANVAS_FRAME', CANVAS_FRAME)
  drawSpriteFrame(
    ctx,
    sprite,
    CANVAS_FRAME,
    0,
    0,
    0,
    sprite.width,
    sprite.height,
  )

  // 다음 프레임 인덱스 계산
  CANVAS_FRAME = (CANVAS_FRAME + 1) % spriteFrame

  // 1초마다 다음 프레임 그리기
  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(() => draw(sprite, spriteFrame))
  }, 200)
}
</script>

<template>
  <canvas
    id="canvas"
    width="400"
    height="400"
    style="border: 1px solid #3c4043"
  ></canvas>
  <hr />
  <button type="button" @click="data.state = 'idle'">Idle</button>
  <button type="button" @click="data.state = 'walk'">Walk</button>
</template>

<style lang="scss" scoped></style>
