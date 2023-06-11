export async function addGamePost(endingGameState, botDifficulty, loggedUserID) {
    const API_URL = "http://localhost:5000/";

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