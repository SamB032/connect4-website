//The easy bot just picks a column at random to drop a disk
export function easyBotPredict(validCoordinates) {
    console.log(validCoordinates);
    const randomIndex = Math.floor(Math.random() * validCoordinates.length); //Makes a random prediciton from 0 to length avaliable columns
    return validCoordinates[randomIndex][1]; //Extracts and returns the column value
}