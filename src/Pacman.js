import Direction from "./Direction.js";
export default class Pacman {
  constructor(x, y, tileSize, velocity, map) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.map = map;
    this.#loadPacmanImages();

    this.currentDirection = null;
    this.requestedDirection = null;

    document.addEventListener("keydown", this.#keydown);
  }

  draw(ctx) {
    ctx.drawImage(
      this.pacmanImages[this.pacmanImageIndex],
      this.x,
      this.y,
      this.tileSize,
      this.tileSize
    );
    this.#move();
  }

  #loadPacmanImages() {
    const pacmanImage1 = new Image();
    pacmanImage1.src = "resources/images/pac0.png";

    const pacmanImage2 = new Image();
    pacmanImage2.src = "resources/images/pac1.png";

    const pacmanImage3 = new Image();
    pacmanImage3.src = "resources/images/pac2.png";

    const pacmanImage4 = new Image();
    pacmanImage4.src = "resources/images/pac1.png";

    this.pacmanImages = [
      pacmanImage1,
      pacmanImage2,
      pacmanImage3,
      pacmanImage4,
    ];

    this.pacmanImageIndex = 0;
  }

  #keydown = (event) => {
    if (event.keyCode === 38 || event.keyCode === 87) {
      if (this.currentDirection == Direction.down)
        this.currentDirection = Direction.up;
      this.requestedDirection = Direction.up;
      this.madeFirstMove = true;
    } else if (event.keyCode === 40 || event.keyCode === 83) {
      if (this.currentDirection == Direction.up)
        this.currentDirection = Direction.down;
      this.requestedDirection = Direction.down;
      this.madeFirstMove = true;
    } else if (event.keyCode === 37 || event.keyCode === 65) {
      if (this.currentDirection == Direction.right)
        this.currentDirection = Direction.left;
      this.requestedDirection = Direction.left;
      this.madeFirstMove = true;
    } else if (event.keyCode === 39 || event.keyCode === 68) {
      if (this.currentDirection == Direction.left)
        this.currentDirection = Direction.right;
      this.requestedDirection = Direction.right;
      this.madeFirstMove = true;
    }
  };

  #move() {
    if (this.currentDirection !== this.requestedDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        this.currentDirection = this.requestedDirection;
      }
    }

    switch (this.currentDirection) {
      case Direction.up:
        this.y -= this.velocity;
        break;
      case Direction.down:
        this.y += this.velocity;
        break;
      case Direction.left:
        this.x -= this.velocity;
        break;
      case Direction.right:
        this.x += this.velocity;
        break;
    }
  }
}
