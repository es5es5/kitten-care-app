class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cat: Cat;
  private food: Food;
  private toy: Toy;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 400;
    this.canvas.height = 400;
    document.body.appendChild(this.canvas);
    this.cat = new Cat();
    this.food = new Food(10);
    this.toy = new Toy(10);
  }

  public start() {
  }

  private update() {
  }

  private display() {
  }
}