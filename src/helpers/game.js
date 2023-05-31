import {easyBotPredict} from "./Easybot";
import {hardBotPredict} from "./Hardbot";

class Game {

    static PLAYER = 1;
    static BOT = 2;

    static NUMBER_OF_ROWS = 6; 
    static NUMBER_OF_COLUMNS = 7;

    //Takes param of difficulty, this helps it choose the correct bot
    constructor(difficulty) {
        //Set the game up

        this.board = [];
        
        this.difficulty = difficulty;
        this.LoadBot(difficulty);

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

    //
    LoadBot(difficulty){
        switch(difficulty){
            case "easy":
                this.botPredict = easyBotPredict;
                break;
            case "medium":
                console.log("Pass");
                break;
            case "hard":
                this.botPredict = hardBotPredict;
                break;
            default:
                console.log("Error: bot difficulty not found");
                break;
        }
    };

    makebotPredition() {
        return this.botPredict(this.board);
        // return this.botPredict(this.validCoordinates());
    };

    //Returns rendered cells
    renderBoard() {
        const cells = [];

        //For each cell, create a div element, css styling makes it a circle
        for (let row = 0; row < Game.NUMBER_OF_ROWS; row++) {
            for (let col = 0; col < Game.NUMBER_OF_COLUMNS; col++) {
                const cellId = `${row}-${col}`;
                cells.push(<div 
                    key={cellId} 
                    id={cellId} 
                    className="tile" 
                    onClick={(event) => this.setPiece(event.target.id.split("-"))}>
                    </div>);
                // The onclick will send the coordinate to the div pressed to setPiece() method
            }
        }
        return cells;
    };

    // 
    setPiece(coords) {
        // Get column of item pressed
        let winningCoordinate;
        let col = parseInt(coords[1]);
        this.updatePiece(col);
        
        winningCoordinate = this.checkForWinner(); //returns the coordinates a the winning 4 in a row
        if (winningCoordinate){
            this.hasWinner(winningCoordinate);
        }
        
        //Bot will play its turn, check to see if the bots move has made it win
        this.updatePiece(this.makebotPredition());
        winningCoordinate = this.checkForWinner(); //returns the coordinates a the winning 4 in a row
        if (winningCoordinate){
            this.hasWinner(winningCoordinate);
        }
        return;
    };

    //Once the player/bot has chosen the column, the program will place the disk
    updatePiece(col){
        if (this.gameOver) {
            return -1;
        }

        // Find the row disc needs to be placed on
        let row = this.currentColumns[col]; 
        
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
    }

    //A actor has won, this method will to stop the game and display a message
    hasWinner(winningCoordinate){
        this.gameOver = true; //Makes it so that once the game has finshed, the game cannot continue
        let row = winningCoordinate[0];
        let col = winningCoordinate[1];
    
        let winningPlayer = this.coordinateOwnership(row, col);

        if (winningPlayer === Game.PLAYER) {
            //the player has won
            console.log("PLAYER WINS");
        } else if (winningPlayer === Game.BOT) {
            //The bot has won
            console.log("BOT WINS");
        }
    }

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


    //Returns an 2d array of valid coordinates
    validCoordinates(){
        const coordinates = [];
        
        for (let col = 0; col < Game.NUMBER_OF_COLUMNS; col++){
            let row = this.currentColumns[col];

            if (row >= 0) {
                coordinates.push([row,col]);
            }
        }
        return coordinates;
    }

    //Returns true if a board does have null
    boardHasNull(){
        for (let row = 0; row < Game.NUMBER_OF_ROWS; row++) {
            for (let col = 0; col < Game.NUMBER_OF_COLUMNS; col++) {
                if (this.board[row][col] === null) {
                    return true; // Found a null value, return true
                }
            }
        }
        return false; // No null values found
    }

    coordinateOwnership(row, col){
        if (this.board[row][col] === Game.PLAYER) {
            return Game.PLAYER; //Coordinate belongs to player
        } else if (this.board[row][col] === Game.BOT) {
            return Game.BOT; //Coordinate belongs to bot
        }
        return null;
    }
}

export default Game;