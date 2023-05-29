// import {Link, useLocation} from 'react-router-dom';
import '../styles/Navbar.css';
import Button from 'react-bootstrap/Button';

function Navbar() {
    return (
        <div className="navbar">
            <div className="links">
                <Button bsPrefix="nav-button" className="nav-button">Login</Button>{' '}
            </div>
        </div>
    );
}

export default Navbar;