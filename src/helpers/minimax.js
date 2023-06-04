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
        return Infinity; // Bot wins - high positive value
    } else if (winningPlayer === PLAYER) {
        return -Infinity; // Opponent wins - high negative value
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

//Returns array of the maximum sequence of a given disk -> values >= 2 
function getSuccesiveDiscs(arr) {
    let maxPlayerCount = 0;
    let maxBotCount = 0;
    let nullCount = 0;
    let disc = arr[0];
    let currentDiscCount = 0;

    for (let i = 0; i < arr.length; i++) {
        const currentDisc = arr[i];
        
        if (currentDisc === null){
            //Reset count since we have reached a null -> indicating that ending of a disk sequence
            currentDiscCount = 0;
            disc = null;
            nullCount++;
        } else if (currentDisc !== null) {
            if (disc === currentDisc) {
                //The next disk is the same as the current, so just increment count
                currentDiscCount++;
                
                //Update to keep track of maximum count
                if (currentDisc === PLAYER) {
                    maxPlayerCount = Math.max(maxPlayerCount, currentDiscCount);
                } else if (currentDisc === BOT) {
                    maxBotCount = Math.max(maxBotCount, currentDiscCount);
                }
            } else {
                //We have reached the end of the sequence, so change the current disk
                currentDiscCount = 1; //Reset to 1 since current disk is included in the count
            }            
        }
        disc = currentDisc; // Update the disk variable
    }
    return [maxBotCount, maxPlayerCount, nullCount];
}

// Evaluates the array depending on which player has the discs in sequence
function evaluateWindow(arr) {
    const scores = {
        botFour: 180,
        botThree: 60,
        botTwo: 5,
        playerFour: -250,
        playerThree: -75,
        playerTwo: -20,
        botThreat: 50,      // Bonus score for potential bot threats
        playerThreat: -50,  // Penalty score for potential player threats
    };

    let score = 0;
    const maxCounts = getSuccesiveDiscs(arr); //[Bot, Player nullCounts]

    switch(maxCounts[0]) {
        case 4:
            score += scores.botFour;
            break;
        case 3: 
            score += scores.botThree;
            break;
        case 2:
            score += scores.botTwo;
            break;
        default:
            break;
    }

    switch(maxCounts[1]) {
        case 4:
            score += scores.playerFour;
            break;
        case 3:
            score += scores.playerThree;
            break;
        case 2:
            score += scores.playerTwo;
            break;
        default:
            break;
    }

    // if (maxCounts[0] + maxCounts[2] === 3) {
    //     score += scores.botThreat;
    // } else if (maxCounts[1] + maxCounts[2] === 3) {
    //     score += scores.playerThreat;
    // }

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
    console.log(bestMove);
    return bestMove[0]; //Returns the column of the best move
}