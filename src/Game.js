import Board from "./Board.js";

const tileSize = 32;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const board = new Board(tileSize);

function gameLoop() {
  board.draw(ctx);
}

board.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 60);
