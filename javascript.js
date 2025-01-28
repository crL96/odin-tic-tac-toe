const game = (function() {
    const players = [createPlayer("Carl", "X"), createPlayer("John", "O")];
    let currentPlayer = players[0];

    const newTurn = function() {
        gui.renderBoard();
        if (checkGameWin() === true) {
            gui.renderTurnDisp(currentPlayer.name + " won the game!");
        }
        else {
            if (currentPlayer === players[0]) {
                currentPlayer = players[1];
            } else {
                currentPlayer = players[0];
            }
            gui.renderTurnDisp(`It's ${currentPlayer.name}'s turn!`);
        }
    }

    const makeMove = function(index) {
        if (gameboard.getBox(index) === "") {
            gameboard.update(index, currentPlayer.icon);
            newTurn();
        }
        else {
            console.log("Already chosen, choose another one");
        }
    }

    const checkGameWin = function() {
        currentBoard = gameboard.get();

        if (checkWinHori(currentBoard) === true || checkWinVert(currentBoard) === true || checkWinDiag(currentBoard) === true) {
            return true;
        } else {
            return false;
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
    const board = ["", "", "", "", "", "", "", "", ""];
    
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


const gui = (function() {

    const renderBoard = function() {
        const boardEl = document.querySelector("#gameboard");
        boardEl.replaceChildren();
        
        const currentBoard = gameboard.get();
        currentBoard.forEach((item, index) => {
            const boardSquare = document.createElement("div")
            boardSquare.classList.add("boardSquare");
            boardSquare.setAttribute("ID", index);
            boardSquare.textContent = item;
            boardEl.appendChild(boardSquare);

            boardSquare.addEventListener("click", (e) => {
                game.makeMove(e.target.id);
            });
        });
    }

    const renderTurnDisp = function(message) {
        const turnDisplay = document.querySelector("#turnDisplay");
        turnDisplay.textContent = message;
    }

    return {renderBoard, renderTurnDisp};
})();

gui.renderBoard();