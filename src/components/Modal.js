import React from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import '../styles/Modal.css';

function ModalComponent({showModal, handleClose, title, content}) {  
    return (
        <Modal show={showModal} onHide={handleClose} centered dialogClassName="modal-override">

        <Modal.Header closeButton={false}>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>{content}</p>
        </Modal.Body>

        <Modal.Footer>
            <Link to="/connect4">
                <button className="custom-btn-secondary">Return to Home</button>
            </Link>
            
            <button className="custom-btn-main" onClick={() => window.location.reload(true)}>New Game</button>   
        </Modal.Footer>
        </Modal>
  );
}

export default ModalComponent;