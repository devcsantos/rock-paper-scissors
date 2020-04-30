const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const RPS = [ROCK, PAPER, SCISSORS];
const MESSAGE_DRAW = `THIS ROUND IS A DRAW`;

let playerChoice;
let opponentChoice;
let playerScore = 0;
let opponentScore = 0;
let playerNames = document.getElementsByClassName('player-name');

let isCPU = confirm(`Play with an AI? Cancel for two-player mode`) ? true : false;

loadEventListeners();
initializePlayerValues();
drawImages();

let run = setInterval(update, 2000); // keep checking for inputs

function loadEventListeners() {
  let choices = document.getElementsByClassName('side-box');

  for(let index=choices.length-1; index >= 0; index--) {
    let side = choices[index].children;
    for(let i=0;  i<side.length; i++) {
      let choice = side[i];
      //choice.addEventListener(onclick, translatePosition, false); wont work for some reason
      choice.onclick = translatePosition;
    }
    if(isCPU) { break; } // dont add onclick events for CPU
  }
}

function initializePlayerValues() {
  for(let i=playerNames.length-1; i >= 0; i--) {
    if(isCPU) { 
      playerNames[i].innerHTML = `PLAYER ${i}`;
      break; // dont rename opponent
    } else { playerNames[i].innerHTML = `PLAYER ${i+1}`; }
  }

  document.getElementById('opponent-score-box').innerHTML = opponentScore;
  document.getElementById('player-score-box').innerHTML = playerScore;
}

function evaluate(playerChoice, opponentChoice) {
  let message;

  let firstPlayerName = playerNames[0].innerHTML;
  let secondPlayerName = playerNames[1].innerHTML;
  const OPPONENT_WIN = `${firstPlayerName} WINS THIS ROUND!`;
  const PLAYER_WIN = `${secondPlayerName} WINS THIS ROUND!`;

  if(playerChoice == ROCK) {
    if(opponentChoice == ROCK) message = MESSAGE_DRAW
    else if(opponentChoice == PAPER) message = OPPONENT_WIN
    else message = PLAYER_WIN
  } else if(playerChoice == PAPER) {
    if(opponentChoice == ROCK) message = PLAYER_WIN
    else if(opponentChoice == PAPER) message = MESSAGE_DRAW
    else message = OPPONENT_WIN
  } else {
    if(opponentChoice == ROCK) message = OPPONENT_WIN
    else if(opponentChoice == PAPER) message = PLAYER_WIN
    else message = MESSAGE_DRAW
  }

  switch(message) {
    case OPPONENT_WIN: opponentScore++; break;
    case PLAYER_WIN: playerScore++; break;
  }

  document.querySelector('#result-text').innerHTML = message;
  console.log(message);
}

function translatePosition() {
  let sideName = this.parentElement.id;
  let choice = this.id.replace(/-(player|opponent)/,``).toUpperCase();
  let arenaOffsetX = document.getElementById(`${sideName}-choice`).offsetLeft; // get the x position of arena
  let arenaOffsetY = document.getElementById(`${sideName}-choice`).offsetTop; // get the y position of arena

  let moveX = arenaOffsetX - this.offsetLeft; // amount of pixels to move in x-axis
  let moveY = arenaOffsetY - this.offsetTop; // amount of pixels to move in y-axis

  this.style.transform =  `translate(${moveX}px,${moveY}px)`;
  eval(`${sideName}Choice = ${choice}`); // dynamic assigning to either playerChoice or opponentChoice

  let siblingElements = this.parentElement.children;
  for(i=0;i<siblingElements.length;i++) {
    if(siblingElements[i] !== this) {
      siblingElements[i].onclick = undefined;
      siblingElements[i].style.opacity = 0;
    }
  } // remove ability to choose

  console.log(`${sideName} click ${choice}`);
}

function update() {
  if(isCPU && playerChoice && !opponentChoice) cpuSelectChoice(); // only select after player
  if(playerChoice && opponentChoice) { // evaluate only when both made their move
    evaluate(playerChoice, opponentChoice);
    clearInterval(run); // stop checking
  }
  document.getElementById('opponent-score-box').innerHTML = opponentScore;
  document.getElementById('player-score-box').innerHTML = playerScore;
}

function translatePositionCPU() {
  let self = document.getElementById(`${opponentChoice.toLowerCase()}-opponent`);
  let arenaOffsetX = document.getElementById(`opponent-choice`).offsetLeft; // get the x position of arena
  let arenaOffsetY = document.getElementById(`opponent-choice`).offsetTop; // get the y position of arena

  let moveX = arenaOffsetX - self.offsetLeft; // amount of pixels to move in x-axis
  let moveY = arenaOffsetY - self.offsetTop; // amount of pixels to move in y-axis

  self.style.transform =  `translate(${moveX}px,${moveY}px)`;

  let siblingElements = self.parentElement.children;
  for(i=0;i<siblingElements.length;i++) {
    if(siblingElements[i] !== self) {
      siblingElements[i].onclick = undefined;
      siblingElements[i].style.opacity = 0;
    }
  }
}

function cpuSelectChoice() {
  console.log('CPU Selecting choice');
  opponentChoice = RPS[getRandomInt(3)];
  translatePositionCPU();
  console.log(`CPU selected ${opponentChoice}`);
}

function getRandomInt(max) { // taken from MDN
  return Math.floor(Math.random() * Math.floor(max));
}

function drawImages() {
  let canvasList = document.getElementsByClassName('canvas-option');
  let image = document.getElementById('image-reference');

  for(i = 0; i < canvasList.length; i++) {
    let canvas = canvasList[i];
    let context = canvas.getContext('2d');
    let optionType = canvas.parentElement.id.replace(/-(player|opponent)/,``).toUpperCase();

    switch(optionType) {
      case ROCK: 
        context.drawImage(image, 75, 60, 115, 160, 30, -20, 250, 150); // rock image
        break;
      case PAPER: 
        context.drawImage(image, 200, 60, 110, 160, 45, 0, 200, 150); // paper image
        break;
      case SCISSORS: 
        context.drawImage(image, 315, 60, 100, 160, 55, 0, 175, 150); // scissors image
        break;
    }
  }
}