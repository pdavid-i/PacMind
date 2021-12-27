import TileMap from "./TileMap.js";

const tileSize = 32;
const velocity = 2;
let character = "dave";
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let tileMap = null;
let pacman = null;
let enemies = null;

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var startButton = document.getElementById("startButton");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var daveButton = document.getElementById("avatarDave");
var kerryButton = document.getElementById("avatarKerry");
var rebeButton = document.getElementById("avatarRebe");

let gameOver = false;
let gameWin = false;
let started = false;
const gameOverSound = new Audio("sounds/gameOver.wav");
const gameWinSound = new Audio("sounds/aphex_win.wav");

function gameLoop() {
  if ((started = true)) {
    tileMap.draw(ctx);
    drawGameEnd();
    pacman.draw(ctx, pause(), enemies);
    enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
    checkGameOver();
    checkGameWin();
  }
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin();
    if (gameWin) {
      pacman.powerDotSound.pause();
      gameWinSound.play();
    }
  }
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();
    if (gameOver) {
      gameOverSound.play();
    }
  }
}

function isGameOver() {
  return enemies.some(
    (enemy) => !pacman.powerDotActive && enemy.collideWith(pacman)
  );
}

function pause() {
  return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd() {
  if (gameOver || gameWin) {
    let text = " Cool movie!";
    if (gameOver) {
      text = "Bad take";
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, canvas.height / 3.2, canvas.width, 80);

    ctx.font = "75px VT323";
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");

    ctx.fillStyle = gradient;
    ctx.fillText(text, 10, canvas.height / 2);
  }
}

// When the user clicks on the button, open the modal
startButton.onclick = function () {
  modal.style.display = "block";
};

daveButton.onclick = function () {
  character = "dave";
  startGame();
};

kerryButton.onclick = function () {
  character = "kerry";
  startGame();
};

rebeButton.onclick = function () {
  character = "rebe";
  startGame();
};

// When the user clicks on <span> (x), close the modal and start the game
span.onclick = function () {
  startGame();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function startGame() {
  modal.style.display = "none";
  startButton.style.display = "none";
  canvas.style.display = "flex";
  tileMap = new TileMap(tileSize, character);
  pacman = tileMap.getPacman(velocity);
  enemies = tileMap.getEnemies(velocity);
  tileMap.setCanvasSize(canvas);
  started = true;
  setInterval(gameLoop, 1000 / 75);
}
