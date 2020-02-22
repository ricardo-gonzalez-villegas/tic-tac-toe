const form = document.getElementById("player-form");

let playerOneName = "player1";
let playerTwoName = "player2";

const Player = name => {
  "use strict";
  let getName = name;

  function consoleName() {
    console.log("the name has been updated" + name);
  }
  return {
    getName,
    consoleName
  };
};

const playerOne = Player(playerOneName, "o");
const playerTwo = Player(playerTwoName, "x");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  playerOneName = form.querySelector('input[name="playerOne"]').value;
  playerTwoName = form.querySelector('input[name="playerTwo"]').value;

  if (playerOneName == "" || playerTwo == "") {
    return;
  }

  playerOne.getName = playerOneName;
  playerOne.consoleName();
});

const gameBoard = (function() {
  "use strict";

  const gameArray = [];

  function _setBoard() {
    console.log(_privateProperty);
  }

  function getBoard() {
    _setBoard();
  }

  return {
    getBoard
  };
})();

const displayController = (function() {
  "use strict";

  return {};
})();

const game = (function() {
  "use strict";

  return {};
})();
