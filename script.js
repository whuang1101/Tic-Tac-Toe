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
                if((i === 0 && j === 2) || (i === 2 && j === 0) || (i ===1 && j === 0)){
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
    const resetBoard = () => {
        board.realBoard = [["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"]];
    }
    const checkForDraw = () => {
        let a = 0;
        for(let i = 0; i < board.realBoard.length; i ++){
            for(let j = 0; j < board.realBoard[i].length; j++){
                if(board.realBoard[i][j] === "-"){
                    a += 1;
                }
            }
        }
        if(a ===0){
            return true;
        }
        else{
        return false;
        }
    }
    const checkFullBoard = () => {
        let a = 0;
        for(let i = 0; i < board.realBoard.length; i ++){
            for(let j = 0; j < board.realBoard[i].length; j++){
                if(board.realBoard[i][j] !== "-"){
                    a += 1;
                }
            }
        }
        if(a === 9){
            return true;
        }
        else{
            return false;
        }
    } 
    return {realBoard, checkWin, row, column, resetBoard, checkForDraw, checkFullBoard};
})();
const Player = (chip) => {
    let score = 0;
    const scoreCounter = () => {
        score ++;
    }
    return{chip, score}
}


let gameBoard = board;
let counter = 1;
let submit = document.querySelector(".submit")
let playerTwo = " ";
let human = document.querySelector(".player-two");
let ai = document.querySelector(".AI-two");
human.addEventListener("click", () => {
    human.classList.add("green");
    ai.classList.remove("green");
})
ai.addEventListener("click", () => {
    ai.classList.add("green");
    human.classList.remove("green");
})
submit.addEventListener("click", () => {
    if(human.classList.contains("green")){
        playerTwo = "human"
    }
    else if(ai.classList.contains("green")){
        playerTwo = "ai"
    }
    if(playerTwo === "human"){
    playHumanGame(gameBoard);
    let selection = document.querySelector(".player-selection-screen");
    let gameWindow = document.querySelector(".game-window");
    selection.classList.add("hide");
    gameWindow.classList.remove("hide");
    }
    else if(playerTwo === "ai"){
    playVsAi(gameBoard);
    let selection = document.querySelector(".player-selection-screen");
    let gameWindow = document.querySelector(".game-window");
    selection.classList.add("hide");
    gameWindow.classList.remove("hide");
    }
});

// Setting up reset button 
let restart =document.querySelector(".restart");
restart.addEventListener("click", () => {
    resetGame(gameBoard);
});
function playHumanGame(gameBoard){
    let player1 = Player("x");
    let player2 = Player("o");
    placeTics(gameBoard,player1.chip,player2.chip,counter);
    
}
function playVsAi(gameBoard){
    let player1 = Player("x");
    placeTicsAI(gameBoard,player1.chip)
}

function placeTics(gameBoard, player1, player2, counter) {
let chip = "";
let box = document.querySelector(".tic-tac-toe-box");
let playerDisplay = document.querySelector(".which-player");

function handleBoxClick(event) {
    let classes = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    let classValue = event.target.classList.value;
    let index = classes.indexOf(classValue);
    
    if (index > -1 && !gameBoard.checkWin()) {
        let winner = " ";
        let row = Math.floor(index / 3);
        let column = index % 3;
        
        if (gameBoard.realBoard[row][column] !== "x" && gameBoard.realBoard[row][column] !== "o") {
            if (counter % 2 === 1) {
            chip = player1;
            playerDisplay.innerHTML = "Player 2's Turn(O):";
        } else if (counter % 2 === 0) {
            chip = player2;
            playerDisplay.innerHTML = "Player 1's Turn(X):";
        }
        gameBoard.realBoard[row][column] = chip;
        }
        
        event.target.innerHTML = chip;
        event.target.classList.add("animation");
        checkWinner(gameBoard, chip, false);
    }
    counter += 1;
    console.log(counter);
    if (gameBoard.checkWin()) {
        box.removeEventListener("click", handleBoxClick);
    }
    }

    box.addEventListener("click", handleBoxClick);
}  
function resetGame (gameBoard){
    gameBoard.resetBoard();
    let classes = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    classes.forEach((element) =>{
        let remover = document.querySelector("." + element);
        remover.innerHTML = "";
        remover.classList.remove("animation");
    })
    let playerSelection = document.querySelector(".player-selection-screen");
    let resultScreen = document.querySelector(".result-screen");
    playerSelection.classList.remove("hide");
    resultScreen.classList.add("hide");
    counter = 1;
}
function checkWinner (gameBoard,chip,ai) {
    if(gameBoard.checkWin()) {
        if(ai) {
            winner = "AI WINS!";
        }
        else if(chip === "x"){
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
        let playerDisplay = document.querySelector(".which-player");
        playerDisplay.innerHTML =  "Player 1's Turn(X):";
    }
    if(gameBoard.checkForDraw()){
        let gameWindow = document.querySelector(".game-window");
        let resultWindow = document.querySelector(".result-screen");
        let result = document.querySelector(".result");
        result.innerHTML = "DRAW";
        gameWindow.classList.add("hide");
        resultWindow.classList.remove("hide");
    }
}
function placeTicsAI (gameBoard, player1){
    let box = document.querySelector(".tic-tac-toe-box");
    let playerDisplay = document.querySelector(".which-player");
    
    function handleBoxClick(event) {
        let classes = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        let classValue = event.target.classList.value;
        let index = classes.indexOf(classValue);
        let check = 1;
        if (index > -1 && !gameBoard.checkWin()) {
            let row = Math.floor(index / 3);
            let column = index % 3;
            playerDisplay.innerHTML = "Player 1's Turn(X):";
            event.target.innerHTML = "x";
            event.target.classList.add("animation");
            gameBoard.realBoard[row][column] = "x";
            checkWinner(gameBoard, player1,false);
            if(!gameBoard.checkFullBoard() && !gameBoard.checkWin()){
            while(true){
                let randomNumber = Math.floor(Math.random() * 9);
                let randomDiv = document.querySelector("." + classes[randomNumber]);
                let newIndex = classes.indexOf(classes[randomNumber]);
                let newRow = Math.floor(newIndex / 3);
                let newColumn = newIndex % 3;
                gameBoard.realBoard[newRow][newColumn] = "o";

                if(randomDiv.innerHTML !== "x" && randomDiv.innerHTML !== "o"){
                    setTimeout(function() {
                        playerDisplay.innerHTML = "Player 1's Turn(X):";
                        randomDiv.innerHTML = "o";
                        randomDiv.classList.add("animation");
                        checkWinner(gameBoard, "o", true);
                    }, 2000);
                    check = 2;
                    console.log("yes");
                    playerDisplay.innerHTML = "AI's Turn(O)";
                    break;
                }
            }
            }
        }
        if (gameBoard.checkWin()) {
            box.removeEventListener("click", handleBoxClick);
        }
        }
    
        box.addEventListener("click", handleBoxClick);

}

function minimax(realBoard){
    return 1;
}