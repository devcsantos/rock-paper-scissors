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


evaluate(playerChoice, opponentChoice);

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


