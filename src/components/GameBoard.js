import {useState} from 'react';
import { useParams } from "react-router-dom";

import '../styles/GameBoard.css';
import Game from '../helpers/game'

function GameBoard(){

    const {id} = useParams();
    const [board, setBoard] = useState(new Game(id));
    //TODO: Add modal on winning https://react-bootstrap.github.io/components/modal/

    return (
        <div className="board">
            {board.renderBoard()};
        </div>
    );
};

export default GameBoard;
