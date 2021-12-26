export default class Board {
  constructor(tileSize) {
    this.titleSize = tileSize;

    this.smallDot = new Image();
    this.smallDot.src = "../resources/images/yellowDot.png";

    this.wall = new Image();
    this.wall.src = "../resources/images/wall.png";
  }

  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[0].length; column++) {
        let tile = this.map[row][column];
        if (tile === 0) {
          this.#drawSmallDot(ctx, column, row);
        } else if (tile === 1) {
          this.#drawWall(ctx, column, row);
        }
      }
    }
  }

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.titleSize;
    canvas.height = this.map.length * this.titleSize;
  }

  #drawWall(ctx, column, row) {
    ctx.drawImage(
      this.wall,
      column * this.titleSize,
      row * this.titleSize,
      this.titleSize,
      this.titleSize
    );
  }

  #drawSmallDot(ctx, column, row) {
    ctx.drawImage(
      this.smallDot,
      column * this.titleSize,
      row * this.titleSize,
      this.titleSize,
      this.titleSize
    );
  }
}
