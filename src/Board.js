import Pacman from "./Pacman.js";

export default class Board {
  constructor(tileSize) {
    this.tileSize = tileSize;

    this.smallDot = new Image();
    this.smallDot.src = "../resources/images/yellowDot.png";

    this.wall = new Image();
    this.wall.src = "../resources/images/wall.png";
  }

  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
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
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }

  #drawWall(ctx, column, row) {
    ctx.drawImage(
      this.wall,
      column * this.tileSize,
      row * this.tileSize,
      this.tileSize,
      this.tileSize
    );
  }

  #drawSmallDot(ctx, column, row) {
    ctx.drawImage(
      this.smallDot,
      column * this.tileSize,
      row * this.tileSize,
      this.tileSize,
      this.tileSize
    );
  }

  getPacman(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[0].length; column++) {
        let tile = this.map[row][column];
        if (tile === 4) {
          this.map[row][column] = 0;
          return new Pacman(
            row * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            velocity
          );
        }
      }
    }
  }
}
