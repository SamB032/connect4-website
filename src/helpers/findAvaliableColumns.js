const NUMBER_OF_ROWS = 6;
const NUMBER_OF_COLUMNS = 7;

//Returns a list of avalible coordinate (defined by the a not full columns largest row value)
//Its imported as both the easy and minimax (medium and hard) need to use this function
export function getValidCoordinates(board){
    const validLocations = []
    
    for (let col = 0; col <= NUMBER_OF_COLUMNS; col++) {
        for (let row = NUMBER_OF_ROWS - 1; row >= 0; row--){
            if (board[row][col] === null){
                validLocations.push([row, col]);
                break;
            }
        }
    }
    return validLocations;
}