export const getFrameCoordinates = (
  sprite: HTMLImageElement,
  frameIndex: number,
  frameWidth: number,
  frameHeight: number,
) => {
  const framesPerRow = Math.floor(sprite.width / frameWidth)
  const row = Math.floor(frameIndex / framesPerRow)
  const col = frameIndex % framesPerRow
  const x = col * frameWidth
  const y = row * frameHeight
  return { x, y }
}
