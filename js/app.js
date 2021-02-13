const GameBoard = (() => {

    let gameCount = 0;
    let moveCount = 0;

    let gameArray = {
        0: ["free", ""],
        1: ["free", ""],
        2: ["free", ""],
        3: ["free", ""],
        4: ["free", ""],
        5: ["free", ""],
        6: ["free", ""],
        7: ["free", ""],
        8: ["free", ""],
    }

    const setGameCount = () => {
        gameCount++;
    }

    const getGameCount = () => {
        return gameCount;
    }

    const resetGameCount = () => {
        gameCount = 0;
    }

    const setMoveCount = () => {
        moveCount++;
    }

    const getMoveCount = () => {
        return moveCount;
    }

    const resetGameArray = () => {
        for (let i = 0; i < 9; i++) {
            gameArray[i][0] = "free";
            gameArray[i][1] = "";
        }
    }

    return {
        gameArray,
        gameCount,
        resetGameArray,
        resetGameCount,
        getGameCount,
        setGameCount,
        getMoveCount,
        setMoveCount
    }
})();

const Players = (() => { 
    let player1;
    let player2;

    const playerFactory = (name, marker) => {
        return { name, marker };
    }

    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    const computerMove = (computerMarker, finished) => {
        let num; 
        let gameCount = GameBoard.getGameCount();

        do {
            num = getRandomIntInclusive(0, 8);
        }
        while (GameBoard.gameArray[num][0] != "free" && GameBoard.getGameCount() < 4); 
        if (gameCount < 4 && !finished) {
            GameBoard.gameArray[num][0] = "taken";
            GameBoard.gameArray[num][1] = computerMarker;
            DisplayController.boardHtml[num].innerText = computerMarker;
        }
    }

    return {
        player1,
        player2,
        playerFactory,
        computerMove
    }
})();

const Win = (() => {
    const patterns = {
        0: [0, 1, 2],
        1: [0, 3, 6],
        2: [0, 4, 8],
        3: [1, 4, 7],
        4: [2, 4, 6],
        5: [2, 5, 8],
        6: [3, 4, 5],
        7: [6, 7, 8]
    }

    const checkWin = () => {
        for (let i = 0; i < 8; i++) {
            let win1 = patterns[i][0];
            let win2 = patterns[i][1];
            let win3 = patterns[i][2];
            if (GameBoard.gameArray[win1][1] == "o" && GameBoard.gameArray[win2][1] == "o" && GameBoard.gameArray[win3][1] == "o") {
                DisplayController.showWinner("O");
                console.log("O WON")
                DisplayController.highlightSquares(win1);
                DisplayController.highlightSquares(win2);
                DisplayController.highlightSquares(win3);
                return true;
            } else if (GameBoard.gameArray[win1][1] == "x" && GameBoard.gameArray[win2][1] == "x" && GameBoard.gameArray[win3][1] == "x") {
                DisplayController.showWinner("X");
                console.log("X WON")
                DisplayController.highlightSquares(win1);
                DisplayController.highlightSquares(win2);
                DisplayController.highlightSquares(win3);
                return true;
            }
        }
        return false;
    }

    const checkTie = (player2) => {
        if (player2 === "computer") {
            if (GameBoard.getGameCount() == 5 && checkWin() == false) {
                console.log("its a tie");
                DisplayController.showWinner("tie");
            }
        } else if (player2 === "player2") {
            if (GameBoard.getMoveCount() == 9 && checkWin() == false) {
                console.log("its a tie");
                DisplayController.showWinner("tie");
            }
        }
    }

    return {
        patterns,
        checkWin,
        checkTie
    }
})();

const DisplayController = (() => {
    const boardHtml = document.querySelectorAll(".game-table td");
    const markerChoicesHtml = document.querySelectorAll(".marker-choice");
    const playerChoicesHtml = document.querySelectorAll(".player-choice");
    const playerChoicesButtonsHtml = document.querySelector(".player-choice-buttons");
    const winnerInfoHtml = document.querySelector("#winner");
    const gameBoardHtml = document.querySelector(".game-board");
    const player2InfoHtml = document.querySelector("#player2-info");
    const playerInfoHtml = document.querySelectorAll(".player-info");
    const newGameHtml = document.querySelector("#new-game");


    const hidePlayerChoice = () => {
        playerChoicesButtonsHtml.style.display = "none";
    }

    const hideMarkerChoice = () => {
        markerChoicesHtml.forEach(choice => {
            choice.style.display = "none";
        })
    }

    const startGame = () => {
        gameBoardHtml.style.display = "block";
    }

    const changePlayer2Name = (player2Choice) => {
        if (player2Choice == "computer") {
            player2InfoHtml.innerHTML = "Computer: <span>O</span>"
        } else if (player2Choice == "player2") {
            player2InfoHtml.innerHTML = "Player 2: <span>O</span>"
        }
    }

    const placeMarker = (playerMarker, index, square, finished) => {
        if (GameBoard.getGameCount() < 6 && !finished) {
            GameBoard.gameArray[index][0] = "taken";
            GameBoard.gameArray[index][1] = playerMarker;
            square.innerText = playerMarker;
        }
    }

    const resetGameBoard = () => {
        for (let i = 0; i <= 8; i++) {
            boardHtml[i].innerText = "";
        }
        gameBoardHtml.style.display = "none";
        playerChoicesButtonsHtml.style.display = "flex";

        for(let i = 0; i <= 8; i++) {
            GameBoard.gameArray[i][0] = "free";
            GameBoard.gameArray[i][1] = "";
        }
        GameBoard.resetGameCount();
    }

    const showWinner = (winner) => {
        winnerInfoHtml.style.display = "block";
        if (winner == "O" || winner == "X")
        {
            winnerInfoHtml.innerText = `${winner} wins!`;
        } else if (winner == "tie") {
            winnerInfoHtml.innerText = `It's a tie!`;
        }
        playerInfoHtml.forEach(item => {
            item.style.display = "none";
        })
        newGameHtml.style.display = "block";
    }

    const highlightSquares = (square) => {
        boardHtml[square].style.background = "#A8DADC";
        boardHtml[square].style.transform = "rotate(10deg)";
        boardHtml[square].style["box-shadow"] = "15px 15px 3px 5px #08172c"
        boardHtml[square].style.border = "3px solid white";
    }
    
    return {
        hidePlayerChoice,
        hideMarkerChoice,
        placeMarker,
        startGame,
        changePlayer2Name,
        resetGameBoard,
        showWinner, 
        highlightSquares,
        boardHtml,
        markerChoicesHtml,
        playerChoicesHtml,
        player2InfoHtml,
        winnerInfoHtml,
        newGameHtml
    }
})();                                              


const PlayGame = (() => {

    // First displayed choice
    DisplayController.playerChoicesHtml.forEach(choice => { 
        choice.addEventListener("click", () => {
            Players.player2Choice = choice.id.toLowerCase();
            DisplayController.hidePlayerChoice();
            DisplayController.startGame();
            Players.player1 = Players.playerFactory("player1", "x");
            Players.player2 = Players.playerFactory(Players.player2Choice, "o");
            DisplayController.changePlayer2Name(Players.player2Choice);
        })
    })

    // Game play
    DisplayController.boardHtml.forEach((square, index) => {
        square.addEventListener("click", () => {
            if (GameBoard.gameArray[index][0] == "free") {

                // When playing with computer
                if(Players.player2.name === "computer") {
                    DisplayController.placeMarker(Players.player1.marker, index, square, Win.checkWin());
                    Win.checkWin();
                    Players.computerMove(Players.player2.marker, Win.checkWin());
                    Win.checkWin();
                    GameBoard.setGameCount();
                    Win.checkTie(Players.player2.name);
                }

                // When playing with player 2
                if(Players.player2.name === "player2") {
                    // Player 1
                    if (GameBoard.getMoveCount() % 2 === 0 || GameBoard.getMoveCount === 0) {
                        DisplayController.placeMarker(Players.player1.marker, index, square, Win.checkWin());
                        GameBoard.setMoveCount();
                        Win.checkWin();
                    } else if (GameBoard.getMoveCount() % 2 != 0) {
                        DisplayController.placeMarker(Players.player2.marker, index, square, Win.checkWin());
                        GameBoard.setMoveCount();
                        Win.checkWin();
                        GameBoard.setGameCount();
                    }
                    Win.checkTie(Players.player2.name);
                }
            }
        })     
    })

    DisplayController.newGameHtml.addEventListener("click", () => {
        window.location.reload();
    })
})();