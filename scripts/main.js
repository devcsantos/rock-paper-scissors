const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const RPS = [ROCK, PAPER, SCISSORS];
const MESSAGE_DRAW = 'DRAW';
const PLAYER_WIN = 'PLAYER WINS';
const OPPONENT_WIN = 'OPPONENT WINS';

let playerChoice;
let opponentChoice;

let isCPU = confirm(`Play with an AI? Cancel for two-player mode`) ? true : false;

loadEventListeners();

let run = setInterval(update, 2000); // keep checking for inputs

function loadEventListeners() {
  let choices = document.getElementsByClassName('side-box');

  for(let index=0; index < choices.length; index++) {
    let side = choices[index].children;
    for(let i=0;  i<side.length; i++) {
      let choice = side[i];
      //choice.addEventListener(onclick, translatePosition, false); wont work for some reason
      choice.onclick = translatePosition;
    }
    if(isCPU) { break; } // dont add onclick events for CPU
  }
}

function evaluate(playerChoice, opponentChoice) {
  let message;

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
  eval(sideName + 'Choice = ' + choice); // dynamic assigning to either playerChoice or opponentChoice
  console.log(`${sideName} click ${choice}`);
}

function update() {
  if(isCPU && playerChoice && !opponentChoice) cpuSelectChoice(); // only select after player
  if(playerChoice && opponentChoice) { // evaluate only when both made their move
    evaluate(playerChoice, opponentChoice);
    clearInterval(run); // stop checking
  }
}

function cpuSelectChoice() {
  console.log(`CPU Selecting choice`);
  opponentChoice = RPS[getRandomInt(3)];
  console.log(`CPU selected ${opponentChoice}`);
}

function getRandomInt(max) { // taken from MDN
  return Math.floor(Math.random() * Math.floor(max));
}