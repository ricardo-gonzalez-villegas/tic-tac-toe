const form = document.getElementById("player-form");

const reset = document.querySelector(".reset");

reset.addEventListener("click", () => {
  location.reload();
});

form.addEventListener("start", function(event) {
  event.preventDefault();

  playerOneName = form.querySelector('input[name="playerOne"]').value;
  playerTwoName = form.querySelector('input[name="playerTwo"]').value;

  if (playerOneName == "" || playerTwoName == "") {
    return;
  }

  const playerOne = Player(playerOneName, "x");
  const playerTwo = Player(playerTwoName, "o");

  displayController.getPlay(playerOne);
});

let playerOneName = "player 1";
let playerTwoName = "player 2";

const Player = (name, mark) => {
  "use strict";
  let getName = name;

  let getMark = mark;

  return {
    getName,
    getMark
  };
};

const playerOne = Player(playerOneName, "x");
const playerTwo = Player(playerTwoName, "o");

let currentPlayer = playerOne;

const gameArray = [];

const gameBoard = (function() {
  "use strict";

  function _setBoard(index, player) {
    if (gameArray[index] == null) {
      gameArray[index] = player.getMark;
      displayController.getCurrent();
    }
  }

  function getBoard(index, player) {
    _setBoard(index, player);
  }

  function checkBoard() {
    let inARow = 0;
    for (let i = 0; i < arguments.length; i++) {
      let currentArray = arguments[i];
      console.log('-----------------------');
      for (let j = 0; j < currentArray.length; j++) {
        let mark = gameArray[j];
        if(currentPlayer.getMark == mark){
            inARow++;
            console.log(mark);
            console.log('the current row count is '+inARow);
            if(inARow === 3){
                console.log('winner');
            }
        } else inARow = 0;
      }
    }
  }

  return {
    getBoard,
    checkBoard
  };
})();

const boardItems = document.querySelectorAll(".board-item");
boardItems.forEach(boardItem => {
  boardItem.addEventListener("click", event => {
    let index = event.target.id;

    if(currentPlayer.getMark == 'x'){
        event.target.classList.add('cross');
    } else if (currentPlayer.getMark == 'o'){
        event.target.classList.add('knot');
    }

    gameBoard.getBoard(index, currentPlayer);
    

    const p1 = [0, 1, 2];
    const p2 = [3, 4, 5];
    const p3 = [6, 7, 8];
    const p4 = [0, 3, 6];
    const p5 = [1, 4, 7];
    const p6 = [2, 5, 8];
    const p7 = [0, 4, 8];
    const p8 = [2, 4, 6];

    switch (index) {
      case "0":
        gameBoard.checkBoard(p1, p4, p7);
        break;

      case "1":
        gameBoard.checkBoard(p1, p5);
        break;

      case "2":
        gameBoard.checkBoard(p1, p6, p8);
        break;

      case "3":
        gameBoard.checkBoard(p2, p4);
        break;

      case "4":
        gameBoard.checkBoard(p2, p5, p7, p8);
        break;

      case "5":
        gameBoard.checkBoard(p2, p6);
        break;

      case "6":
        gameBoard.checkBoard(p3, p4, p8);
        break;

      case "7":
        gameBoard.checkBoard(p3, p7);
        break;

      case "8":
        gameBoard.checkBoard(p3, p6, p7);
        break;
    }
  });
});

const displayController = (function() {
  "use strict";

  function getCurrent() {
    currentPlayer.getMark === "x"
      ? (currentPlayer = playerTwo)
      : (currentPlayer = playerOne);
    console.log("I switched to player: " + currentPlayer.getMark);
  }

  return {
    getCurrent
  };
})();
