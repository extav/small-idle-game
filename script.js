"use strict";

let board;
let context;

const gameData = {
  score: 0,
  generators: 0,
  genPower: 0.2,
  lastGenUpdate: undefined,
  genCost: 5,
  hangingPoints: 0,
};

const balls = new Set();

window.onload = function () {
  board = document.getElementById("board");
  context = board.getContext("2d");
  console.log("this fired on window.onload");
  updateScore();
  setupButtonArea();
  requestAnimationFrame(update);
};

function updateScore() {
  document.getElementById("score").textContent =
    "Score: " + (Math.round(gameData.score * 100) / 100).toFixed(2);
  document.getElementById("generators").textContent =
    "Generators : " + gameData.generators;
}

function idleScoring(timestamp) {
  if (gameData.lastGenUpdate == undefined) {
    gameData.lastGenUpdate = timestamp;
  }
  // want to consume the latest chunk of time generated
  // and add score equal to time * power
  const elapsed = timestamp - gameData.lastGenUpdate;
  gameData.lastGenUpdate = timestamp;
  const scorechange =
    (elapsed * gameData.generators * gameData.genPower) / 1000;
  gameData.score += scorechange;
  gameData.hangingPoints += scorechange;
  if (gameData.hangingPoints > 1) {
    gameData.hangingPoints -= 1;
    addBall();
  }
}

function setupButtonArea() {
  const btnarea = document.getElementById("buttonArea");

  // add a point button
  const ptbtn = document.createElement("button");
  ptbtn.id = "btn-points";
  ptbtn.textContent = "Get Points";
  ptbtn.onclick = pointbutton;

  btnarea.appendChild(ptbtn);

  // add a generator button
  const genbtn = document.createElement("button");
  genbtn.id = "btn-generator";
  genbtn.textContent = "Build Generator";
  genbtn.onclick = generatorbutton;
  btnarea.appendChild(genbtn);
}

function update(timestamp) {
  // move
  move(timestamp);
  // draw
  draw();
  idleScoring(timestamp);
  updateScore();
  // request animation frame recursively
  console.log("aaaa");
  requestAnimationFrame(update);
}

function pointbutton() {
  gameData.score += 1;
  updateScore();
  addBall();
  console.log(balls);
}

function generatorbutton() {
  if (gameData.score > gameData.genCost) {
    gameData.score -= gameData.genCost;
    gameData.generators += 1;
  }
}

class Ball {
  constructor(image, x, y, width, height) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = (Math.random() * 4 + 8) / 1000;
    this.timestamp = undefined;
  }
}

function move(timestamp) {
  for (let ball of balls.values()) {
    if (ball.timestamp == undefined) {
      ball.timestamp = timestamp;
    }
    ball.y += ball.velocity * (timestamp - ball.timestamp);
    ball.timestamp = timestamp;
    if (ball.y > board.height) {
      balls.delete(ball);
    }
  }
}

function draw() {
  context.clearRect(0, 0, board.width, board.height);
  for (let ball of balls.values()) {
    context.fillStyle = "white";
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
  }
}

function addBall() {
  const ball = new Ball(
    null,
    Math.random() * board.width,
    (Math.random() * board.height) / 8,
    4,
    4
  );
  balls.add(ball);
}
