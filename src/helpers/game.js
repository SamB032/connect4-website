import {easyBotPredict} from "./easybot";
import {runMinimax} from "./minimax";
import {checkForWinner, boardContainsNull} from "./SharedBotCode";

class Game {

    static PLAYER = 1; //Identifies player on the board
    static BOT = 2; //Identifies the bot on the board
    static DRAW = 3; //Identifies when the game has ended

    static NUMBER_OF_ROWS = 6; 
    static NUMBER_OF_COLUMNS = 7;

    static MEDIUM_DEPTH = 2; // Minimax algorithm only looks 2 moves ahead for medium difficulty
    static HARD_DEPTH = 7; // Minimax algorithm looks 7 moves ahead for hard difficulty

    //Takes param of difficulty, this helps it choose the correct bot
    constructor(difficulty, handleOpenModal) {
        //Set the game up

        this.board = [];
        
        this.handleOpenModal = handleOpenModal;
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

    /* Loads the difficulty based on the input from the gameBoard page, this create a varible
    Pointing to a function with the relevent parameters. All we do is call the function with the parameters 
    and it will turn the bots chosen column */
    LoadBot(difficulty){
        switch(difficulty){
            case "easy":
                this.botPredict = easyBotPredict;
                break;
            case "medium":
                this.botPredict = runMinimax;
                this.depth = Game.MEDIUM_DEPTH;
                break;
            case "hard":
                this.botPredict = runMinimax;
                this.depth = Game.HARD_DEPTH;
                break;
            default:
                console.error("Error: bot difficulty not found");
                break;
        }
    };

    //Returns the column chosen by the bot
    makebotPredition() {
        return this.botPredict(this.board, this.depth);
    };

    //Returns rendered cells
    renderBoard() {
        const cells = [];

        const processEvent = (event) => {
            if (!this.gameOver && this.currentPlayer === Game.PLAYER){
                this.setPiece(event.target.id.split("-"))
            } else {
                event.stopPropagation(); // Stop the event from propagating further
                event.preventDefault(); // Prevent the default behavior of the event
            }
        }

        //For each cell, create a div element, css styling makes it a circle
        for (let row = 0; row < Game.NUMBER_OF_ROWS; row++) {
            for (let col = 0; col < Game.NUMBER_OF_COLUMNS; col++) {
                const cellId = `${row}-${col}`;
                cells.push(<div 
                    key={cellId} 
                    id={cellId} 
                    className="tile" 
                    onClick={processEvent}>
                    </div>);
                // The onclick will send the coordinate to the div pressed to setPiece() method
            }
        }
        return cells;
    };

    //Method runs when the player has chosen a space, the program will process these action, then the bots
    setPiece(coords) {
        // Get column of item pressed
        let winningCoordinate;
        let col = parseInt(coords[1]);
        this.updatePiece(col);
        
        winningCoordinate = this.checkForWinner(); //returns the coordinates a the winning 4 in a row
        
        if (Array.isArray(winningCoordinate)) {
            //Coordainte is returned from checkForWinner method, so we call the method to process this event
            this.hasWinner(winningCoordinate);
        } else if (winningCoordinate === Game.DRAW) {  
            //Game is complete, there is no winner
            this.gameHasDraw();

        } else {
            //Bot will play its turn, check to see if the bots move has made it win
            this.updatePiece(this.makebotPredition());
            winningCoordinate = this.checkForWinner(); //returns the coordinates a the winning 4 in a row
            
            if (Array.isArray(winningCoordinate)) {
                this.hasWinner(winningCoordinate);
            } else if (winningCoordinate === Game.DRAW) {  
                //Game is complete, there is no winner
                this.gameHasDraw();
            }
        }
    };

    //Once the player/bot has chosen the column, the program will place the disk
    updatePiece(col){
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
    };

    //A actor has won, this method will to stop the game and display a message
    hasWinner(winningCoordinate){
        this.gameOver = true; //Makes it so that once the game has finshed, the game cannot continue
        let row = winningCoordinate[0];
        let col = winningCoordinate[1];

        
        let winningPlayer = this.coordinateOwnership(row, col);
        // mongoWrite({"Winning Player": winningPlayer});

        if (winningPlayer === Game.PLAYER) {
            //the player has won
            this.handleOpenModal("Win", "You were able to make 4 in a row");
        } else if (winningPlayer === Game.BOT) {
            //The bot has won
            this.handleOpenModal("Loss", "The bot was able to make a 4 in a row");
        }
    };

    gameHasDraw() {
        this.gameOver = true; //Makes it so that once the game has finshed, the game cannot continue
        this.handleOpenModal("Draw", "No player was able to make a 4 in a row");
    }

    // Returns false is there is no winner, else it returns coodinates
    checkForWinner(){
        //Checks to see if the board has no null, if so, reutrn the value of Game.DRAW
        if (!boardContainsNull(this.board, Game.NUMBER_OF_ROWS, Game.NUMBER_OF_COLUMNS)) {
            return Game.DRAW;
        }
        return checkForWinner(this.board, Game.NUMBER_OF_ROWS, Game.NUMBER_OF_COLUMNS);
    };

    //Returns the value of a coordinate
    coordinateOwnership(row, col){
        return this.board[row][col]
    }
}

export default Game;