import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//TODO: USE CUSTOM BUTTONS AND ADD BETTER STYLING (IE COLOURS)

function ModalComponent({showModal, handleClose, title, content, difficulty}) {
  return (
        <Modal show={showModal} onHide={handleClose} centered dialogClassName="modal-override">

        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>{content}</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" href="/">Return to Home</Button>
            <Button variant="primary" href={difficulty}>New Game</Button>
        </Modal.Footer>
        </Modal>
  );
}

export default ModalComponent;