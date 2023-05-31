//Implement minimax algorithm

const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLUMNS = 7;

function getValidCoordinates(board){
    const validLocations = []
    
    for (let col = 0; col < NUMBER_OF_COLUMNS; col++) {
        for (let row = NUMBER_OF_ROWS - 1; row >= 0; row--){
            if (board[row][col] === null){
                validLocations.push([row, col]);
                break;
            }
        }
    }
    return validLocations;
}

export function hardBotPredict(board){
    // const bestMove = minimax(board, 2, -Infinity, Infinity, true);
    // return bestMove[0]
    
    return 0;
}

// TODO: Create Heuristic for terminal node, and get it to check 

function minimax(board, depth, alpha, beta, maximizingPlayer) {
    if (depth === 0){ // /* or terminalNode(node)}*/)
        return /* Heuristic of node*/
    }

    if (maximizingPlayer) {
        let value = -Infinity;
        let coordinate = null;

        for (const newCoordinate in getValidCoordinates(board)) {
            const child = JSON.parse(JSON.stringify(board));
            child[newCoordinate[0]][newCoordinate[1]] = 2;

            const newScore = minimax(child, depth - 1, alpha, beta, false)[1];

            if (newScore > value) {
                value = newScore;
                coordinate = newCoordinate;
            }

            alpha = Math.max(alpha, value);
            if (alpha >= beta) {
                break;
            }
        }
        return [coordinate, value];

    } else {
        let value = Infinity;
        let coordinate = null;

        for (const newCoordinate in getValidCoordinates(board)){
            const child = JSON.parse(JSON.stringify(board));
            child[newCoordinate[0]][newCoordinate[1]] = 2;

            const newScore = minimax(child, depth - 1, alpha, beta, true)[1];

            if (newScore < value) {
                value = newScore;
                coordinate = newCoordinate;
            }
            beta = Math.min(beta, value);
            if (alpha >= beta) {
                break;
            }
        }
        return [coordinate, value];
    }
}