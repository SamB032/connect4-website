import {useState} from 'react';
import {useParams} from "react-router-dom";

import ModalComponent from './Modal';
import '../styles/GameBoard.css';
import Game from '../helpers/game'

function GameBoard(){
    const {difficulty} = useParams(); //uses dyanmic url's to determine the difficulty
    
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');

    const handleCloseModal = () => setShowModal(false);
        
    const handleOpenModal = (title, content) => {
        setModalTitle(title);
        setModalContent(content);
        setShowModal(true);
    };

    const board = new Game(difficulty, handleOpenModal);

    return (
        <div className="board">
            {board.renderBoard()};
            {showModal && <ModalComponent showModal={showModal} handleClose={handleCloseModal} title={modalTitle} content={modalContent}/>}
        </div>
    );
};

export default GameBoard;
