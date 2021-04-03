(function(window){
  'use strict';

  /**
   * The TicTaeToe class holds all relevant game data.
   */
  function TicTaeToe() {
    this.gameArray = [ "Y","Y","Y",
                       "Y","Y","Y",
                       "Y","Y","Y" ];
    this.gameInProgress = true;
    this.valueForBox = "X";
    this.total = 0;
    this.won = 0;
    this.draw = 0;
    this.lost = 0;
  }

  /**
   * Checks the status of game and returns
   * {"won",[a,b,c]} for win,
   * {"lost",[a,b,c]} for lost,
   * {"draw", []} for draw,
   * {"", []} for game in progress.
   */
  TicTaeToe.prototype._checkGameStatus = function () {
    // 0 1 2
    // 3 4 5
    // 6 7 8
    var win = [ [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6] ];
    var game = {
      status: "",
      row: []
    };
    for (var i = 0; i < win.length; i++) {
      if (this.gameArray[win[i][0]] === this.gameArray[win[i][1]] && this.gameArray[win[i][0]] === this.gameArray[win[i][2]]) {
        if (this.gameArray[win[i][0]] === "X") {
          game.status = "won";
          game.row = win[i];
          return game;
        } else if (this.gameArray[win[i][0]] === "O") {
          game.status = "lost";
          game.row = win[i];
          return game;
        }
      }
    }
    var draw = true;
    for (var i = 0; i < this.gameArray.length; i++) {
      if (this.gameArray[i] === "Y") {
        draw = false;
        return game;
      }
    }
    game.status = "draw";
    return game;
  };

  /**
   * Checks if a win is available for either parties in the next move,
   * and returns that move.
   */
  TicTaeToe.prototype._ifWinAvailable = function (availableBoxes) {
    for (var i = 0; i < availableBoxes.length; i++) {
      this.gameArray[availableBoxes[i]] = this.valueForBox;
      var game = this._checkGameStatus();
      this.gameArray[availableBoxes[i]] = "Y";
      if (game.status === "lost") {
        return i;
      }
    }
    for (var i = 0; i < availableBoxes.length; i++) {
      this.gameArray[availableBoxes[i]] = this.valueForBox === "X"? "O" : "X";
      var game = this._checkGameStatus();
      this.gameArray[availableBoxes[i]] = "Y";
      if (game.status === "won") {
        return i;
      }
    }
    return -1;
  };

  /**
   * Makes the move in the array, as well as in the DOM.
   * Updates all the STATE variables & DOM elements as required.
   */
  TicTaeToe.prototype._makeMove = function (idOfBox) {
    // Update STATE
    this.gameArray[idOfBox] = this.valueForBox;
    this.valueForBox = this.valueForBox === "X" ? "O" : "X";

    var game = this._checkGameStatus();
    // var game = {
    //   status: "won",
    //   row: [0,4,7],
    // };
    //var game = {
    //   status: "",
    //   row: [],
    // };
    if (game.status === "won") {
      this.gameInProgress = false;
      this.total++;
      this.won++;
    } else if (game.status === "lost") {
      this.gameInProgress = false;
      this.total++;
      this.lost++;
    } else if (game.status === "draw") {
      this.gameInProgress = false;
      this.total++;
      this.draw++;
    }

    // Update DOM
    // 1. Update the Game Box
    var gameBoxElements = document.querySelectorAll(".gamecontainer__box");
    var targetBoxElement;
    for (var i = 0; i < gameBoxElements.length; i++) {
      if (parseInt(gameBoxElements[i].dataset.id, 10) === idOfBox) {
        targetBoxElement = gameBoxElements[i];
      }
    }
    targetBoxElement.innerText = this.gameArray[idOfBox];
    if (game.status === "won" || game.status === "lost") {
      for (var i = 0; i < game.row.length; i++) {
        var gameBoxElements = document.querySelectorAll(".gamecontainer__box");
        for (var j = 0; j < gameBoxElements.length; j++) {
          if (parseInt(gameBoxElements[j].dataset.id, 10) === game.row[i]) {
            gameBoxElements[j].setAttribute("class", "gamecontainer__box gamecontainer__box--red");
            break;
          }
        }
      }
    } else {
      targetBoxElement.setAttribute("class", "gamecontainer__box");
    }
    // 2. Update the Game Status
    if (game.status) {
      var statusElement = document.querySelector(".statscontainer__status");
      if (game.status === "won") {
        statusElement.innerText = "You won!";
      } else if (game.status === "draw") {
        statusElement.innerText = "It's a tie.";
      } else if (game.status === "lost") {
        statusElement.innerText = "You lost :(";
      }
      statusElement.setAttribute("class", "statscontainer__status statscontainer__status--visible");

      var totalElement = document.querySelector(".statscontainer__total");
      totalElement.innerText = this.total;

      var wonElement = document.querySelector(".statscontainer__won");
      wonElement.innerText = this.won;

      var drawElement = document.querySelector(".statscontainer__draw");
      drawElement.innerText = this.draw;

      var lostElement = document.querySelector(".statscontainer__lost");
      lostElement.innerText = this.lost;

      var newGameElement = document.querySelector(".statscontainer__newgame");
      newGameElement.setAttribute("class", "statscontainer__newgame statscontainer__newgame--visible");
    }

    if (!game.status)
      return true;
    return false;
  };

  /**
   * Makes the user move based on click, and
   * makes the computer move if possible.
   */
  TicTaeToe.prototype.onClickBox = function(event) {
    if (this.gameInProgress && event.target.innerText === "Y") {
      var boxesAvailable = this._makeMove(parseInt(event.target.dataset.id, 10));

      if (boxesAvailable) {
        var availableBoxes = [];
        for (var i = 0; i < this.gameArray.length; i++) {
          if (this.gameArray[i] === "Y") {
            availableBoxes[availableBoxes.length] = i;
          }
        }
        var moveBox = this._ifWinAvailable(availableBoxes);
        if (moveBox === -1) {
          moveBox = Math.floor(Math.random() * availableBoxes.length);
        } else if (Math.floor(Math.random() * 2)) {
          moveBox = Math.floor(Math.random() * availableBoxes.length);
        }
        this._makeMove(availableBoxes[moveBox]);
      }
    }
  };

  /**
   * Initializes the game STATE & DOM elements.
   */
  TicTaeToe.prototype.onClickNewGame = function (event) {
    // Update STATE
    this.gameArray = [ "Y","Y","Y",
                       "Y","Y","Y",
                       "Y","Y","Y" ];
    this.gameInProgress = true;
    this.valueForBox = "X";

    //Update DOM
    var gameBoxElements = document.querySelectorAll(".gamecontainer__box");
    for (var i = 0; i < gameBoxElements.length; i++) {
      gameBoxElements[i].setAttribute("class", "gamecontainer__box gamecontainer__box--empty");
      gameBoxElements[i].innerText = "Y";
    }

    var statusElement = document.querySelector(".statscontainer__status");
    statusElement.setAttribute("class", "statscontainer__status");
    var newGameElement = document.querySelector(".statscontainer__newgame");
    newGameElement.setAttribute("class", "statscontainer__newgame");

  };

  /**
   * On windows load, wire the Event Listeners for clicks.
   */
  TicTaeToe.prototype.onLoadGame = function () {
    var gameBoxElements = document.querySelectorAll(".gamecontainer__box");
    for (var i = 0; i < gameBoxElements.length; i++) {
      gameBoxElements[i].onclick = this.onClickBox.bind(this);
    }

    var newGameElement = document.querySelector(".statscontainer__newgame");
    newGameElement.onclick = this.onClickNewGame.bind(this);
  };

  window.TicTaeToe = new TicTaeToe();

})(window);

/**
 * On windows load, call the onLoadGame() function.
 */
if (window.addEventListener)
  window.addEventListener(
    "load",
    TicTaeToe.onLoadGame.bind(TicTaeToe)
  );
else if (window.attachEvent)
  window.attachEvent("onload", TicTaeToe.onLoadGame.bind(TicTaeToe));
else window.onload = TicTaeToe.onLoadGame.bind(TicTaeToe);
