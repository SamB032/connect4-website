import {getValidCoordinates} from "./SharedBotCode";

//The easy bot just picks a column at random from avaliable columns
export function easyBotPredict(board, depth) {
    const validCoordinates = getValidCoordinates(board, 6, 7);
    const randomIndex = Math.floor(Math.random() * validCoordinates.length); //Makes a random prediciton from 0 to length avaliable columns
    return validCoordinates[randomIndex][1]; //Extracts and returns the column value
}