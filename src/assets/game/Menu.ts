import { FrameSettings } from './Frame'

export const MenusSettings = {
  imageSrc: new URL('@/assets/map/menus.png', import.meta.url).href,
  width: 56,
  height: 56,
  paddingHorizontal: 4,
  paddingVertical: 8,
}

function getMenusStartX(index: number) {
  let result =
    FrameSettings.padding +
    MenusSettings.paddingHorizontal +
    (MenusSettings.width + MenusSettings.paddingHorizontal) * (index - 1)
  return result + 10
}

function getMenusStartY() {
  return FrameSettings.titleBarHeight + MenusSettings.paddingVertical
}

export enum MenuShowingState {
  Default = 0,
  Active = 1,
  PressDown = 2,
  PressUp = 3,
  Disabled = 4,
}

export class Menu {
  ctx: CanvasRenderingContext2D
  image: HTMLImageElement
  index: number // 메뉴 순서
  startX: number
  startY: number
  showingState: MenuShowingState
  isHeld = false
  isStatic = false
  isFalling = false
  isMovable = false

  constructor(ctx: CanvasRenderingContext2D, index: number) {
    this.ctx = ctx
    this.image = new Image()
    this.image.src = MenusSettings.imageSrc
    this.image.width = MenusSettings.width
    this.image.height = MenusSettings.height
    this.index = index
    this.startX = getMenusStartX(this.index)
    this.startY = getMenusStartY()
    this.showingState = MenuShowingState.Default

    switch (index) {
      case 1: // 먹이주기
        this.isMovable = true
        break
      case 2: // 놀아주기
        this.isMovable = true
        break
      case 3: // 만져주기
        this.isMovable = false
        break
      case 4: // 샤워하기
        this.isMovable = false
        break
      case 5: // 치료하기
        this.isMovable = false
        break
    }

    return this
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      /**
       * Disabled = 0
       * Active = 1
       * Default = 2
       */
      MenusSettings.width * this.showingState,
      MenusSettings.height * (this.index - 1),
      MenusSettings.width,
      MenusSettings.height,
      this.startX,
      this.startY,
      MenusSettings.width,
      MenusSettings.height,
    )
    this.isStatic = false
    this.update()
  }

  update() {
    switch (this.index) {
      case 1:
        if (this.isFalling) {
          this.startY += 1
          if (this.startY >= FrameSettings.height - 68) {
            this.startX = getMenusStartX(this.index)
            this.startY = getMenusStartY()
            this.isFalling = false
          }
        }
        break
      case 2:
        break
      case 3:
        break
      case 4:
        break
      case 5:
        break

      default:
        break
    }
  }

  drawStatic() {
    this.ctx.drawImage(
      this.image,
      MenuShowingState.Default,
      MenusSettings.height * (this.index - 1),
      MenusSettings.width,
      MenusSettings.height,
      getMenusStartX(this.index),
      getMenusStartY(),
      MenusSettings.width,
      MenusSettings.height,
    )
    this.isStatic = true
  }

  setActive(e: PointerEvent) {
    if (this.isStatic) return
    if (this.isHeld) return

    if (
      e.offsetX > this.startX &&
      e.offsetX < this.startX + MenusSettings.width &&
      e.offsetY > this.startY &&
      e.offsetY < this.startY + MenusSettings.height
    ) {
      this.showingState = MenuShowingState.Active
    } else {
      this.showingState = MenuShowingState.Default
      return
    }
  }

  setDragging(e: PointerEvent) {
    if (this.isStatic) return
    if (!this.isMovable) return

    if (
      e.offsetX > this.startX &&
      e.offsetX < this.startX + MenusSettings.width &&
      e.offsetY > this.startY &&
      e.offsetY < this.startY + MenusSettings.height
    ) {
      this.isHeld = true
      this.isFalling = false
    }
  }

  setDragged(e: PointerEvent) {
    if (!this.isMovable) return
    if (this.isHeld) {
      this.startX = e.offsetX - MenusSettings.width / 2
      this.startY = e.offsetY - MenusSettings.height / 2
    }
  }

  setDropped(e: PointerEvent) {
    if (!this.isMovable) return

    if (this.isHeld) {
      if (this.index === 1) {
        this.isFalling = true
        this.isHeld = false
      } else {
        this.startX = getMenusStartX(this.index)
        this.startY = getMenusStartY()
        this.isHeld = false
      }
    }
  }
}

export class HeldMenu extends Menu {
  heldX: number
  heldY: number

  constructor(
    ctx: CanvasRenderingContext2D,
    index: number,
    heldX: number,
    heldY: number,
  ) {
    super(ctx, index)
    this.heldX = heldX
    this.heldY = heldY
  }

  getHeldMenuPosition() {
    return { heldX: this.heldX, heldY: this.heldY }
  }
  setHeldMenuPosition(x: number, y: number) {
    this.heldX = x
    this.heldY = y
  }
}
