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

const Player = name => {
  "use strict";
  const getName = () => name;

  return {
    getName
  };
};

const playerOne = Player("o");
const playerTwo = Player("x");
