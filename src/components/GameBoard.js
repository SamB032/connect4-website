import {useState} from 'react';
import { useParams } from "react-router-dom";

import '../styles/GameBoard.css';
import Game from '../helpers/game'

function GameBoard(){

    const [board, setBoard] = useState(new Game());
    //TODO: Add modal on winning https://react-bootstrap.github.io/components/modal/

    const {id} = useParams();

    return (
        <div className="board">
            {board.renderBoard()};
        </div>
    );
};

export default GameBoard;
