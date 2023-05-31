class Game {

    static PLAYER = 1;
    static BOT = 2;

    static NUMBER_OF_ROWS = 6; 
    static NUMBER_OF_COLUMNS = 7;

    constructor() {
        //Set the game up

        this.board = [];

        this.currentColumns = [5, 5, 5, 5, 5, 5, 5];
        this.gameOver = false; // used to keep track of when the game has ended
        this.currentPlayer = Game.PLAYER;  //Keeps track of whos go it is
    
        //Make a 2 dimensional array for the game board
        for (let row = 0; row < Game.NUMBER_OF_ROWS; row++) {
            const newRow = [];
            
            for (let col = 0; col < Game.NUMBER_OF_COLUMNS; col++){
                newRow.push(null);
            }
            this.board.push(newRow);
        }
    }

    //Returns rendered cells
    renderBoard() {
        const cells = [];

        //For each cell, create a div element, css styling makes it a circle
        for (let row = 0; row < Game.NUMBER_OF_ROWS; row++) {
            for (let col = 0; col < Game.NUMBER_OF_COLUMNS; col++) {
                const cellId = `${row}-${col}`;
                cells.push(<div key={cellId} id={cellId} className="tile" onClick={(event) => this.setPiece(event.target.id.split("-"))}></div>);
                // The onclick will send the coordinate to the div pressed to setPiece() method
            }
        }
        return cells;
    };

    setPiece(coords) {
        if (this.gameOver) {
            return;
        }
        
        // Get row and column of item pressed
        let row = parseInt(coords[0]);
        let col = parseInt(coords[1]);
        
        // Find the row number in the column the item needs to be pressed on
        row = this.currentColumns[col]; 
        
        //Returns if the column is already full
        if (row < 0) {
            return;
        }
    
        //Update the board to reflect the adding of the piece
        this.board[row][col] = this.currentPlayer; 
    
        let tile = document.getElementById(row.toString() + "-" + col.toString());

        if (this.currentPlayer === Game.PLAYER) {
            tile.classList.add("red-piece");
            this.currentPlayer = Game.BOT;
        } else {
            tile.classList.add("yellow-piece");
            this.currentPlayer = Game.PLAYER;
        }
    
        row--; //Decrement the new column height to reflect the adding of the disk
        this.currentColumns[col] = row; //update the array
        
        var winningCoordinate = this.checkForWinner(); //if a player has won, it returns coordinates, otherwise false.
        //This code checks to see who has won
        if (winningCoordinate){ 
            this.gameOver = true; //Makes it so that once the game has finshed, the game cannot continue
            row = winningCoordinate[0];
            col = winningCoordinate[1];
    
            if (this.board[row][col] === Game.PLAYER) {
                //the player has won
                console.log("PLAYER WINS");
            } else if (this.board[row][col] === Game.BOT) {
                //The bot has won
                console.log("BOT WINS");
            }
        }
        return;
    };

    checkForWinner(){
        //Check horizontal
        for (let row = 0; row < Game.NUMBER_OF_ROWS; row++) {
            for (let col = 0; col < Game.NUMBER_OF_COLUMNS - 3; col++){
                if (this.board[row][col]) {
                    // if statement evaultes to true if there is a 4 in a row horizontally
                    if (this.board[row][col] === this.board[row][col + 1] && this.board[row][col + 1] === this.board[row][col + 2] && this.board[row][col + 2] === this.board[row][col + 3]) {
                        return [row, col];
                    }
                }
            }
        }

        //Check vertical
        for (let col = 0; col < Game.NUMBER_OF_COLUMNS; col++) {
            for (let row = 0; row < Game.NUMBER_OF_ROWS - 3; row++) {
                if (this.board[row][col]) {
                    // if statement evaultes to true if there is a 4 in a row verical
                    if (this.board[row][col] === this.board[row + 1][col] && this.board[row + 1][col] === this.board[row + 2][col] && this.board[row + 2][col] === this.board[row + 3][col]) {
                        return [row, col];
                    }
                }
            }
        }

        // check anti diagonal
        for (let row = 0; row < Game.NUMBER_OF_ROWS - 3; row++) {
            for (let col = 0; col < Game.NUMBER_OF_COLUMNS - 3; col++) {
                if (this.board[row][col]) {
                    // if statement evaultes to true if there is a 4 in the diagonal (left -> right)
                    if (this.board[row][col] === this.board[row + 1][col + 1] && this.board[row + 1][col + 1] === this.board[row + 2][col + 2] && this.board[row + 2][col + 2] === this.board[row + 3][col + 3]) {
                            return [row, col];
                    }
                }
            }
        }

        // check diagonal
        for (let row = 3; row < Game.NUMBER_OF_ROWS; row++) {
            for (let col = 0; col < Game.NUMBER_OF_COLUMNS - 3; col++) {
                if (this.board[row][col]) {
                    // if statement evaultes to true if there is a 4 in the diagonal (right -> left)
                    if (this.board[row][col] === this.board[row - 1][col + 1] && this.board[row - 1][col + 1] === this.board[row - 2][col + 2] && this.board[row - 2][col + 2] === this.board[row - 3][col + 3]) {
                            return [row, col];
                    }
                }
            }
        }
        //Game is still in play, neither player has met the winning constraint yet
        return false;
    };

    //Returns an array of columns that are not full of disks
    availableColumns(){
        const columnsArr = []

        //Loops through currentColumns and adds the index if the number of free spaces is >= 0
        for (let col = 0; col < Game.NUMBER_OF_COLUMNS; col++){
            if (this.currentColumns[col] >= 0) {
                columnsArr.push(col);
            }
        }
        return columnsArr;
    }
}

export default Game;