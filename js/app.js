const GameBoard = (() => {
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

    let gameCount = 0;

    const setGameCount = () => {
        gameCount++;
    }

    const getGameCount = () => {
        return gameCount;
    }

    const resetGameCount = () => {
        gameCount = 0;
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
        setGameCount
    }
})();

const Players = (() => { 
    let player1;
    let player2;
    let player2Choice;
    let player2Marker;

    const playerFactory = (name, marker) => {
        return { name, marker };
    }

    return {
        player1,
        player2,
        player2Choice, 
        player2Marker,
        playerFactory
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
                DisplayController.infoHtml.innerText = "O wins";
                return true;
            } else if (GameBoard.gameArray[win1][1] == "x" && GameBoard.gameArray[win2][1] == "x" && GameBoard.gameArray[win3][1] == "x") {
                DisplayController.infoHtml.innerText = "X wins";
                return true;
            }
        }
    }

    return {
        patterns,
        checkWin
    }
})();

const DisplayController = (() => {
    const boardHtml = document.querySelectorAll(".game-table td");
    const markerChoicesHtml = document.querySelectorAll(".marker-choice");
    const playerChoicesHtml = document.querySelectorAll(".player-choice");
    const playerChoicesButtonsHtml = document.querySelector(".player-choice-buttons");
    const infoHtml = document.querySelector(".info");
    const gameBoardHtml = document.querySelector(".game-board");
    const player2InfoHtml = document.querySelector("#player2-info");

    let gameCount = GameBoard.getGameCount();

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

    const placeMarker = (playerMarker, index, square) => {
        if (gameCount < 6) {
            GameBoard.gameArray[index][0] = "taken";
            GameBoard.gameArray[index][1] = playerMarker;
            square.innerText = playerMarker;
        }
    }

    const resetGameBoard = () => {
        for (let i = 0; i < 9; i++) {
            boardHtml[i].innerText = "";
        }
        markerChoicesHtml.forEach(choice => {
            choice.style.display = "initial";
        })
        playerChoicesHtml.forEach(choice => {
            choice.style.display = "initial";
        })
    }

    const stopGame = (square, win) => {
        if (win) { 
            square.removeEventListener("click", squareClick);
            console.log("Stopgame");
        }   
    }

    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    const computerMove = (computerMarker) => {
        let num = getRandomIntInclusive(0, 8); 
        let gameCount = GameBoard.getGameCount();
        while (GameBoard.gameArray[num][0] != "free" && gameCount < 5) {
            num = getRandomIntInclusive(0, 8);
        }
        if (gameCount < 5) {
            GameBoard.gameArray[num][0] = "taken";
            GameBoard.gameArray[num][1] = computerMarker;
            DisplayController.boardHtml[num].innerText = computerMarker;
        }
    }
    
    return {
        hidePlayerChoice,
        hideMarkerChoice,
        placeMarker,
        startGame,
        changePlayer2Name,
        resetGameBoard,
        stopGame,
        computerMove,
        boardHtml,
        markerChoicesHtml,
        playerChoicesHtml,
        player2InfoHtml,
        infoHtml
    }
})();                                              


const PlayGame = (() => {

    // First displayed choice
    DisplayController.playerChoicesHtml.forEach(choice => { 
        choice.addEventListener("click", () => {
            Players.player2Choice = choice.id.toLowerCase();
            console.log(Players.player2Choice);
            DisplayController.hidePlayerChoice();
            DisplayController.startGame();
            Players.player1 = Players.playerFactory("player1", "x");
            Players.player2 = Players.playerFactory(Players.player2Choice, "o");
            DisplayController.changePlayer2Name(Players.player2Choice);
        })
    })


    DisplayController.boardHtml.forEach((square, index) => {
                square.addEventListener("click", () => {
                    if (GameBoard.gameArray[index][0] == "free") {
                        let gameCount = GameBoard.getGameCount();
                        if (Players.player1.marker.includes("x") && (gameCount % 2 === 0 || gameCount === 0)) {
                            DisplayController.placeMarker(Players.player1.marker, index, square);
                            GameBoard.setGameCount();
                        } 
                        
                        Win.checkWin();
                    }
                })
            
    })
})();