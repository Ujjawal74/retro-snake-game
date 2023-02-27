// grid and tiles's count
let grid = 20;
let tiles = 20;

// snake's velocity
let vx = 0;
let vy = 0;

// game pause
let isGamePause = false;

// snake head's initial position
let snakeX = 10;
let snakeY = 10;

// snake's body
let snakeBody = [];

// apple's initial position
let foodX = 15;
let foodY = 15;

// radius
const RADIUS = 10;

// eating food sound
const GULP_SOUND = new Audio("assests/gulp.mp3");

// score and high score
let scoreVal = 0;
let highestVal = 0;

// set highscore to localstorage
let u = localStorage.getItem("highestVal");
if (u) {
  highestVal = u;
}

// gameEngine
let gameEngine = null;

function startGame() {
  board = document.getElementById("snake");
  controls = document.getElementById("controls");
  controls.style.display = "none";
  startBtn = document.getElementById("start");
  restartBtn = document.getElementById("restart");
  score = document.getElementById("curr_score");
  highest = document.getElementById("highest");
  context = board.getContext("2d");
  document.addEventListener("keydown", keyTap);
  gameEngine = setInterval(game, 1000 / 10);
}

function restartGame() {
  reInitialize();
  startGame();
}

function reInitialize() {
  vx = 0;
  vy = 0;
  isGamePause = false;
  snakeX = 10;
  snakeY = 10;
  snakeBody = [];
  foodX = 15;
  foodY = 15;
  scoreVal = 0;
  highestVal = 0;

  u = localStorage.getItem("highestVal");
  if (u) {
    highestVal = u;
  }
  x = localStorage.setItem("highestVal", highestVal);

  gameEngine = null;
}

function game() {
  if (isGamePause) return;

  snakeX += vx;
  snakeY += vy;

  // if out of bound then come from oppsite direction
  if (snakeX == -1 && vx != 1) {
    snakeX = tiles;
  }
  if (snakeX == tiles && vx != -1) {
    snakeX = 0;
  }
  if (snakeY == -1 && vy != 1) {
    snakeY = tiles;
  }
  if (snakeY == tiles && vy != -1) {
    snakeY = 0;
  }

  // filling the board black
  context.fillStyle = "#000";
  context.fillRect(0, 0, board.width, board.height);

  // placing the snake
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
    // the place where we want the head to set, check already contains in snakebody
    if (snakeBody[i][0] == snakeX && snakeBody[i][1] == snakeY) {
      clearInterval(gameEngine);
      controls.style.display = "flex";
      startBtn.style.display = "none";
      restartBtn.style.display = "block";
      localStorage.setItem("highestVal", highestVal);
    }
  }

  snakeBody[0] = [snakeX, snakeY];

  for (let i = 0; i < snakeBody.length; i++) {
    if (i == 0) {
      context.fillStyle = "yellow";
    } else {
      context.fillStyle = "lime";
    }
    context.fillRect(
      snakeBody[i][0] * grid,
      snakeBody[i][1] * grid,
      grid - 2,
      grid - 2
    );
  }

  // placing the rectangle food
  // context.fillRect(foodX * grid, foodY * grid, grid, grid);

  // placing circle food
  context.fillStyle = "hotpink";
  context.beginPath();
  context.arc(
    foodX * grid + grid / 2,
    foodY * grid + grid / 2,
    RADIUS - 4,
    0,
    2 * Math.PI
  );
  context.fill();

  // if food is eaten
  if (foodX == snakeX && foodY == snakeY) {
    GULP_SOUND.play();
    scoreVal++;
    if (scoreVal > highestVal) {
      highestVal++;
    }
    score.innerHTML = scoreVal;
    highest.innerHTML = highestVal;
    snakeBody.push([foodX, foodY]);
    foodX = Math.floor(Math.random() * tiles);
    foodY = Math.floor(Math.random() * tiles);
  }
}

// keyboard controls
function keyTap(e) {
  if (e.keyCode == 37 && vx != 1) {
    if (snakeY > grid || snakeY < 0) {
      return;
    }
    vx = -1;
    vy = 0;
  } else if (e.keyCode == 38 && vy != 1) {
    if (snakeX > grid || snakeX < 0) {
      return;
    }
    vx = 0;
    vy = -1;
  } else if (e.keyCode == 39 && vx != -1) {
    if (snakeY > grid || snakeY < 0) {
      return;
    }
    vx = 1;
    vy = 0;
  } else if (e.keyCode == 40 && vy != -1) {
    if (snakeX > grid || snakeX < 0) {
      return;
    }
    vx = 0;
    vy = 1;
  } else if (e.keyCode == 32) {
    isGamePause = !isGamePause;
  }
}

// mobile joystick controls
function moveUp() {
  if (vy != 1) {
    if (snakeX > grid || snakeX < 0) {
      return;
    }
    vx = 0;
    vy = -1;
  } else {
    return;
  }
}

function moveDown() {
  if (vy != -1) {
    if (snakeX > grid || snakeX < 0) {
      return;
    }
    vx = 0;
    vy = 1;
  } else {
    return;
  }
}

function moveLeft() {
  if (vx != 1) {
    if (snakeY > grid || snakeY < 0) {
      return;
    }
    vx = -1;
    vy = 0;
  } else {
    return;
  }
}

function moveRight() {
  if (vx != -1) {
    if (snakeY > grid || snakeY < 0) {
      return;
    }
    vx = 1;
    vy = 0;
  } else {
    return;
  }
}

// pause game in mobile
function pauseGame() {
  isGamePause = !isGamePause;
}
