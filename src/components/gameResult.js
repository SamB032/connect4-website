import React from "react";
import {WinIcon, LossIcon, DrawIcon} from './iconComponents';
import '../styles/GameResult.css'


export default function GameResult({date, difficulty, winningPlayer}) {
    //Renders the icon based on the games winning state
    const getResultIcon = (winningPlayer) => {
        switch (winningPlayer) {
            case 1:
                return <WinIcon/>;
            case 2: 
                return <LossIcon/>;
            case 3:
                return <DrawIcon/>;
            default:
                return <p>Error Getting Difficulty</p>
        }
    }

    //Captilises the difficulty and adds " Bot" to the end
    const getBotName = (difficulty) => {
        return difficulty.charAt(0).toUpperCase() + difficulty.slice(1) + " Bot";
    }
    
    return (
        <div className="game-result">

            <div className="difficulty">
                <b>{getBotName(difficulty)}</b>
            </div>

            {getResultIcon(winningPlayer)}
            
            <div className="date">
                <b>{date}</b>
            </div>
        </div>
    );
}