import React from 'react';
import Button from 'react-bootstrap/Button';

import '../styles/Home.css';
import image from '../assets/placeholder.png'

function Home() {
    return (
        <div className="home">
            <div className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus quis magna molestie pharetra. 
                Cras mattis aliquet posuere. Pellentesque at ligula et nibh scelerisque laoreet. Sed bibendum, 
                sem ut sagittis consequat, augue lectus ullamcorper arcu, a pretium felis felis et nibh. 
                Phasellus elementum nisi velit, id scelerisque dolor consequat gravida. Sed est orci, blandit 
                ut erat vel, volutpat faucibus purus. Nunc in turpis vel odio fringilla semper. Sed mollis 
                porttitor semper.
            </div>

            <img src={image} style={{ width: "30%", height: "30%" }} className="image" alt="placeholder"/>

            <div className="difficulty">
                <div className="heading">
                    Difficulty:
                </div>

                <div className="items">
                    <Button className="button">Easy</Button>{' '}
                    <Button className="button">Medium</Button>{' '}
                    <Button className="button">Hard</Button>{' '}
                </div>
            </div>

        </div>
    );
}
export default Home;