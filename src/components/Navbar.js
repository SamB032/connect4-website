import {Link} from 'react-router-dom';

import '../styles/Navbar.css';

function Navbar() {    
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">
                    <button className="nav-button">Home</button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;