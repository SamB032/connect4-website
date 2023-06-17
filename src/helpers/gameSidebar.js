//Gets the index of the difficulty within the sidebarArr
const getDifficultyIndex = (difficulty) => {
    switch (difficulty) {
        case "easy":
            return 0;
        case "medium":
            return 1;
        default:
            return 2;
    }
}

const getWinningIndex = (winningPlayer) => {
    switch (winningPlayer) {
        case 1:
            return 0;
        case 2: 
            return 2;
        default:
            return 1;
    }
}

export default function gameSidebar(gameData){
    const sidebarArr = [[0, 0, 0] , [0, 0, 0], [0, 0, 0]] //Easy, Medium, Hard format

    for (let i = 0; i < gameData.length; i++) {
        const index = getDifficultyIndex(gameData[i].difficulty);
        const subindex = getWinningIndex(gameData[i].winningPlayer);
        sidebarArr[index][subindex]++;
    }

    return sidebarArr
}