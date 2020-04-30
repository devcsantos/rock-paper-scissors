const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const RPS = [ROCK, PAPER, SCISSORS];
const MESSAGE_DRAW = 'DRAW';
const PLAYER_WIN = 'PLAYER WINS';
const OPPONENT_WIN = 'OPPONENT WINS';

let playerChoice;
let opponentChoice;
let playerScore = 0;
let opponentScore = 0;

let isCPU = confirm(`Play with an AI? Cancel for two-player mode`) ? true : false;

loadEventListeners();

let run = setInterval(update, 2000); // keep checking for inputs


document.querySelector("#score-box").innerHTML = `${playerScore} - ${opponentScore}`; // initialize score text

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
  eval(sideName + 'Choice = ' + choice); // dynamic assigning to either playerChoice or opponentChoice

  let siblingElements = this.parentElement.children;
  for(i=0;i<siblingElements.length;i++) { siblingElements[i].onclick = undefined;} // remove ability to choose

  console.log(`${sideName} click ${choice}`);
}

function update() {
  if(isCPU && playerChoice && !opponentChoice) cpuSelectChoice(); // only select after player
  if(playerChoice && opponentChoice) { // evaluate only when both made their move
    evaluate(playerChoice, opponentChoice);
    clearInterval(run); // stop checking
  }
  document.querySelector("#score-box").innerHTML = `${playerScore} - ${opponentScore}`;
}

function translatePositionCPU() {
  let self = document.getElementById(`${opponentChoice.toLowerCase()}-opponent`);
  let arenaOffsetX = document.getElementById(`opponent-choice`).offsetLeft; // get the x position of arena
  let arenaOffsetY = document.getElementById(`opponent-choice`).offsetTop; // get the y position of arena

  let moveX = arenaOffsetX - self.offsetLeft; // amount of pixels to move in x-axis
  let moveY = arenaOffsetY - self.offsetTop; // amount of pixels to move in y-axis

  self.style.transform =  `translate(${moveX}px,${moveY}px)`;
}

function cpuSelectChoice() {
  console.log(`CPU Selecting choice`);
  opponentChoice = RPS[getRandomInt(3)];
  translatePositionCPU();
  console.log(`CPU selected ${opponentChoice}`);
}

function getRandomInt(max) { // taken from MDN
  return Math.floor(Math.random() * Math.floor(max));
}