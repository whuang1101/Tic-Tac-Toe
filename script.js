const board = (() => {
    let realBoard = 
    [["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"]];
    let row = -1;
    let column = -1;
    const getPosition = (chip) => {
        let box = document.querySelector(".tic-tac-toe-box");
        box.addEventListener("click", (event) => {
            let classes = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        let classValue = event.target.classList.value;
        let index = classes.indexOf(classValue);
        
        if (index > -1) {
            let row = Math.floor(index / 3);
            let column = index % 3;
            
            event.target.innerHTML = chip;
            event.target.classList.add("animation");
            
            if (board.realBoard[row][column] !== "x" && board.realBoard[row][column] !== "y") {
                board.realBoard[row][column] = chip;
            }
        }

        })
    }
    const checkWin = () => {
        return false;
    }
    return {realBoard, getPosition, checkWin, row, column};
})();
const Player = (chip) => {
    let score = 0;
    const scoreCounter = () => {
        score ++;
    }
    return{chip, score}
}

// Click on box to place x or o


let submit = document.querySelector(".submit")
submit.addEventListener("click", () => {
    let selection = document.querySelector(".player-selection-screen");
    let gameWindow = document.querySelector(".game-window");
    selection.classList.add("hide");
    gameWindow.classList.remove("hide");
    playGame(gameBoard);
})
let gameBoard = board;
let counter = 1;
function playGame(gameBoard){
    let player1 = Player("x");
    let player2 = Player("o");
    placeTics(gameBoard,player1.chip,player2.chip,counter);
    
}

function placeTics(gameBoard, player1, player2,counter){
    let chip = "";
    let box = document.querySelector(".tic-tac-toe-box");
    let playerDisplay = document.querySelector(".which-player")
    box.addEventListener("click", (event) => {
    let classes = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    let classValue = event.target.classList.value;
    let index = classes.indexOf(classValue);
    
    if (index > -1) {
        let row = Math.floor(index / 3);
        let column = index % 3;
        if (gameBoard.realBoard[row][column] !== "x" && gameBoard.realBoard[row][column] !== "o") {
            if (counter === 9){
                chip = player1;
                playerDisplay.innerHTML = "Draw"
                playerDisplay.classList.add("draw-animation");
            }
            else if (counter%2 === 1){
                chip = player1;
                playerDisplay.innerHTML = "Player 2's Turn(O):"
            }
            else if (counter %2 === 0 ){
                chip = player2;
                playerDisplay.innerHTML = "Player 1's Turn(X):"
            }
            
            gameBoard.realBoard[row][column] = chip;
        }
        event.target.innerHTML = chip;
        event.target.classList.add("animation");
    }
    counter ++;
    })
}