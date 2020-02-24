const form = document.getElementById("player-form");

const reset = document.querySelector(".reset");

reset.addEventListener("click", () => {
  location.reload();
});

const Player = (name, mark) => {
  "use strict";
  let playerName = name;

  let getMark = mark;

  let counter = 0;

  function increaseCount() {
    counter++;
  }

  function getPlaced() {
    return counter;
  }

  function setName(newName) {
    playerName = newName;
  }

  function getName(){
      return playerName;
  }

  return {
    getName,
    getMark,
    counter,
    increaseCount,
    getPlaced,
    setName
  };
};

let playerOneName = "player 1";
let playerTwoName = "player 2";

const playerOne = Player(playerOneName, "x");
const playerTwo = Player(playerTwoName, "o");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  playerOneName = form.querySelector('input[name="playerOne"]').value;
  playerTwoName = form.querySelector('input[name="playerTwo"]').value;

  if (playerOneName == "" || playerTwoName == "") {
    return;
  }

  playerOne.setName(playerOneName);
  playerTwo.setName(playerTwoName);
});

let currentPlayer = playerOne;

const gameArray = [];

const gameBoard = (function() {
  "use strict";

  function _setBoard(index, player) {
    if (gameArray[index] == null) {
      gameArray[index] = player.getMark;
    }
  }

  function getBoard(index, player) {
    _setBoard(index, player);
  }

  function checkBoard() {
    for (let i = 0; i < arguments.length; i++) {
      let currentArray = arguments[i];
      let sameMark = 0;
      for (let j = 0; j < 3; j++) {
        let currentMark = gameArray[currentArray[j]];
        if (currentMark == currentPlayer.getMark) {
          sameMark++;
          if (sameMark == 3) alert("the winner is " + currentPlayer.getName());
        } else sameMark = 0;
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

    if (currentPlayer.getMark == "x") {
      if (
        event.target.classList.contains("cross") ||
        event.target.classList.contains("knot")
      ) {
        return;
      } else {
        event.target.classList.add("cross");
      }
    } else if (currentPlayer.getMark == "o") {
      if (
        event.target.classList.contains("cross") ||
        event.target.classList.contains("knot")
      ) {
        return;
      } else {
        event.target.classList.add("knot");
      }
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

    currentPlayer.increaseCount();
    if (currentPlayer.getPlaced() >= 3) {
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
          gameBoard.checkBoard(p3, p5);
          break;

        case "8":
          gameBoard.checkBoard(p3, p6, p7);
          break;
      }
    }
    displayController.getCurrent();
  });
});

const displayController = (function() {
  "use strict";

  function getCurrent() {
    currentPlayer.getMark === "x"
      ? (currentPlayer = playerTwo)
      : (currentPlayer = playerOne);
  }

  return {
    getCurrent
  };
})();
