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

    return {realBoard, getPosition, row, column};
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
function playGame(gameBoard){
    let player1 = Player("x");
    let player2 = Player("o");
    gameBoard.getPosition(player1.chip);
    
}
