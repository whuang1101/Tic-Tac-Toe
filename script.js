const board = (() => {
    let realBoard = 
    [["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"]];
    let row = -1;
    let column = -1;
    const getPosition = (chip) => {
        row = 0;
        column = 0;
        let box = document.querySelector(".tic-tac-toe-box");
        box.addEventListener("click", (event) => {
            let classes = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
            if(event.target.classList.value === "one"){
                event.target.innerHTML = chip;
            }
        })
    }
    const makeMove = (chip) => {
        if(row >-1 && column > -1){
        if(realBoard[row][column] !== "x" && realBoard[row][column] !== "y" ){
            realBoard[row][column] = chip
        }
     }
    }
    return {realBoard,makeMove, getPosition, row, column};
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
    playGame();
})
function playGame(){
    let gameBoard = board;
    let player1 = Player("x");
    let player2 = Player("o");
    board.getPosition(player1.chip);
    board.makeMove(player1.chip);
}
