import React from 'react';
import GameResult from './gameResult'

const showFirstNGames = 15;

export default function GameHistory({gameData}) {

    const getDateFromId = (_id) => {
        const timestamp = _id.substring(0, 8); 
        const date = new Date(parseInt(timestamp, 16) * 1000); // Convert the timestamp to milliseconds and create a Date object
        return date.toLocaleDateString('en-GB'); // Format the date as "DD/MM/YYYY".toDateString();
    };

    return (
        <div>
            {gameData.slice(0, showFirstNGames).map((game) => {
                    return (
                        <React.Fragment key={game._id}>
                            <GameResult key={`gameResult_${game._id}`} date={getDateFromId(game._id)} difficulty={game.difficulty} winningPlayer={game.winningPlayer}/>
                            <hr key={`divider_${game._id}`} className="divider"/>
                        </React.Fragment>
                    )
            })}
        </div>
    )
}