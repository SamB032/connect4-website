import {useState} from 'react';
import '../styles/GameBoard.css';

import {setGame, renderBoard, setPiece} from '../Helpers/gameFunctions.js'

function GameBoard(){
    const [board, setBoard] = useState(setGame());

    return (
        <div className="board">
            {renderBoard(board, setPiece)}
        </div>
    );
};

export default GameBoard;
