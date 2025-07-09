"use strict";

let board;
let context;

const gameData = {
  score: 0,
};

window.onload = function () {
  board = document.getElementById("board");
  context = board.getContext("2d");
  console.log("this fired on window.onload");
  updateScore();
  setupButtonArea();
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

function pointbutton() {
  gameData.score += 1;
  updateScore();
}
