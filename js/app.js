let gameArray = ['x', 'x', 'x', 'o', 'o', 'o', 'x', 'x', 'x'];

let squares = document.querySelectorAll("td");

for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = gameArray[i];
}