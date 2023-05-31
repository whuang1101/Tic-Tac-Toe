const board = (() => {
    let realBoard = 
    [["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"]];
    let row = -1;
    let column = -1;
    const checkWin = () => {
        let chip1AcrossRight = 0;
        let chip2AcrossRight = 0;
        let chip1AcrossLeft = 0;
        let chip2AcrossLeft = 0;
        for(let i = 0; i < board.realBoard.length; i ++){
            let chip1 = "x";
            let chip2 = "o";
            let chip1ColumnCounter = 0;
            let chip2ColumnCounter = 0;
            let chip1RowCounter = 0;
            let chip2RowCounter = 0;
            for (let j = 0; j < board.realBoard[i].length; j++){
                if (board.realBoard[i][j] === "x"){
                     chip1ColumnCounter += 1;
                }
                else if (board.realBoard[i][j] === "o"){
                    chip2ColumnCounter += 1;
                }
                if (board.realBoard[j][i] === "x"){
                    chip1RowCounter += 1;
                }
                else if(board.realBoard[j][i] === "o"){
                    chip2RowCounter += 1;
                }
                if(i === j ){
                    if(board.realBoard[i][j] === "x"){
                        chip1AcrossRight += 1;
                    }
                    else if(board.realBoard[i][j] === "o"){
                        chip2AcrossRight +=1;
                    }
                }
                if((i === 0 && j === 2) || (i === 2 && j === 0) || (i ===1)){
                    if(board.realBoard[i][j] === "x"){
                        chip1AcrossLeft += 1;
                    }
                    else if(board.realBoard[i][j] === "o"){
                        chip2AcrossLeft +=1;
                    }
                }
            }
            if(chip1ColumnCounter === 3 || chip1RowCounter === 3 || chip1AcrossRight === 3 ||  chip1AcrossLeft === 3){
                return true;
            }
            else if (chip2ColumnCounter === 3 || chip2RowCounter === 3 || chip2AcrossRight== 3 ||  chip2AcrossLeft === 3){
                return true;
            }
        }
        return false;
        
    }
    return {realBoard, checkWin, row, column};
})();
const Player = (chip) => {
    let score = 0;
    const scoreCounter = () => {
        score ++;
    }
    return{chip, score}
}



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
    
    if (index > -1 && !gameBoard.checkWin()) {
        let winner = " ";
        let row = Math.floor(index / 3);
        let column = index % 3;
        if (gameBoard.realBoard[row][column] !== "x" && gameBoard.realBoard[row][column] !== "o") {
            if (counter === 9){
                chip = player1;
                playerDisplay.innerHTML = "Draw"
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
        if(gameBoard.checkWin()) {
            if(chip === "x"){
                winner = "Player 1 Wins!";
            }
            else if(chip === "o"){
                winner ="Player 2 Wins!";
            }
            let gameWindow = document.querySelector(".game-window");
            let resultWindow = document.querySelector(".result-screen");
            let result = document.querySelector(".result");
            result.innerHTML = winner;
            gameWindow.classList.add("hide");
            resultWindow.classList.remove("hide");
        }
    }
    counter ++;
    })
}
