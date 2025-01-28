//Player Module
const player = (function() {
    const create = function(name, icon) {
        return {name, icon};
    }
    
    const playerList = [create("Player 1", "X"), create("Player 2", "O")]

    const changeName = function(index) {
        const newNameEl = document.querySelector("#newName");
        const newNameVal = newNameEl.value;
        if (!(newNameVal === "")) {
            playerList[index].name = newNameVal;
            newNameEl.value = "";
            game.init();
        }
    }

    return {create, playerList, changeName};
})();



// Game Module
const game = (function() {
    let currentPlayer = player.playerList[0];

    const init = function() {
        gui.renderBoard();
        gui.renderTurnDisp(`It's ${currentPlayer.name}'s turn`);
    }

    const reset = function() {
        gameboard.reset();
        currentPlayer = player.playerList[0];
        init();
    }

    const newTurn = function() {
        gui.renderBoard();
        if (checkGameWin() === true) {
            gui.renderTurnDisp(currentPlayer.name + " won the game!");
        }
        else {
            if (currentPlayer === player.playerList[0]) {
                currentPlayer = player.playerList[1];
            } else {
                currentPlayer = player.playerList[0];
            }
            gui.renderTurnDisp(`It's ${currentPlayer.name}'s turn`);
        }
    }

    const makeMove = function(index) {
        if (gameboard.getBox(index) === "") {
            gameboard.update(index, currentPlayer.icon);
            newTurn();
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

    return {makeMove, init, reset};
})();



// Gameboard Module
const gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];
    
    update = function(index, icon) {
        board[index] = icon;
    }
    
    get = function() {
        return board;
    }

    getBox = function(index) {
        return board[index];
    }

    reset = function() {
        board = ["", "", "", "", "", "", "", "", ""];
    }
    
    return {get, update, getBox, reset};
})();



// GUI Module
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
            },{once: true});
        });
    }

    const renderTurnDisp = function(message) {
        const turnDisplay = document.querySelector("#turnDisplay");
        turnDisplay.textContent = message;
    }   

    //Change name buttons
    const changeNameBtn0 = document.querySelector("#nameBtn0");
    changeNameBtn0.addEventListener("click", () => {
        player.changeName(0);
    });

    const changeNameBtn1 = document.querySelector("#nameBtn1");
    changeNameBtn1.addEventListener("click", () => {
        player.changeName(1);
    });

    // New game button
    const newGameBtn = document.querySelector("#newGameBtn");
    newGameBtn.addEventListener("click", () => {
        game.reset();
    });

    return {renderBoard, renderTurnDisp};
})();

game.init();