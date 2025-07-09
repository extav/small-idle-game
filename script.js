"use strict";

let board;
let context;

const gameData = {
  score: 0,
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
  document.getElementById("score").textContent = "Score: " + gameData.score;
}

function setupButtonArea() {
  const btnarea = document.getElementById("buttonArea");

  // add a point button
  const ptbtn = document.createElement("button");
  ptbtn.id = "btn-points";
  ptbtn.textContent = "Get Points";
  ptbtn.onclick = pointbutton;

  btnarea.appendChild(ptbtn);
}

function update(timestamp) {
  // move
  move(timestamp);
  // draw
  draw();
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
      balls.delete(ball)
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
    4,
  );
  balls.add(ball);
}
