import {checkForWinner, boardContainsNull, getValidCoordinates} from "./SharedBotCode";
import {TranspositionTable} from "./TranspositionTable";

const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLUMNS = 7;

const PLAYER = 1;
const BOT = 2;  
const hashTable = new TranspositionTable(); //Hashmap that speeds up evaluting boards by storing already cacaulates boards and value pairs

//Returns the value of a winnning disc if terminal (defined as having a winning condition or no spaces to play), otherwise return false
function isTerminal(board){
    const hasWinner = checkForWinner(board, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);

    if (hasWinner >= 1 && !boardContainsNull(board, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS)) {
        return board[hasWinner[0]][hasWinner[1]];
    }
    return false;
}

// Assigns a value to when (depth === 0 or isTerminal), this helps the algorithm evalute the "goodness" of one state
function evaluateState(board, winningPlayer) {
    if (winningPlayer === BOT) {
        return Number.MAX_VALUE; // Bot wins - high positive value
    } else if (winningPlayer === PLAYER) {
        return -Number.MAX_VALUE; // Opponent wins - high negative value
    } else {
        //Checks to see if the table is already in the transposition table, if so return the already caculated value
        const tempScore = hashTable.get(board);
        if (tempScore){
            return tempScore;
        }
        
        let score = 0;

        // Evaluate rows
        for (let row = 0; row < NUMBER_OF_ROWS; row++) {
            for (let col = 0; col < NUMBER_OF_COLUMNS - 3; col++) {
                const window = board[row].slice(col, col + 4);
                score += evaluateWindow(window);
            }
        }
    
        // Evaluate columns
        for (let col = 0; col < NUMBER_OF_COLUMNS; col++) {
            for (let row = 0; row < NUMBER_OF_ROWS - 3; row++) {
                const window2 = [
                    board[row][col],
                    board[row + 1][col],
                    board[row + 2][col],
                    board[row + 3][col]
                ];
                score += evaluateWindow(window2);
            }
        }

        // Diagonal from top-left to bottom-right
        for (let row = 0; row < NUMBER_OF_ROWS - 3; row++) {
            for (let col = 0; col < NUMBER_OF_COLUMNS - 3; col++) {
                const window3 = [
                    board[row][col],
                    board[row + 1][col + 1],
                    board[row + 2][col + 2],
                    board[row + 3][col + 3]
                ];
                  const window4 = [
                    board[row][col + 3],
                    board[row + 1][col + 2],
                    board[row + 2][col + 1],
                    board[row + 3][col]
                ];
                
                //Evalute the score for both bot and player
                score += evaluateWindow(window3);
                score += evaluateWindow(window4);
            }
        }

        // Diagonal from top-right to bottom-left
        for (let row = 0; row < NUMBER_OF_ROWS - 3; row++) {
            for (let col = 3; col < NUMBER_OF_COLUMNS; col++) {
                const window5 = [
                    board[row][col],
                    board[row + 1][col - 1],
                    board[row + 2][col - 2],
                    board[row + 3][col - 3]
                ];
        
                const window6 = [
                    board[row][col - 1],
                    board[row + 1][col - 2],
                    board[row + 2][col - 3],
                    board[row + 3][col - 4]
                ];
        
                // Evaluate the score for both bot and player
                score += evaluateWindow(window5);
                score += evaluateWindow(window6);
            }
        }
    hashTable.put(board, score); //Adds the newly caculated score and board to the hashMap
    return score; //Evaluation score for that particular state
    }
}

// Evaluates the array depending on which player has the discs in sequence
function evaluateWindow(window) {  
    const positionWeights = [
      [3, 4, 5, 7, 5, 4, 3],
      [4, 6, 8, 10, 8, 6, 4],
      [5, 8, 11, 13, 11, 8, 5],
      [5, 8, 11, 13, 11, 8, 5],
      [4, 6, 8, 10, 8, 6, 4],
      [3, 4, 5, 7, 5, 4, 3]
    ];
  
    let playerDiscs = 0;
    let botDiscs = 0;
  
    //Loops through the window and caculate the count of bot and player discs
    for (let i = 0; i < window.length; i++) {  
        if (window[i] === PLAYER) {
            playerDiscs++;
        } else if (window[i]=== BOT) {
            botDiscs++;
        }
    }
  
    if (playerDiscs === 4) {
        // Player wins
        return -Number.MAX_VALUE; 

    } else if (botDiscs === 4) {
        // Bot wins
        return Number.MAX_VALUE; 

    } else if (botDiscs === 3 && playerDiscs === 0) {
        // Favorable for bot
        return 1000; 

    } else if (playerDiscs === 3 && botDiscs === 0) {
        // Favorable for player
        return -1000; 

    } else if (botDiscs === 2 && playerDiscs === 0) {
        // Slightly favorable for bot
        return 100;

    } else if (playerDiscs === 2 && botDiscs === 0) {
        // Slightly favorable for player
        return -100; 

    } else {
        //Runs when conditions for immediate win or known threats/opportunities are not met above
        //Calculate score based on position-based weights
        let score = 0;
    
        for (let i = 0; i < window.length; i++) {
            
            //Assigns weights to moves that arey advantageous
            if (window[i] === PLAYER) {
                score -= positionWeights[i % NUMBER_OF_ROWS][i % NUMBER_OF_COLUMNS];
            } else if (window[i] === BOT) {
                score += positionWeights[i % NUMBER_OF_ROWS][i % NUMBER_OF_COLUMNS];
            }
        }
        return score;
    }
}

// Returns the value and column pair of the best action for the bot player
function minimax(board, depth, alpha, beta, maximizingPlayer) {

    // Returns the evaluation of the board if its terminal 
    const winningPlayer = isTerminal(board);
    if (depth === 0 || winningPlayer){
        return [0,  evaluateState(board, winningPlayer)];
    }

    let column; 
    const validCoordinates = getValidCoordinates(board, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);

    if (maximizingPlayer) {
        let value = -Infinity;

        for (let coord = 0; coord < validCoordinates.length; coord++) {
            let currentCoordinate = validCoordinates[coord]; //All columns that are avalible

            const child = JSON.parse(JSON.stringify(board)); //Makes a deep copy of the board	
            child[currentCoordinate[0]][currentCoordinate[1]] = BOT; //Adds the a valid coordinate to the new board

            const newScore = minimax(child, depth - 1, alpha, beta, false)[1];

            //If we have found a better new score, update it and record the column of that child
            if (newScore > value) {
                value = newScore;
                column = currentCoordinate[1];
            }
            
            //Preforms alpha beta pruning
            alpha = Math.max(alpha, value);
            if (alpha >= beta) {
                break;
            }
        }
        return [column, value];

    } else {
        let value = Infinity;   

        for (let coord = 0; coord < validCoordinates.length; coord++) {
            let currentCoordinate = validCoordinates[coord]; //All columns that are avalible

            const child = JSON.parse(JSON.stringify(board)); //Makes a deep copy of the board	
            child[currentCoordinate[0]][currentCoordinate[1]] = PLAYER; //Adds the a valid coordinate to the new board

            const newScore = minimax(child, depth - 1, alpha, beta, true)[1];

            //If we have found a better new score, update it and record the column of that child
            if (newScore < value) {
                value = newScore;
                column = currentCoordinate[1];
            }
            
            //Preforms alpha beta pruning
            beta = Math.min(beta, value);
            if (alpha >= beta) {
                break;
            }
        }
        return [column, value];
    }
}

export function runMinimax(board, searchDepth){
    const bestMove = minimax(board, searchDepth, -Infinity, Infinity, true); //Starts the recursive minimax call
    return bestMove[0]; //Returns the column of the best move
}