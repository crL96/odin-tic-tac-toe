const game = (function() {
    const players = [createPlayer("Carl", "X"), createPlayer("John", "O")];
    let currentPlayer = players[0];

    const nextTurn = function() {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        }
        checkResult();
        console.log(gameboard.get());
        console.log("Players turn: " + currentPlayer.name);
    }

    const makeMove = function(index) {
        if (gameboard.getBox(index) === "") {
            gameboard.update(index, currentPlayer.icon);
            nextTurn();
        }
        else {
            console.log("Already chosen, choose another one");
        }
    }

    const checkResult = function() {
        currentBoard = gameboard.get();

        if (checkWinHori(currentBoard) === true || checkWinVert(currentBoard) === true || checkWinDiag(currentBoard) === true) {
            console.log("Game has been won!")
        }
    }

    const checkWinHori = function(currentBoard) {
        for (let i = 0; i < 7; i += 3) {
            if (currentBoard[i] === "") {
            }
            else if (currentBoard[i] === currentBoard[i+1] && currentBoard[i+1] === currentBoard[i+2]) {
                return true;
            }
        }
    }

    const checkWinVert = function(currentBoard) {
        for (let i = 0; i < 3; i++) {
            if (currentBoard[i] === "") {
            }
            else if (currentBoard[i] === currentBoard[i+3] && currentBoard[i+3] === currentBoard[i+6]) {
                return true;
            }
        }
    }

    const checkWinDiag = function(currentBoard) {
        if (currentBoard[4] === "") {
        }
        else if (currentBoard[0] === currentBoard[4] && currentBoard[4] === currentBoard[8]) {
            return true;
        }
        else if (currentBoard[2] === currentBoard[4] && currentBoard[4] === currentBoard[6]) {
            return true;
        }
    }

    return {makeMove};
})();



const gameboard = (function() {
    board = ["", "", "", "", "", "", "", "", ""];
    
    update = function(index, icon) {
        board[index] = icon;
    }
    
    get = function() {
        return board;
    }

    getBox = function(index) {
        return board[index];
    }
    
    return {get, update, getBox};
})();



// const player = (function() {
//     const create = function(name, icon) {
//         return {name, icon};
//     }
    
//     return {create};
// })();

function createPlayer(name, icon) {
    return {name, icon}
}
// game.makeMove(0);
// game.makeMove(8);
// game.makeMove(3);
// game.makeMove(4);
// game.makeMove(6);


console.log(gameboard.get());