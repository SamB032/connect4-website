import {useState} from 'react';
import {useParams} from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';

import ModalComponent from './Modal';
import '../styles/GameBoard.css';
import Game from '../helpers/game'

function GameBoard(){
    const {difficulty} = useParams(); //uses dyanmic url's to determine the difficulty
    
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
    const {user, isAuthenticated} = useAuth0();

    const handleCloseModal = () => setShowModal(false);
        
    const handleOpenModal = (title, content) => {
        setModalTitle(title);
        setModalContent(content);
        setShowModal(true);
    };

    let userID = false;
    if (isAuthenticated){
        userID = user.sub;
    }

    const board = new Game(difficulty, handleOpenModal, userID);

    return (
        <div className="board">
            {board.renderBoard()};
            {showModal && <ModalComponent showModal={showModal} handleClose={handleCloseModal} title={modalTitle} content={modalContent}/>}
        </div>
    );
};

export default GameBoard;
