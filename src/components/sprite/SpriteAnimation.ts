class SpriteAnimation {
  private readonly element: HTMLElement
  private readonly frames: number
  private readonly frameWidth: number
  private readonly frameHeight: number
  private readonly duration: number
  private readonly loop: boolean

  constructor(
    element: HTMLElement,
    frames: number,
    frameWidth: number,
    frameHeight: number,
    duration: number,
    loop = true,
  ) {
    this.element = element
    this.frames = frames
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.duration = duration
    this.loop = loop
  }

  play() {
    this.element.style.backgroundImage = `url(${this.element.dataset.sprite})`
    this.element.style.backgroundRepeat = 'no-repeat'
    this.element.style.width = `${this.frameWidth}px`
    this.element.style.height = `${this.frameHeight}px`

    let currentFrame = 0
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const percentComplete = elapsed / this.duration
      const currentPercent = currentFrame / this.frames
      const progress = percentComplete - Math.floor(percentComplete)

      if (percentComplete > 1) {
        if (this.loop) {
          currentFrame = 0
          animate()
        }
        return
      }

      this.element.style.backgroundPositionX = `${
        -currentFrame * this.frameWidth
      }px`
      currentFrame = Math.floor(this.frames * progress)
      requestAnimationFrame(animate)
    }

    animate()
  }
}
