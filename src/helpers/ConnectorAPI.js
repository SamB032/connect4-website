const API_URL = "http://localhost:5000/";

export async function addGamePost(endingGameState, botDifficulty, loggedUserID) {
    try {
        await fetch(`${API_URL}addGame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({winningPlayer: endingGameState, difficulty: botDifficulty, userID: loggedUserID}),
        });
    } catch (error) {
        console.error('Error adding game:', error);
    }
}

export async function getGameData(userID){
    try {
        const response = await fetch(`${API_URL}getGames?userID=${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }); 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}