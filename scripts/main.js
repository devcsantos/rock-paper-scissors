const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const MESSAGE_DRAW = 'DRAW';
const PLAYER_WIN = 'PLAYER WINS';
const OPPONENT_WIN = 'OPPONENT WINS';

let playerChoice;
let opponentChoice;

playerChoice = ROCK;
opponentChoice = SCISSORS;

loadEventListeners();
evaluate(playerChoice, opponentChoice);

function loadEventListeners() {
  let choices = document.getElementsByClassName('side-box');

  for(let index=0; index < choices.length; index++) {
    let side = choices[index].children;
    for(let i=0;  i<side.length; i++) {
      let choice = side[i];
      //choice.addEventListener(onclick, translatePosition, false); wont work for some reason
      choice.onclick = translatePosition;
    }
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
  let arenaOffsetX = document.getElementById(`${sideName}-choice`).offsetLeft; // get the x position of arena
  let arenaOffsetY = document.getElementById(`${sideName}-choice`).offsetTop; // get the y position of arena

  let moveX = arenaOffsetX - this.offsetLeft; // amount of pixels to move in x-axis
  let moveY = arenaOffsetY - this.offsetTop; // amount of pixels to move in y-axis

  this.style.transform =  `translate(${moveX}px,${moveY}px)`;
  console.log(`${sideName} click`);
}