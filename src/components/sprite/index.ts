import Velocity from 'velocity-animate'

interface SpriteCss {
  sx: number
  ex: number
  sy: number
  ey: number
  duration: number
  easing: number
  loop: boolean
  queue: string
}

interface CurrentScene {
  x: number
  y: number
}

export default {
  data(): {
    spriteElement: HTMLElement | null
    spriteStyle: CSSStyleDeclaration | null
    spriteCss: SpriteCss
    currentScene: CurrentScene
    save: boolean
  } {
    return {
      spriteElement: null,
      spriteStyle: null,
      spriteCss: {
        sx: 0,
        ex: 0,
        sy: 0,
        ey: 0,
        duration: 0,
        easing: 0,
        loop: false,
        queue: '',
      },
      currentScene: {
        x: 0,
        y: 0,
      },
      save: true,
    }
  },
  mounted() {
    this.spriteInit(this.$el)
  },
  computed: {
    spriteWidth(): number {
      return parseInt(this.spriteStyle!.width.slice(0, -2))
    },
    spriteHeight(): number {
      return parseInt(this.spriteStyle!.height.slice(0, -2))
    },
  },
  methods: {
    spriteInit(el: HTMLElement): void {
      // Init, config
      this.spriteElement = el
      this.spriteStyle = window.getComputedStyle(this.spriteElement)
    },
    spritePlay(cb?: Function): void {
      Velocity(
        this.spriteElement!,
        {
          backgroundPositionX: [this.spriteCss.ex, this.spriteCss.sx],
          backgroundPositionY: [this.spriteCss.ey, this.spriteCss.sy],
        },
        {
          easing: [this.spriteCss.easing],
          duration: this.spriteCss.duration,
          loop: this.spriteCss.loop,
          queue: this.spriteCss.queue,
          complete: () => {
            if (this.save) {
              this.updateScene()
            }
            if (typeof cb === 'function') {
              cb()
            }
          },
        },
      )
    },
    spritePause(cb?: Function): void {
      if (this.save) {
        this.updateScene()
      }
      Velocity(this.spriteElement!, 'stop')
    },
    spriteRestart(cb?: Function): void {
      // easing and duration depend on coordinates, so they need synchronization.
      let originEasing = Math.abs(this.spriteCss.ex / this.spriteWidth)
      this.spriteCss.easing = Math.abs(
        (this.spriteCss.ex - this.spriteCss.sx) / this.spriteWidth,
      )
      this.spriteCss.duration =
        this.spriteCss.easing * (this.spriteCss.duration / originEasing)

      if (this.spriteCss.loop) {
        this.spriteCss.loop = false
        this.spritePlay(() => {
          if (cb) {
            cb()
          }
        })
      } else {
        this.spritePlay()
      }
    },
    updateScene(): void {
      const bp =
        this.spriteElement!.style.backgroundPosition.trim().split(/\s+/)
      const pos = {
        left: bp[0].slice(0, -2),
        top: bp[1].slice(0, -2),
      }
      this.spriteCss.sx = parseInt(pos.left)
      this.spriteCss.sy = parseInt(pos.top)
    },
    moveToX(sx: number, ex: number): void {
      // start point change
      if (!isNaN(sx)) {
        this.spriteCss.sx = sx
      }
      if (!isNaN(ex)) {
        this.spriteCss.ex = ex
      }
    },
    moveToY(sy: number, ey: number): void {
      if (sy) {
        this.spriteCss.sy = sy
      }
      if (ey) {
        this.spriteCss.ey = ey
      }
    },
    setLoop(v = true): void {
      this.spriteCss.loop = v
    },
    playTo(
      frame: number,
      duration: number,
      initFnc?: () => void,
      callbackFnc?: () => void,
    ): void {
      // 1 dimension
      this.spriteCss.ex = -this.spriteWidth * frame
      this.spriteCss.easing = Math.abs(
        (this.spriteCss.ex - this.spriteCss.sx) / this.spriteWidth,
      )
      this.spriteCss.duration = duration

      if (typeof initFnc === 'function') {
        initFnc()
      }

      this.spritePlay(callbackFnc)
    },
  },
}
