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
    };

    let gameCount = 0;

    const setGameCount = () => {
        gameCount++;
    };

    const getGameCount = () => {
        return gameCount;
    };

    return {
        gameArray,
        gameCount,
        getGameCount,
        setGameCount
    };
})();

const WinningPatterns = (() => {
    let patterns = {
        0: [0, 1, 2],
        1: [0, 3, 6],
        2: [0, 4, 8],
        3: [1, 4, 7],
        4: [2, 4, 6],
        5: [2, 5, 8],
        6: [3, 4, 5],
        7: [6, 7, 8]
    };

    let checkWin = () => {
        for (let i = 0; i < 8; i++) {
            if (GameBoard.gameArray[patterns[i][0]][1] == "o" && GameBoard.gameArray[patterns[i][1]][1] == "o" && GameBoard.gameArray[patterns[i][2]][1] == "o") {
                console.log("3 times o");
            } else if (GameBoard.gameArray[patterns[i][0]][1] == "x" && GameBoard.gameArray[patterns[i][1]][1] == "x" && GameBoard.gameArray[patterns[i][2]][1] == "x") {
                console.log("3 times x");
            };
        };
    };

    return {
        patterns,
        checkWin
    };
})();

const Players = (() => { 
    const playerFactory = (name, marker) => {
        return { name, marker };
    };

    const computerChoice = (playerChoice) => {
        if (playerChoice == "x") {
            return "o";
        } else {
            return "x";
        };
    };

    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    };

    const computerMove = (computerMarker) => {
        let num = getRandomIntInclusive(0, 8); 
        let gameCount = GameBoard.getGameCount();
        while (GameBoard.gameArray[num][0] != "free" && gameCount < 5) {
            num = getRandomIntInclusive(0, 8);
        };
        if (gameCount < 5) {
            GameBoard.gameArray[num][0] = "taken";
            GameBoard.gameArray[num][1] = computerMarker;
            DisplayController.boardHtml[num].innerText = computerMarker;
        };
    };

    return {
        playerFactory,
        computerChoice,
        computerMove
    };
})();

const DisplayController = (() => {
    const boardHtml = document.querySelectorAll(".game-table td");
    const choicesHtml = document.querySelectorAll(".choice");
    const startHtml = document.querySelector("#start");

    let gameCount = GameBoard.getGameCount();
    const placeMarker = (playerMarker, index, square) => {
        if (gameCount < 6) {
            GameBoard.gameArray[index][0] = "taken";
            GameBoard.gameArray[index][1] = playerMarker;
            square.innerText = playerMarker;
        };
    };

    const startGame = () => {
        choicesHtml.forEach(choice => {
            choice.style.display = "none";
        });
        startHtml.style.display = "none";
    };
    
    return {
        placeMarker,
        startGame,
        boardHtml,
        choicesHtml,
        startHtml
    };
})();

const PlayGame = (() => {
    let player; 
    let computer;
    let computerChoice;

    DisplayController.choicesHtml.forEach(choice => {
        choice.addEventListener("click", () => {
            player = Players.playerFactory("player", choice.id);
            computerChoice = Players.computerChoice(choice.id);
            computer = Players.playerFactory("computer", computerChoice);

            DisplayController.startHtml.addEventListener("click", () => {
                DisplayController.startGame();
            })


            DisplayController.boardHtml.forEach((square, index) => {
                square.addEventListener("click", () => {
                    if (GameBoard.gameArray[index][0] == "free") {
                        GameBoard.setGameCount();
                        DisplayController.placeMarker(player.marker, index, square);
                        Players.computerMove(computerChoice, computer.marker);
                        WinningPatterns.checkWin();
                    };
                });
            });
        });
    });     
})();