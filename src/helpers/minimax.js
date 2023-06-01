//Implement minimax algorithm
import {checkForWinner} from "./CheckWinner";
import {getValidCoordinates} from "./findAvaliableColumns";

const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLUMNS = 7;

const PLAYER = 1;
const BOT = 2;

//Returns true if the still space to play, otherwise false
function boardContainsNull(board){
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        for (let col = 0; col < NUMBER_OF_COLUMNS; col ++) {
            if (board[row][col] === null) {
                //Returns true when a null value is encounted will looping, 
                return true;
            }
        }
    }
    return false;
}

//Returns the value of a winnning disc if terminal (defined as having a winning condition or no spaces to play), otherwise return false
function isTerminal(board){
    const hasWinner = checkForWinner(board, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);

    if (hasWinner >= 1 && !boardContainsNull(board)) {
        return board[hasWinner[0]][hasWinner[1]];
    }
    return false;
}

// Assigns a value to when (depth === 0 or isTerminal), this helps the algorithm evalute the "goodness" of one state
function evaluateState(board, winningPlayer) {
    if (winningPlayer === BOT) {
        return 1000; // Bot wins - high positive value
    } else if (winningPlayer === PLAYER) {
        return -1000; // Opponent wins - high negative value
    } else {
        let score = 0;
  
        // Evaluate rows
        for (let row = 0; row < NUMBER_OF_ROWS; row++) {
            for (let col = 0; col < NUMBER_OF_COLUMNS - 3; col++) {
            score += evaluateWindow(board[row].slice(col, col + 4), BOT);
            score -= evaluateWindow(board[row].slice(col, col + 4), PLAYER);
            }
        }
    
        // Evaluate columns
        for (let col = 0; col < NUMBER_OF_COLUMNS; col++) {
            for (let row = 0; row < NUMBER_OF_ROWS - 3; row++) {
            const window = [
                board[row][col],
                board[row + 1][col],
                board[row + 2][col],
                board[row + 3][col]
            ];
            score += evaluateWindow(window, BOT);
            score -= evaluateWindow(window, PLAYER);
            }
        }
  
        // Evaluate diagonals
        for (let col = 0; col < NUMBER_OF_COLUMNS - 3; col++) {
            for (let row = 0; row < NUMBER_OF_ROWS - 3; row++) {
                const window1 = [
                    board[row][col],
                    board[row + 1][col + 1],
                    board[row + 2][col + 2],
                    board[row + 3][col + 3]
                ];
                score += evaluateWindow(window1, BOT);
                score -= evaluateWindow(window1, PLAYER);
        
                const window2 = [
                    board[row][col + 3],
                    board[row + 1][col + 2],
                    board[row + 2][col + 1],
                    board[row + 3][col]
                ];
                score += evaluateWindow(window2, BOT);
                score -= evaluateWindow(window2, PLAYER);
            }
        }
    return score; //Evaluation score for that particular state
    }
}

// Preforms an evaluation of a arrray and a given piece. That returns the player1 - player2 score
function evaluateWindow(window, piece) {
    var score = 0;
    var oppPiece = (piece === PLAYER) ? BOT : PLAYER; //Gets the opposite piece

    var pieceCount = window.filter(item => item === piece).length; //Number of pieces in the array
    var emptyCount = window.filter(item => item === null).length; //Number of empty spaces in the array

    //Increments the score based on the count
    if (pieceCount === 4) score += 100;
    else if (pieceCount === 3 && emptyCount === 1) score += 5;
    else if (pieceCount === 2 && emptyCount === 2) score += 2;

    if (window.filter(item => item === oppPiece).length === 3 && emptyCount === 1) score -= 4;

    return score;
}


// Returns the value and column pair of the best action for the bot player
function minimax(board, depth, alpha, beta, maximizingPlayer) {

    // Returns the evaluation of the board if its terminal 
    const winningPlayer = isTerminal(board);
    if (depth === 0 || winningPlayer){
        return [0,  evaluateState(board, winningPlayer)];
    }
    
    let column; 

    if (maximizingPlayer) {
        
        const validCoordinates = getValidCoordinates(board);
        let value = -Infinity;

        for (let coord = 0; coord < validCoordinates.length; coord++) {
            let currentCoordinate = validCoordinates[coord]; //All columns that are avalible

            const child = JSON.parse(JSON.stringify(board)); //Makes a deep copy of the board
            child[currentCoordinate[0]][currentCoordinate[1]] = 2; //Adds the a valid coordinate to the new board

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
        
        const validCoordinates = getValidCoordinates(board);
        let value = Infinity;   

        for (let coord = 0; coord < validCoordinates.length; coord++) {
            let currentCoordinate = validCoordinates[coord]; //All columns that are avalible

            const child = JSON.parse(JSON.stringify(board)); //Makes a deep copy of the board
            child[currentCoordinate[0]][currentCoordinate[1]] = 1; //Adds the a valid coordinate to the new board

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
    const bestMove = minimax(board, searchDepth, -Infinity, Infinity, true);
    return bestMove[0];
}