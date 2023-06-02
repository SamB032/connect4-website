//Implement minimax algorithm
import {checkForWinner, boardContainsNull} from "./SharedBotCode";
import {getValidCoordinates} from "./findAvaliableColumns";

const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLUMNS = 7;

const PLAYER = 1;
const BOT = 2;

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
        return 1000; // Bot wins - high positive value
    } else if (winningPlayer === PLAYER) {
        return -1000; // Opponent wins - high negative value
    } else {
        let score = 0;
  
        // Evaluate rows
        for (let row = 0; row < NUMBER_OF_ROWS; row++) {
            for (let col = 0; col < NUMBER_OF_COLUMNS - 3; col++) {
                if (board[row][col]) {
                    
                    const window = [
                        board[row][col],
                        board[row][col + 1],
                        board[row][col + 2],
                        board[row][col + 3] 
                    ];
                    score += evaluateWindow(window);
                }
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

        //Diagonal
        for (let row = 0; row < NUMBER_OF_ROWS - 3; row++) {
            for (let col = 0; col < NUMBER_OF_COLUMNS - 3; col++) {
                if (board[row][col]){

                    const window3 = [
                        board[row][col],
                        board[row + 1][col + 1],
                        board[row + 2][col + 2],
                        board[row + 3][col + 3]
                    ];

                    //Evalute the score for both bot and player
                    score += evaluateWindow(window3);
                }
            }
        }

        //AntiDiagonal
        for (let row = 3; row < NUMBER_OF_ROWS; row++) {
            for (let col = 0; col < NUMBER_OF_COLUMNS - 3; col++) {
                if (board[row][col]) {
                    
                    const window4 = [
                        board[row][col],
                        board[row - 1][col + 1],
                        board[row - 2][col + 2],
                        board[row - 3][col + 3]
                    ];
                    
                    //Evalute the score for both bot and player
                    score += evaluateWindow(window4);
                }
            }
        }
    return score; //Evaluation score for that particular state
    }
}

// Evaluates the array depending on which player has the discs in sequence
function evaluateWindow(arr) {
    //Evaluation score, +ve for bot and -ve for player
    const scores = {
        botFour: 500,
        botThree: 200,
        botTwo: 20,
        playerFour: -500,
        playerThree: -150,
        playerTwo: -20,
    };  

    let score = 0;

    //Keep track of the current disc streak 
    let botCount = 0;
    let playerCount = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === BOT) {
            //Reset player count, increment the botCount
            playerCount = 0;
            botCount++;

            //Only starts evaluting the score if the disc streak of the bot is greater than 2
            if (botCount >= 2) {
                if (botCount === 4) {
                    score += scores.botFour;
                } else if (botCount === 3) {
                    score += scores.botThree;
                } else if (botCount === 2) { 
                    score += scores.botTwo;
                }
            }
        } else if (arr[i] === PLAYER) {
            //Reset player count, increment the botCount
            botCount = 0;
            playerCount++;

            //Only starts evaluting the score if the disc streak of the player is greater than 2
            if (playerCount >= 2) {
                if (playerCount === 4) {
                    score += scores.playerFour;
                } else if (playerCount === 3) {
                    score += scores.playerThree;
                } else if (playerCount === 2) { 
                    score += scores.playerTwo;
                }
            }
        } else {
            //Reset counts since the streak has ended
            botCount = 0;
            playerCount = 0;
        }
    }
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