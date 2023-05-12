abstract class Movable {
  protected x: number
  protected y: number
  protected speed: number

  constructor(x: number, y: number, speed: number) {
    this.x = x
    this.y = y
    this.speed = speed
  }

  public abstract move(): void

  public getX(): number {
    return this.x
  }

  public setX(x: number): void {
    this.x = x
  }

  public getY(): number {
    return this.y
  }

  public setY(y: number): void {
    this.y = y
  }

  public getSpeed(): number {
    return this.speed
  }

  public setSpeed(speed: number): void {
    this.speed = speed
  }
}
