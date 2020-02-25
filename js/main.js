"use strict";

const playerTurn = document.querySelector(".player-turn");
const form = document.getElementById("player-form");
const reset = document.querySelector(".reset");
const board = document.querySelector(".board");
const gameArray = [];

let gameOver = false;

reset.addEventListener("click", () => {
  location.reload();
});

const Player = (name, mark) => {
  "use strict";
  let _playerName = name;

  let _markCounter = 0;

  const setName = newName => (_playerName = newName);

  const increaseMarkCount = () => _markCounter++;

  const getPlaced = () => _markCounter;

  const getName = () => _playerName;

  const getMark = () => mark;

  return {
    increaseMarkCount,
    getPlaced,
    getName,
    getMark,
    setName
  };
};

let playerOneName = "Player 1";
let playerTwoName = "Player 2";

const playerOne = Player(playerOneName, "x");
const playerTwo = Player(playerTwoName, "o");

let currentPlayer = playerOne;

form.addEventListener("submit", function(event) {
  event.preventDefault();

  playerOneName = form.querySelector('input[name="playerOne"]').value;
  playerTwoName = form.querySelector('input[name="playerTwo"]').value;

  if (playerOneName == "" || playerTwoName == "") {
    return;
  }

  playerOne.setName(playerOneName);
  playerTwo.setName(playerTwoName);

  playerTurn.innerHTML = `${playerOne.getName()}'s turn.`;

  form.remove();
});

const gameBoard = (function() {
  "use strict";

  const _setBoard = (index, player) => {
    if (gameArray[index] == null) gameArray[index] = player.getMark();
  };

  const getBoard = (index, player) => _setBoard(index, player);

  function checkBoard() {
    for (let i = 0; i < arguments.length; i++) {
      let currentArray = arguments[i];
      let tally = 0;

      for (let j = 0; j < 3; j++) {
        let mark = gameArray[currentArray[j]];

        if (mark === currentPlayer.getMark()) {
          tally++;

          if (tally === 3) {
            gameOver = true;
            playerTurn.innerHTML = `The winner is ${currentPlayer.getName()}.`;
            board.classList.add("game-over");
            displayController.flashWinner(currentArray);
          }
        } else tally = 0;
      }
    }
    if (playerOne.getPlaced() === 5 && gameOver === false) {
      gameOver = true;
      playerTurn.innerHTML = "Draw.";
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
    form.remove();

    let index = event.target.id;
    const p = document.querySelector("p");
    if (currentPlayer.getMark() == "x") {
      if (event.target.dataset.value == "set") {
        return;
      } else {
        event.target.dataset.value = "set";
        event.target.classList.add("cross");
        event.target.lastChild.innerHTML = "X";
      }
    } else if (currentPlayer.getMark() == "o") {
      if (event.target.dataset.value == "set") {
        return;
      } else {
        event.target.dataset.value = "set";
        event.target.classList.add("knot");
        event.target.lastChild.innerHTML = "O";
      }
    }

    gameBoard.getBoard(index, currentPlayer);

    currentPlayer.increaseMarkCount();

    if (currentPlayer.getPlaced() >= 3) {
      switch (index) {
        case "0":
          gameBoard.checkBoard([0, 1, 2], [0, 3, 6], [0, 4, 8]);
          break;

        case "1":
          gameBoard.checkBoard([0, 1, 2], [1, 4, 7]);
          break;

        case "2":
          gameBoard.checkBoard([0, 1, 2], [2, 5, 8], [2, 4, 6]);
          break;

        case "3":
          gameBoard.checkBoard([3, 4, 5], [0, 3, 6]);
          break;

        case "4":
          gameBoard.checkBoard([3, 4, 5], [1, 4, 7], [0, 4, 8], [2, 4, 6]);
          break;

        case "5":
          gameBoard.checkBoard([3, 4, 5], [2, 5, 8]);
          break;

        case "6":
          gameBoard.checkBoard([6, 7, 8], [0, 3, 6], [2, 4, 6]);
          break;

        case "7":
          gameBoard.checkBoard([6, 7, 8], [1, 4, 7]);
          break;

        case "8":
          gameBoard.checkBoard([6, 7, 8], [2, 5, 8], [0, 4, 8]);
          break;
      }
    }
    displayController.getCurrent();
  });
});

const displayController = (function() {
  "use strict";

  const getCurrent = () => {
    if (gameOver !== true) {
      currentPlayer.getMark() === "x"
        ? (currentPlayer = playerTwo)
        : (currentPlayer = playerOne);

      playerTurn.innerHTML = `${currentPlayer.getName()}'s turn.`;
    }
  };

  const flashWinner = array => {
    for (let i = 0; i < array.length; i++) {
    const winnerArray = document.getElementById(`${array[i]}`);
    winnerArray.classList.add('blinking');
    }
  };

  return {
    getCurrent,
    flashWinner
  };
})();
