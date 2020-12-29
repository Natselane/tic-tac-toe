const GameBoard = (() => {
    let gameArray = {
        0: ["free", "o"],
        1: ["free", "x"],
        2: ["free", "x"],
        3: ["free", ""],
        4: ["free", ""],
        5: ["free", ""],
        6: ["free", ""],
        7: ["free", ""],
        8: ["free", ""],
    }

    return {
        gameArray
    };
})();

const DisplayController = (() => {
    // Make a player
    const playerFactory = (name, marker) => {
        return { name, marker };
    };

    let player; 
    let computer;
    let gameCount = 0;

    const placeMarker = (playerMarker, index, square) => {
        GameBoard.gameArray[index][0] = "taken";
        GameBoard.gameArray[index][1] = player.marker;
        square.innerText = player.marker;
    };

    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    };

    const computerMove = (computerChoice) => {
        let num = getRandomIntInclusive(0, 8); 
        // if (GameBoard.gameArray[num][0] == "free") {
        //     GameBoard.gameArray[num][0] = "taken";
        //     GameBoard.gameArray[num][1] = computer.marker;
        //     boardHtml[num].innerText = computer.marker;
        // };

        while (GameBoard.gameArray[num][0] != "free" && gameCount != 4) {
            num = getRandomIntInclusive(0, 8);
        }
        if (gameCount < 4) {
            GameBoard.gameArray[num][0] = "taken";
            GameBoard.gameArray[num][1] = computer.marker;
            boardHtml[num].innerText = computer.marker;
        };
        

        console.log(num);
    }
    
    const boardHtml = document.querySelectorAll(".game-table td");

    // Select choice buttons
    let choicesHtml = document.querySelectorAll(".choice");
    let startHtml = document.querySelector("#start");
    // Start game
    choicesHtml.forEach(choice => {
        choice.addEventListener("click", () => {
            player = playerFactory("player", choice.id);
            let computerChoice;
            if (choice.id == "x") {
                computerChoice = "o";
            } else {
                computerChoice = "x";
            }
            computer = playerFactory("computer", computerChoice);
            console.log({player, computer});
            boardHtml.forEach((square, index) => {
                square.addEventListener("click", () => {
                placeMarker(player.marker, index, square);
                computerMove(computerChoice);
                
                gameCount += 1;
                console.log({gameCount});
            })
            })
        })
    });  
    
    return {
        player
    };
    
})();

 