// Not 0 since this messes up JS comparison operator
const PLAYER = 1;
const BOT = 2;

const NUMBER_OF_ROWS = 6; 
const NUMBER_OF_COLUMNS = 7;

var gameOver = false; // used to keep track of when the game has ended
var currentPlayer = PLAYER;  //Keeps track of whos go it is
var currentColumns = [5, 5, 5, 5, 5, 5, 5]; // What height of each column is at 

export function setGame() {
    const initialBoard = [];
    
    //Make a 2 dimensional array for the game board
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        const row = [];
        
        for (let col = 0; col < NUMBER_OF_COLUMNS; col++) {
            row.push(null);
        }
        initialBoard.push(row);
    }
    return initialBoard;
}

export function checkForWinner(board) {
    //Check horizontal
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        for (let col = 0; col < NUMBER_OF_COLUMNS - 3; col++){
           if (board[row][col]) {
               if (board[row][col] === board[row][col + 1] && board[row][col + 1] === board[row][col + 2] && board[row][col + 2] === board[row][col + 3]) {
                    return [row, col];
               }
           }
        }
   }

   //Check vertical
   for (let col = 0; col < NUMBER_OF_COLUMNS; col++) {
       for (let row = 0; row < NUMBER_OF_ROWS - 3; row++) {
           if (board[row][col]) {
               if (board[row][col] === board[row + 1][col] && board[row + 1][col] === board[row + 2][col] && board[row + 2][col] === board[row + 3][col]) {
                    return [row, col];
               }
           }
       }
   }

   // check anti diagonal
   for (let row = 0; row < NUMBER_OF_ROWS - 3; row++) {
       for (let col = 0; col < NUMBER_OF_COLUMNS - 3; col++) {
           if (board[row][col]) {
               if (board[row][col] === board[row + 1][col + 1] && board[row + 1][col + 1] === board[row + 2][col + 2] && board[row + 2][col + 2] === board[row + 3][col + 3]) {
                    return [row, col];
               }
           }
       }
   }

   // check diagonal
   for (let row = 3; row < NUMBER_OF_ROWS; row++) {
       for (let col = 0; col < NUMBER_OF_COLUMNS - 3; col++) {
           if (board[row][col]) {
               if (board[row][col] === board[row - 1][col + 1] && board[row - 1][col + 1] === board[row - 2][col + 2] && board[row - 2][col + 2] === board[row - 3][col + 3]) {
                    return [row, col];
               }
           }
       }
   }
    //Game is still in play, neither player has met the winning constraint yet
    return false;
}

export function renderBoard(board, functionToRun) {
    const cells = [];

    const handleSetPiece = (event) => {
        functionToRun(board, event.target.id.split("-"));
    }
       
    //For each cell, create a div element, css styling makes it a circle
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        for (let col = 0; col < NUMBER_OF_COLUMNS; col++) {
            const cellId = `${row}-${col}`;
            cells.push(<div key={cellId} id={cellId} className="tile" onClick={handleSetPiece}></div>);
        }
    }
    return cells;
}

export function setPiece(board, coords) {
    if (gameOver) {
        return;
    }

    // Get row and column of item pressed
    let row = parseInt(coords[0]);
    let col = parseInt(coords[1]);
    
    // Find the row number in the column the item needs to be pressed on
    row = currentColumns[col]; 

    //Returns if the column is already full
    if (row < 0) {
        return;
    }

    //Update the board to reflect the adding of the piece
    board[row][col] = currentPlayer; 

    let tile = document.getElementById(row.toString() + "-" + col.toString());
    
    if (currentPlayer === PLAYER) {
        tile.classList.add("red-piece");
        currentPlayer = BOT;
    } else {
        tile.classList.add("yellow-piece");
        currentPlayer = PLAYER;
    }

    row--; //Decrement the new column height to reflect the adding of the disk
    currentColumns[col] = row; //update the array

    
    let winningCoordinate = checkForWinner(board); //if a player has won, it returns coordinates, otherwise false.
    if (winningCoordinate){ //This code checks to see who has won
        
        gameOver = true; //Makes it so that once the game has finshed, the game cannot continue
        row = winningCoordinate[0];
        col = winningCoordinate[1];

        if (board[row][col] === PLAYER) {
            //the player has won
            console.log("PLAYER WINS");
        } else if (board[row][col] === BOT) {
            //The bot has won
            console.log("BOT WINS");
        }
    }
    return;
}