enum Cursor {
  default = 'default',
  pointer = 'pointer',
}

export class GameController {
  cursor: Cursor

  constructor() {
    this.cursor = Cursor.default
  }
}
