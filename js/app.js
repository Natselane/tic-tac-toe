const gameBoard = (() => {
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

const displayController = (() => {
    // Make a player
    const playerFactory = (name, marker) => {
        return { name, marker };
    };

    let player; 
    let computer;


    // Select choice buttons
    let choicesHtml = document.querySelectorAll(".choice");
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

            let boardHtml = document.querySelectorAll(".game-table td");
            boardHtml.forEach((square, index) => {
                square.addEventListener("click", () => {
                gameBoard.gameArray[index][0] = "taken";
                gameBoard.gameArray[index][1] = player.marker;
                square.innerText = player.marker;
                })
            })
        })
    });  
    
    console.log({player, computer});
    
})();

 