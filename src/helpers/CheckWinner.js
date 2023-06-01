export function checkForWinner(board, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS){
    //Check horizontal
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        for (let col = 0; col < NUMBER_OF_COLUMNS - 3; col++){
            if (board[row][col]) {
                // if statement evaultes to true if there is a 4 in a row horizontally
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
                // if statement evaultes to true if there is a 4 in a row verical
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
                // if statement evaultes to true if there is a 4 in the diagonal (left -> right)
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
                // if statement evaultes to true if there is a 4 in the diagonal (right -> left)
                if (board[row][col] === board[row - 1][col + 1] && board[row - 1][col + 1] === board[row - 2][col + 2] && board[row - 2][col + 2] === board[row - 3][col + 3]) {
                        return [row, col];
                }
            }
        }
    }
    //Game is still in play, neither player has met the winning constraint yet
    return 0;
};