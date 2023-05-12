class Cat extends Movable {
  private static readonly DEFAULT_SPEED = 1
  private static readonly MAX_HUNGER = 100
  private static readonly MAX_HAPPINESS = 100

  private hunger: number = 0
  private happiness: number = 100
  private fatigue: number = 0
  private health: number = 100

  constructor(x: number, y: number) {
    super(x, y, Cat.DEFAULT_SPEED)
  }

  public move(): void {
    this.x += this.speed
  }

  public feed(amount: number): void {
    this.hunger -= amount
    if (this.hunger < 0) {
      this.hunger = 0
    }
  }

  public play(): void {
    this.happiness += 10
    if (this.happiness > Tamagotchi.MAX_HAPPINESS) {
      this.happiness = Tamagotchi.MAX_HAPPINESS
    }
  }

  public rest() {
    this.fatigue = 0
    this.happiness += 10
  }

  public getHunger() {
    return this.hunger
  }

  public getHappiness() {
    return this.happiness
  }

  public getFatigue() {
    return this.fatigue
  }
  public getHealth(): number {
    return this.health
  }
}