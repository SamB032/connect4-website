//The easy bot just picks a column at random to drop a disk
export function easyBotPredict(availableColumns) {
    const randomIndex = Math.floor(Math.random() * availableColumns.length); //Makes a random prediciton from 0 to length avaliable columns
    return availableColumns[randomIndex]; //Extracts and returns the column value
}

// export default easyBotPredict;