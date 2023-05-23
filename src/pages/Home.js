import React from 'react';
import Button from 'react-bootstrap/Button';

import '../styles/Home.css';
import image from '../assets/placeholder.png'

function Home() {
    return (
        <div className="home">
            <div className="text">
            The Connect 4 game is a traditional strategy game in which two players compete to control the grid. 
            Each player has a distinct colour. You can place the discs in any of the columns you want. The goal 
            is to get four of the same colour in a row that can be diagonal, horizontal, or vertical. Begin by 
            determining the level of difficulty for the AI opponent.
            </div>

            <img src={image} className="image" alt="placeholder"/>

            <div className="difficulty">
                <div className="heading">
                    Difficulty:
                </div>

                <div className="items">
                    <Button bsPrefix="custom-btn" className="custom-btn">Easy</Button>{' '}
                    <Button bsPrefix="custom-btn" className="custom-btn">Medium</Button>{' '}
                    <Button bsPrefix="custom-btn" className="custom-btn">Hard</Button>{' '}
                </div>
            </div>

        </div>
    );
}
export default Home;