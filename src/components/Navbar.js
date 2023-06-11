import {useAuth0} from '@auth0/auth0-react';
import {Link} from 'react-router-dom';

import '../styles/Navbar.css';

function Navbar() {
    const {loginWithRedirect, logout, isAuthenticated} = useAuth0();
    
    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">
                    <button className="nav-button">Home</button>
                </Link>
                
                {!isAuthenticated ? (
                    <button className="nav-button" onClick={loginWithRedirect}>
                        Login
                    </button>
                ) : (
                    <>
                        <Link to="/profile">
                            <button className="nav-button">Profile</button>
                        </Link>
                        <button className="nav-button" onClick={logout}>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;